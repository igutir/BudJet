import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

import { Cuenta } from '../pages/interfaces/cuenta';
import { Movimiento } from '../pages/interfaces/movimiento';
import { Usuario } from '../pages/interfaces/usuario';
import { TipoMovimiento } from '../pages/interfaces/tipo_movimiento';
import { UsuarioSimple } from '../pages/interfaces/usuario_simple';

@Injectable({
    providedIn: 'root'
})
export class DataBaseServiceService {

    public database!: SQLiteObject;

    //QUERYS CREACION Y POBLAMIENTO DE TABLAS ================================================

    //TABLAS ================================================
    tablaUsuario: string = 'CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(8) NOT NULL UNIQUE, password VARCHAR(4) NOT NULL, email VARCHAR(50), telefono VARCHAR(9), fecha_nacimiento DATE, imagen_perfil BLOB, notificaciones BOOLEAN NOT NULL);';

    tablaCuenta: string = "CREATE TABLE IF NOT EXISTS cuenta(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, saldo INTEGER NOT NULL, fecha_creacion DATE NOT NULL, fecha_actualizacion DATE NOT NULL, id_usuario INTEGER NOT NULL, FOREIGN KEY(id_usuario) REFERENCES usuario(id));";

    tablaTipoMovimiento: string = "CREATE TABLE IF NOT EXISTS tipo_movimiento(id INTEGER PRIMARY KEY autoincrement, descripcion VARCHAR(50) NOT NULL);";

    tablaMovimiento: string = "CREATE TABLE IF NOT EXISTS movimiento(id INTEGER PRIMARY KEY autoincrement, descripcion VARCHAR(50) NOT NULL, monto INTEGER NOT NULL, fecha DATE NOT NULL, id_cuenta INTEGER NOT NULL, id_tipo_movimiento INTEGER NOT NULL, FOREIGN KEY(id_cuenta) REFERENCES cuenta(id), FOREIGN KEY(id_tipo_movimiento) REFERENCES tipo_movimiento(id));";

    //DATOS ================================================
    //USUARIO ================================================
    usuarioPrueba: string = "INSERT or IGNORE INTO usuario(id, nombre, password, email, telefono, fecha_nacimiento, imagen_perfil, notificaciones) VALUES (1, 'prueba', '1234', 'email@budjet.cl', '912345678', '01/01/2000', NULL, true);";

    //CUENTAS ================================================
    cuentaPersonal: string = "INSERT or IGNORE INTO cuenta(id, nombre, saldo, fecha_creacion, fecha_actualizacion, id_usuario) VALUES (1, 'Personal', '1500000', '01/01/2020', '03/05/2023', 1);";

    cuentaAhorro: string = "INSERT or IGNORE INTO cuenta(id, nombre, saldo, fecha_creacion, fecha_actualizacion, id_usuario) VALUES (2, 'Ahorro', '2000000', '01/01/2019', '14/09/2023', 1);";

    //TIPOS MOVIMIENTO ================================================
    tipoMovimientoIngreso: string = "INSERT or IGNORE INTO tipo_movimiento(id, descripcion) VALUES (1, 'Ingreso');";

    tipoMovimientoGasto: string = "INSERT or IGNORE INTO tipo_movimiento(id, descripcion) VALUES (2, 'Gasto');";

    //MOVIMIENTOS ================================================
    movimientoPersonalUno: string = "INSERT or IGNORE INTO movimiento(id, descripcion, monto, fecha, id_cuenta, id_tipo_movimiento) VALUES (1, 'Sueldo', '1500000', '01/05/2023', 1, 1);";

    movimientoPersonalDos: string = "INSERT or IGNORE INTO movimiento(id, descripcion, monto, fecha, id_cuenta, id_tipo_movimiento) VALUES (2, 'Compra supermercado', '100000', '03/05/2023', 1, 2);";

