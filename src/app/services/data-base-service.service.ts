import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

import { Cuenta } from '../pages/interfaces/cuenta';
import { Movimiento } from '../pages/interfaces/movimiento';

@Injectable({
    providedIn: 'root'
})
export class DataBaseServiceService {

    public database!: SQLiteObject;

    tablaUsuario: string = "CREATE TABLE IF NOT EXIST usuario(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(8) NOT NULL, email VARCHAR(50), telefono VARCHAR(9), fecha_nacimiento DATE, imagen_perfil BLOB, notificaciones BOOLEAN NOT NULL, password VARCHAR(4) NOT NULL;)";

    tablaCuenta: string = "CREATE TABLE IF NOT EXIST cuenta(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, saldo INTEGER NOT NULL, fecha_creacion DATE NOT NULL, fecha_actualizacion DATE NOT NULL, id_usuario INTEGER NOT NULL, FOREIGN KEY(id_usuario) REFERENCES usuario(id);)";

    tablaTipoMovimiento: string = "CREATE TABLE IF NOT EXIST tipo_movimiento(id INTEGER PRIMARY KEY autoincrement, descripcion VARCHAR(50) NOT NULL;)";

    tablaMovimiento: string = "CREATE TABLE IF NOT EXIST movimiento(id INTEGER PRIMARY KEY autoincrement, descripcion VARCHAR(50) NOT NULL, monto INTEGER NOT NULL, fecha DATE NOT NULL, id_cuenta INTEGER NOT NULL, id_tipo_movimiento INTEGER NOT NULL, FOREIGN KEY(id_cuenta) REFERENCES cuenta(id), FOREIGN KEY(id_tipo_movimiento) REFERENCES tipo_movimiento(id);)";

    usuarioPrueba: string = "INSERT or IGNORE INTO usuario(id, nombre, email, telefono, fecha_nacimiento, imagen_perfil, notificaciones, password) VALUES (1, 'prueba', 'email@budjet.cl', '912345678', '01/01/2000', NULL, true, '1234');";

    cuentaPersonal: string = "INSERT or IGNORE INTO cuenta(id, nombre, saldo, fecha_creacion, fecha_actualizacion, id_usuario) VALUES (1, 'Personal', '1500000', '01/01/2020', '03/05/2023', 1);";

    cuentaAhorro: string = "INSERT or IGNORE INTO cuenta(id, nombre, saldo, fecha_creacion, fecha_actualizacion, id_usuario) VALUES (2, 'Ahorro', '2000000', '01/01/2019', '14/09/2023', 1);";

    tipoMovimientoIngreso: string = "INSERT or IGNORE INTO tipo_movimiento(id, descripcion) VALUES (1, 'Ingreso');";

    tipoMovimientoGasto: string = "INSERT or IGNORE INTO tipo_movimiento(id, descripcion) VALUES (2, 'Gasto');";

    movimientoPersonalUno: string = "INSERT or IGNORE INTO movimiento(id, descripcion, monto, fecha, id_cuenta, id_tipo_movimiento) VALUES (1, 'Sueldo', '1500000', '01/05/2023', 1, 1);";

    movimientoPersonalDos: string = "INSERT or IGNORE INTO movimiento(id, descripcion, monto, fecha, id_cuenta, id_tipo_movimiento) VALUES (2, 'Compra supermercado', '100000', '03/05/2023', 1, 2);";

    movimientoAhorrolUno: string = "INSERT or IGNORE INTO movimiento(id, descripcion, monto, fecha, id_cuenta, id_tipo_movimiento) VALUES (3, 'Ahorro casa', '520000', '02/04/2023', 2, 1);";

    movimientoAhorrolDos: string = "INSERT or IGNORE INTO movimiento(id, descripcion, monto, fecha, id_cuenta, id_tipo_movimiento) VALUES (4, 'Emergencia', '70000', '14/09/2023', 2, 2);";

    observableCuenta = new BehaviorSubject([]);
    observableMovimiento = new BehaviorSubject([]);

    private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController, private alertController: AlertController) {
        this.createDB();
    }

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

    createDB() {
        this.platform.ready().then(() => {

            this.sqlite.create({
                name: 'budjet.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                this.database = db;
                this.createTables();
            }).catch(e => {
                this.presentToast("Error BD:" + e);
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

            this.buscarCuentas();
            this.buscarMovimientos();

            this.isDBReady.next(true);

        } catch (e) {
            this.presentToast("Error Tablas: " + e);
        }
    }

    buscarCuentas() {
        return this.database.executeSql('SELECT * FROM cuenta', []).then(res => {
            let items: Cuenta[] = [];
            if (res.rows.lenght > 0) {
                for (var i = 0; i < res.rows.lenght; i++) {
                    items.push({
                        id: res.rows.item(i).id,
                        nombre: res.rows.item(i).nombre,
                        saldo: res.rows.item(i).saldo,
                        fecha_creacion: res.rows.item(i).fecha_creacion,
                        fecha_actualizacion: res.rows.item(i).fecha_actualizacion,
                        id_user: res.rows.item(i).id_usuario
                    })
                }
            }

            this.observableCuenta.next(items as any);

        })
    }

    buscarMovimientos() {
        return this.database.executeSql('SELECT * FROM movimiento', []).then(res => {
            let items: Movimiento[] = [];
            if (res.rows.lenght > 0) {
                for (var i = 0; i < res.rows.lenght; i++) {
                    items.push({
                        id: res.rows.item(i).id,
                        descripcion: res.rows.item(i).descripcion,
                        monto: res.rows.item(i).monto,
                        fecha: res.rows.item(i).fecha,
                        id_cuenta: res.rows.item(i).id_cuenta,
                        tipo_movimiento: res.rows.item(i).id_tipo_movimiento
                    })
                }
            }

            this.observableMovimiento.next(items as any);

        })
    }

    dbState() {
        return this.isDBReady.asObservable();
    }

    fetchCuentas(): Observable<Cuenta[]> {
        return this.observableCuenta.asObservable();
    }

    fetchMovimientos(): Observable<Movimiento[]> {
        return this.observableMovimiento.asObservable();
    }

}
