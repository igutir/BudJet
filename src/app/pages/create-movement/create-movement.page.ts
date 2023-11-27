import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DataBaseServiceService } from 'src/app/services/data-base-service.service';
import { Cuenta } from '../interfaces/cuenta';
import { Movimiento } from '../interfaces/movimiento';
import { TipoMovimiento } from '../interfaces/tipo_movimiento';

@Component({
    selector: 'app-create-movement',
    templateUrl: './create-movement.page.html',
    styleUrls: ['./create-movement.page.scss'],
})
export class CreateMovementPage implements OnInit {

    usuario: any = {
        id: 0,
        nombre: "",

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

    cuenta_seleccionada: any = {
        id: 0,
        nombre: "",
        saldo: "",
    }

    tipos_movimiento: TipoMovimiento[] = [
        {
            id: 0,
            descripcion: ""
        }
    ]

        id = 0;
        descripcion = "";
        monto = "";
        fecha = new Date();
        id_cuenta = 0;
        id_tipo_movimiento = 0;

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

        this.DBService.dbState().subscribe(res => {
            if(res){
                this.DBService.fetchCuentasPorUsuario().subscribe(item => {
                    this.arreglo_cuentas = item;
                })
            }
        })

    }

    setCuenta(cuenta: Cuenta) {
        this.id_cuenta = cuenta.id;
        this.cuenta_seleccionada.id = cuenta.id;
        this.cuenta_seleccionada.nombre = cuenta.nombre;
        this.cuenta_seleccionada.saldo = cuenta.saldo;
    }

    setTipoCuenta(tipo: TipoMovimiento) {
        this.id_tipo_movimiento = tipo.id;
    }

    esNumerico(texto: string) {

        if (texto.replace(/[0-9]/g, "") === "") {

            if(texto !== "0"){
                return true;
            }
            else{
                this.DBService.presentAlert("El monto no puede ser cero");
                return false;
            }

        }

        else {
            this.DBService.presentAlert("No es numerico");
            return false;
        }

    }

    validarIngreso() {
        let monto_ok = false;
        let descripcion_ok = false;

        if (this.esNumerico(this.monto)){
            monto_ok = true;
        }

        if (this.descripcion.length > 0){
            descripcion_ok = true;
        }
        else{
            this.DBService.presentAlert("Descripcion vacia");
        }

        return (monto_ok && descripcion_ok);
    }

    ingresoExitoso() {

        this.DBService.insertMovimiento(this.descripcion,this.monto,new Date(),this.id_cuenta,this.id_tipo_movimiento);

        this.goMovements();
    }

    goMovements() {

        let navigationExtras: NavigationExtras = {
            state: {
                cuenta_enviada: this.cuenta_seleccionada
            }
        }

        this.router.navigate(['/movements'], navigationExtras);
    }

    goHome() {

        let navigationExtras: NavigationExtras = {
            state: {
                usuario: this.usuario
            }
        }

        this.router.navigate(['/home'], navigationExtras);
    }

}