    movimientoAhorrolUno: string = "INSERT or IGNORE INTO movimiento(id, descripcion, monto, fecha, id_cuenta, id_tipo_movimiento) VALUES (3, 'Ahorro casa', '520000', '02/04/2023', 2, 1);";

    movimientoAhorrolDos: string = "INSERT or IGNORE INTO movimiento(id, descripcion, monto, fecha, id_cuenta, id_tipo_movimiento) VALUES (4, 'Emergencia', '70000', '14/09/2023', 2, 2);";

    //OBSERVABLES  ========================================================================

    //USUARIO
    observableUsuario = new BehaviorSubject([]);
    observableUsuarioSimple = new BehaviorSubject([]);
    obsUsuarioById = new BehaviorSubject([]);
    obsAuthUsuario = new BehaviorSubject([]);
    //CUENTAS
    observableCuenta = new BehaviorSubject([]);
    observableCuentaPorUsuario = new BehaviorSubject([]);
    obsCuentaById = new BehaviorSubject([]);
    //MOVIMIENTO
    observableMovimiento = new BehaviorSubject([]);
    observableMovimientoCuenta = new BehaviorSubject([]);
    obsMovimientoById = new BehaviorSubject([]);
    //TIPOS DE MOVIMIENTO
    observableTipoMovimiento = new BehaviorSubject([]);
    obsTipoMovimientoById = new BehaviorSubject([]);

