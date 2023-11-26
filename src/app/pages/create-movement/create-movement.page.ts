import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataBaseServiceService } from 'src/app/services/data-base-service.service';
import { Usuario } from '../interfaces/usuario';
import { Cuenta } from '../interfaces/cuenta';
import { Movimiento } from '../interfaces/movimiento';
import { TipoMovimiento } from '../interfaces/tipo_movimiento';

@Component({
    selector: 'app-create-movement',
    templateUrl: './create-movement.page.html',
    styleUrls: ['./create-movement.page.scss'],
})
export class CreateMovementPage implements OnInit {

    usuario: Usuario = {
        id: 0,
        nombre: "",
        password: "",
        email: "",
        telefono: "",
        fecha_nacimiento: new Date(),
        imagen_perfil: "",
        notificaciones: false
    };

    arreglo_cuentas: Cuenta[] = [
        {
            id: 0,
            nombre: "",
            saldo: "",
            fecha_creacion: new Date(),
            fecha_actualizacion: new Date(),
            id_usuario: 0
        }
    ]

    cuenta_seleccionada: Cuenta = {
        id: 0,
        nombre: "",
        saldo: "",
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date(),
        id_usuario: 0
    }

    tipos_movimiento: TipoMovimiento[] = [
        { id: 0, nombre: "" }
    ]

    nuevo_movimiento: Movimiento = {
        id: 0,
        descripcion: "",
        monto: "",
        fecha: new Date(),
        id_tipo_movimiento: 1,
        id_cuenta: 0,
    }

    constructor(private activeRouter: ActivatedRoute, private router: Router, private DBService: DataBaseServiceService) {
        this.activeRouter.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation()?.extras?.state) {
                this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
            }
        })
    }

    ngOnInit() {

        //CUENTAS REGISTRADAS DEL USUARIO
        this.DBService.selectCuentasUsuario(this.usuario.id);

        this.DBService.dbState().subscribe(res => {
            if(res){
                this.DBService.fetchCuentasPorUsuario().subscribe(item => {
                    this.arreglo_cuentas = item;
                })
            }
        })

        //TIPOS DE MOVIMIENTO REGISTRADOS EN LA APP
        this.DBService.selectTiposMovimiento();

        this.DBService.dbState().subscribe(res => {
            if(res){
                this.DBService.fetchTiposMovimiento().subscribe(item => {
                    this.tipos_movimiento = item;
                })
            }
        })

    }

    setCuenta(id_cuenta: number) {
        this.nuevo_movimiento.id_cuenta = id_cuenta;
    }

    setTipoCuenta(id_tipo_cuenta: number) {
        this.nuevo_movimiento.id_tipo_movimiento = id_tipo_cuenta;
    }

    esNumerico(texto: string) {
        if (typeof texto !== "string") return false;

        if (texto.replace(/[0-9]/g, "") === "") {
            return true;
        }

        else {
            return false;
        }
    }

    validarIngreso() {
        let monto_ok = false;
        let descripcion_ok = false;

        if (this.esNumerico(this.nuevo_movimiento.monto) && this.nuevo_movimiento.monto != "0"){
            monto_ok = true;
        }
        else{
            if(!this.esNumerico(this.nuevo_movimiento.monto)) this.DBService.presentToast('Monto no numerico');
            if(!(this.nuevo_movimiento.monto != "0")) this.DBService.presentToast('Monto menor o igual a cero');
        }

        if (this.nuevo_movimiento.descripcion.length > 0){
            descripcion_ok = true;
        }
        else{
            if(!(this.nuevo_movimiento.descripcion.length > 0)) this.DBService.presentToast('Descripción vacía');
        }
        return (monto_ok && descripcion_ok);
    }

    async ingresoExitoso() {

        if (this.validarIngreso()) {

            this.DBService.insertMovimiento
            (
                this.nuevo_movimiento.descripcion,
                this.nuevo_movimiento.monto,
                new Date(),
                this.nuevo_movimiento.id_cuenta,
                this.nuevo_movimiento.id_tipo_movimiento
            )

            this.DBService.presentToast('Movimiento registrado exitosamente');

            this.goMovements();
        }

        else {

            this.DBService.presentToast('Los datos ingresados no son válidos');

        }
    }

    goMovements() {

        this.router.navigate(['/movements']);

    }

    goHome() {

        this.router.navigate(['/home']);

    }

}
