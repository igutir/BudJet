import { Injectable } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataBaseServiceService {

    public database!: SQLiteObject;

    tablaUsuario: string = "CREATE TABLE IF NOT EXIST usuario(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(8) NOT NULL, email VARCHAR(50), telefono VARCHAR(9), fecha_nacimiento DATE, imagen_perfil BLOB, notificaciones BOOLEAN NOT NULL, password VARCHAR(4) NOT NULL;)";

    tablaCuenta: string = "CREATE TABLE IF NOT EXIST cuenta(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, saldo INTEGER NOT NULL, id_usuario INTEGER NOT NULL, FOREIGN KEY(id_usuario) REFERENCES usuario(id);)";

    tablaTipoMovimiento: string = "CREATE TABLE IF NOT EXIST tipo_movimiento(id INTEGER PRIMARY KEY autoincrement, descripcion VARCHAR(50) NOT NULL;)";

    tablaMovimiento: string = "CREATE TABLE IF NOT EXIST movimiento(id INTEGER PRIMARY KEY autoincrement, descripcion VARCHAR(50) NOT NULL, monto INTEGER NOT NULL, fecha DATE NOT NULL, id_cuenta INTEGER NOT NULL, id_tipo_movimiento INTEGER NOT NULL, FOREIGN KEY(id_cuenta) REFERENCES cuenta(id), FOREIGN KEY(id_tipo_movimiento) REFERENCES tipo_movimiento(id);)";

    usuarioPrueba: string = "INSERT or IGNORE INTO usuario(id, nombre, email, telefono, fecha_nacimiento, imagen_perfil, notificaciones, password) VALUES (1, 'prueba', 'email@budjet.cl', '912345678', '01/01/2000', NULL, true, '1234');";

    cuentaPersonal: string = "INSERT or IGNORE INTO cuenta(id, nombre, saldo, id_usuario) VALUES (1, 'Personal', '1500000', 1);";

    cuentaAhorro: string = "INSERT or IGNORE INTO cuenta(id, nombre, saldo, id_usuario) VALUES (2, 'Ahorro', '2000000', 1);";

    tipoMovimientoIngreso: string = "INSERT or IGNORE INTO tipo_movimiento(id, descripcion) VALUES (1, 'Ingreso');";

    tipoMovimientoGasto: string = "INSERT or IGNORE INTO tipo_movimiento(id, descripcion) VALUES (2, 'Gasto');";

    movimientoPersonalUno: string = "INSERT or IGNORE INTO movimiento(id, descripcion, monto, fecha, id_cuenta, id_tipo_movimiento) VALUES (1, 'Sueldo', '1500000', "


    constructor() { }
}