    private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private sqlite: SQLite,
        private platform:
            Platform, private toastController: ToastController,
        private alertController: AlertController
    ) {
        this.createDB();
    }

    dbState() {
        return this.isDBReady.asObservable();
    }

    createDB() {
        this.platform.ready().then(() => {

            this.sqlite.create({
                name: 'budjet.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                this.database = db;
                this.createTables();
            }).catch((e) => {
                this.presentToast('Error BD: ' + e);
            })
        })
    }

    async createTables() {
        try {
            //tabla usuario
            await this.database.executeSql(this.tablaUsuario, []);
            //tabla TipoMovimiento
            await this.database.executeSql(this.tablaTipoMovimiento, []);
            //tabla Cuenta
            await this.database.executeSql(this.tablaCuenta, []);
            //tabla Movimiento
            await this.database.executeSql(this.tablaMovimiento, []);

            //Datos usuario
            await this.database.executeSql(this.usuarioPrueba, []);
            //Tipos de cuenta
            await this.database.executeSql(this.tipoMovimientoIngreso, []);
            await this.database.executeSql(this.tipoMovimientoGasto, []);

            //Cuentas
            await this.database.executeSql(this.cuentaPersonal, []);
            await this.database.executeSql(this.cuentaAhorro, []);

            //Movimientos
            await this.database.executeSql(this.movimientoPersonalUno, []);
            await this.database.executeSql(this.movimientoPersonalDos, []);
            await this.database.executeSql(this.movimientoAhorrolUno, []);
            await this.database.executeSql(this.movimientoAhorrolDos, []);

            this.selectUsuariosSimples();

            this.isDBReady.next(true);

        } catch (e: any) {
            this.presentAlert('Error Tablas: ' + e.message);
        }
    }


    //USUARIOS ========================================================================
    selectUsuarios() {
        return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
            let items: Usuario[] = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    items.push({
                        id: res.rows.item(i).id,
                        nombre: res.rows.item(i).nombre,
                        email: res.rows.item(i).email,
                        telefono: res.rows.item(i).telefono,
                        fecha_nacimiento: res.rows.item(i).fecha_nacimiento,
                        imagen_perfil: res.rows.item(i).imagen_perfil,
                        notificaciones: res.rows.item(i).notificaciones
                    })
                }
            }
            this.observableUsuario.next(items as any);

        })
    }

    fetchUsuarios(): Observable<Usuario[]> {
        return this.observableUsuario.asObservable();
    }

    selectUsuariosSimples() {
        return this.database.executeSql('SELECT id, nombre FROM usuario', []).then(res => {
            let items: UsuarioSimple[] = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    items.push({
                        id: res.rows.item(i).id,
                        nombre: res.rows.item(i).nombre
                    })
                }
            }
            this.observableUsuarioSimple.next(items as any);

        })
    }

    fetchUsuariosSimples(): Observable<UsuarioSimple[]> {
        return this.observableUsuarioSimple.asObservable();
    }


    getUsuariobyId(id_usuario: number) {

        return this.database.executeSql('SELECT * FROM usuario WHERE id = ?', [id_usuario]).then(res => {
            let items: Usuario[] = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    items.push({
                        id: res.rows.item(i).id,
                        nombre: res.rows.item(i).nombre,
                        email: res.rows.item(i).email,
                        telefono: res.rows.item(i).telefono,
                        fecha_nacimiento: res.rows.item(i).fecha_nacimiento,
                        imagen_perfil: res.rows.item(i).imagen_perfil,
                        notificaciones: res.rows.item(i).notificaciones
                    })
                }
            }
            this.obsUsuarioById.next(items as any);

        })

    }

    fetchUsuarioById(): Observable<Usuario[]> {
        return this.obsUsuarioById.asObservable();
    }

    autenticarUsuario(nombre: string, password: string): Promise<UsuarioSimple> {

        return this.database.executeSql('SELECT * FROM usuario WHERE nombre = ? AND password = ?', [nombre, password]).then(res => {
            let usuario: UsuarioSimple = {
                id: res.rows.item(0).id,
                nombre: res.rows.item(0).nombre
            }

            return usuario;
        });
    }

    fetchAuthUsuario(): Observable<Usuario[]> {
        return this.obsAuthUsuario.asObservable();
    }

    //CUENTAS -------------------------------------------------------------
    selectCuentas() {
        return this.database.executeSql('SELECT * FROM cuenta WHERE', []).then(res => {
            let items: Cuenta[] = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    items.push({
                        id: res.rows.item(i).id,
                        nombre: res.rows.item(i).nombre,
                        saldo: res.rows.item(i).saldo,
                        fecha_creacion: res.rows.item(i).fecha_creacion,
                        fecha_actualizacion: res.rows.item(i).fecha_actualizacion,
                        id_usuario: res.rows.item(i).id_usuario
                    })
                }
            }

            this.observableCuenta.next(items as any);

        })
    }

    fetchCuentas(): Observable<Cuenta[]> {
        return this.observableCuenta.asObservable();
    }

    selectCuentasUsuario(id_usuario: number) {
        return this.database.executeSql('SELECT * FROM cuenta WHERE id_usuario = ?', [id_usuario]).then(res => {
            let items: Cuenta[] = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    items.push({
                        id: res.rows.item(i).id,
                        nombre: res.rows.item(i).nombre,
                        saldo: res.rows.item(i).saldo,
                        fecha_creacion: res.rows.item(i).fecha_creacion,
                        fecha_actualizacion: res.rows.item(i).fecha_actualizacion,
                        id_usuario: res.rows.item(i).id_usuario
                    })
                }
            }

            this.observableCuentaPorUsuario.next(items as any);

        })
    }

    fetchCuentasPorUsuario(): Observable<Cuenta[]> {
        return this.observableCuentaPorUsuario.asObservable();
    }

    getCuentaById(id_cuenta: number) {
        return this.database.executeSql('SELECT * FROM cuenta WHERE id = ?', [id_cuenta]).then(res => {
            let items: Cuenta[] = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    items.push({
                        id: res.rows.item(i).id,
                        nombre: res.rows.item(i).nombre,
                        saldo: res.rows.item(i).saldo,
                        fecha_creacion: res.rows.item(i).fecha_creacion,
                        fecha_actualizacion: res.rows.item(i).fecha_actualizacion,
                        id_usuario: res.rows.item(i).id_usuario
                    })
                }
            }

            this.obsCuentaById.next(items as any);

        })
    }

    fetchCuentasById(): Observable<Cuenta[]> {
        return this.obsCuentaById.asObservable();
    }


    insertCuenta(
        nombre: string,
        saldo: string,
        fecha_creacion: Date,
        fecha_actualizacion: Date,
        id_usuario: number
    ) {
        let data = [nombre, saldo, fecha_creacion, fecha_actualizacion, id_usuario];
        return this.database.executeSql('INSERT INTO cuenta(nombre, saldo, fecha_creacion, fecha_actualizacion, id_usuario) VALUES (?, ?, ?, ?, ?)', data).then(res => {
            this.selectCuentasUsuario(id_usuario);
        })
            .catch((e: any) => {
                this.presentAlert('Error insert cuenta: ' + e.message);
            });
    }

    updateCuenta(
        id: number,
        nombre: string,
        saldo: string,
        fecha_actualizacion: Date,
        id_usuario: number
    ) {
        let data = [nombre, saldo, fecha_actualizacion, id_usuario, id];
        return this.database.executeSql('UPDATE cuenta SET nombre = ?, saldo = ?, fecha_actualizacion = ?, id_usuario = ? WHERE id = ?', data).then(data2 => {
            this.selectCuentasUsuario(id_usuario);
        })
            .catch((e: any) => {
                this.presentAlert('Error update cuenta: ' + e.message);
            });
    }

    updateMontoCuentas(
        id: number,
        saldo: string
    ) {
        let data = [saldo, id];
        return this.database.executeSql('UPDATE cuenta SET saldo = ? WHERE id = ?', data).then(data2 => {
            this.getCuentaById(id);
        })
            .catch((e: any) => {
                this.presentAlert('Error update cuenta: ' + e.message);
            });
    }

    deleteCuenta(id_usuario: number, id_cuenta: number) {

        this.database.executeSql('DELETE FROM movimiento WHERE id_cuenta = ?', [id_cuenta]).then(a => {
            this.selectMovimientosCuenta(id_cuenta);
        });

        return this.database.executeSql('DELETE FROM cuenta WHERE id = ?', [id_cuenta]).then(a => {
            this.selectCuentasUsuario(id_usuario);
        }).catch((e: any) => {
            this.presentAlert('Error delete cuenta: ' + e.message);
        });
    }


    //MOVIMIENTOS -------------------------------------------------------------

    selectMovimientos() {
        return this.database.executeSql('SELECT * FROM movimiento', []).then(res => {
            let items: Movimiento[] = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    items.push({
                        id: res.rows.item(i).id,
                        descripcion: res.rows.item(i).descripcion,
                        monto: res.rows.item(i).monto,
                        fecha: res.rows.item(i).fecha,
                        id_cuenta: res.rows.item(i).id_cuenta,
                        id_tipo_movimiento: res.rows.item(i).id_tipo_movimiento
                    })
                }
            }

            this.observableMovimiento.next(items as any);

        })
    }

    fetchMovimientos(): Observable<Movimiento[]> {
        return this.observableMovimiento.asObservable();
    }

    selectMovimientosCuenta(id_cuenta: number) {
        return this.database.executeSql('SELECT * FROM movimiento WHERE id_cuenta = ?', [id_cuenta]).then(res => {
            let items: Movimiento[] = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    items.push({
                        id: res.rows.item(i).id,
                        descripcion: res.rows.item(i).descripcion,
                        monto: res.rows.item(i).monto,
                        fecha: res.rows.item(i).fecha,
                        id_cuenta: res.rows.item(i).id_cuenta,
                        id_tipo_movimiento: res.rows.item(i).id_tipo_movimiento
                    })
                }
            }

            this.observableMovimientoCuenta.next(items as any);

        })
    }

    fetchMovimientosCuenta(): Observable<Movimiento[]> {
        return this.observableMovimientoCuenta.asObservable();
    }

    getMovimientoById(id_movimiento: number) {
        return this.database.executeSql('SELECT * FROM movimiento WHERE id = ?', [id_movimiento]).then(res => {
            let items: Movimiento[] = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    items.push({
                        id: res.rows.item(i).id,
                        descripcion: res.rows.item(i).descripcion,
                        monto: res.rows.item(i).monto,
                        fecha: res.rows.item(i).fecha,
                        id_cuenta: res.rows.item(i).id_cuenta,
                        id_tipo_movimiento: res.rows.item(i).id_tipo_movimiento
                    })
                }
            }

            this.obsMovimientoById.next(items as any);

        })
    }

    fetchMovimientoById(): Observable<Movimiento[]> {
        return this.obsMovimientoById.asObservable();
    }

    insertMovimiento(
        descripcion: string,
        monto: string,
        fecha: Date,
        id_cuenta: number,
        id_tipo_movimiento: number
    ) {
        let data = [descripcion, monto, fecha, id_cuenta, id_tipo_movimiento];
        return this.database.executeSql('INSERT INTO movimiento(descripcion, monto, fecha, id_cuenta, id_tipo_movimiento) VALUES (?, ?, ?, ?, ?)', data).then(res => {
            this.selectMovimientosCuenta(id_cuenta);
        })
            .catch((e: any) => {
                this.presentAlert('Error insert movimiento: ' + e.message);
            });
    }


    updateMovimiento(
        id: number,
        descripcion: string,
        monto: string,
        id_cuenta: number,
        id_tipo_movimiento: number,
    ) {
        let data = [descripcion, monto, id_cuenta, id_tipo_movimiento, id];
        return this.database.executeSql('UPDATE movimiento SET descripcion = ?, monto = ?, id_cuenta = ?, id_tipo_movimiento = ? WHERE id = ?', data).then(data2 => {
            this.selectMovimientosCuenta(id_cuenta);
        }).catch((e: any) => {
            this.presentAlert('Error update movimiento: ' + e.message);
        });
    }

    deleteMovimiento(id_movimiento: number, id_cuenta: number) {
        return this.database.executeSql('DELETE FROM movimiento WHERE id = ?', [id_movimiento]).then(a => {
            this.selectMovimientosCuenta(id_cuenta);
        }).catch((e: any) => {
            this.presentAlert('Error delete movimiento: ' + e.message);
        });
    }

    //TIPOS DE MOVIMIENTO -------------------------------------------------------------

    selectTiposMovimiento() {
        return this.database.executeSql('SELECT * FROM tipo_movimiento', []).then(res => {
            let items: TipoMovimiento[] = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    items.push({
                        id: res.rows.item(i).id,
                        descripcion: res.rows.item(i).descripcion
                    })
                }
            }

            this.observableTipoMovimiento.next(items as any);

        })
    }

    fetchTiposMovimiento(): Observable<TipoMovimiento[]> {
        return this.observableTipoMovimiento.asObservable();
    }

    getTipoMovimientoById(id_tipo_movimiento: number) {
        return this.database.executeSql('SELECT * FROM tipo_movimiento WHERE id = ?', [id_tipo_movimiento]).then(res => {
            let items: TipoMovimiento[] = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    items.push({
                        id: res.rows.item(i).id,
                        descripcion: res.rows.item(i).descripcion
                    })
                }
            }

            this.obsTipoMovimientoById.next(items as any);

        })
    }

    fetchTipoMovimientoById(): Observable<Movimiento[]> {
        return this.obsTipoMovimientoById.asObservable();
    }


    //Funciones BD
    async presentToast(msj: string) {
        const toast = await this.toastController.create({
            message: msj,
            duration: 3000,
            icon: 'globe'
        });

        await toast.present();
    }

    async presentAlert(msj: string) {
        const alert = await this.alertController.create({
            header: 'Alert',
            message: msj,
            buttons: ['OK'],
        });

        await alert.present();
    }
}
