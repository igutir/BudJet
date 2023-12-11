import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DataBaseServiceService } from 'src/app/services/data-base-service.service';
import { Cuenta } from '../interfaces/cuenta';
import { TipoMovimiento } from '../interfaces/tipo_movimiento';

@Component({
    selector: 'app-create-movement',
    templateUrl: './create-movement.page.html',
    styleUrls: ['./create-movement.page.scss'],
})
export class CreateMovementPage implements OnInit {

    usuario: any = {
        id: 0,
        nombre: ""
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
        saldo: ""
    }

    tipos_movimiento: TipoMovimiento[] = [
        {
            id: 0,
            descripcion: ""
        }
    ]

    nuevo_movimiento: any = {
    id: 0,
    descripcion: "",
    monto: "",
    fecha: new Date(),
    id_cuenta: 0,
    id_tipo_movimiento: 0
    }

    constructor(private activeRouter: ActivatedRoute, private router: Router, private DBService: DataBaseServiceService) {

        this.usuario = JSON.parse(localStorage.getItem("usuario") || '{}');
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

    setCuenta(cuenta: Cuenta) {
        this.nuevo_movimiento.id_cuenta = cuenta.id;
        this.cuenta_seleccionada.id = cuenta.id;
        this.cuenta_seleccionada.nombre = cuenta.nombre;
        this.cuenta_seleccionada.saldo = cuenta.saldo;
    }

    setTipoCuenta(tipo: TipoMovimiento) {
        this.nuevo_movimiento.id_tipo_movimiento = tipo.id;
    }

    esNumerico(texto: string) {

        let monto = String(texto);

        if (monto.replace(/[0-9]/g, "") === "") {

            if(monto !== "0"){
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

        if (this.esNumerico(this.nuevo_movimiento.monto)){
            monto_ok = true;
        }

        if (this.nuevo_movimiento.descripcion.length > 0){
            descripcion_ok = true;
        }
        else{
            this.DBService.presentAlert("Descripcion vacia");
        }

        return (monto_ok && descripcion_ok);
    }

    actualizarSaldoCuenta(){

        let monto_movimiento = parseInt(this.nuevo_movimiento.monto);
        let saldo_cuenta = parseInt(this.cuenta_seleccionada.saldo);

        let nuevo_saldo = 0;

        if(this.nuevo_movimiento.id_tipo_movimiento === 1){

            nuevo_saldo = (saldo_cuenta + monto_movimiento);
        }
        else{
            nuevo_saldo = (saldo_cuenta - monto_movimiento);
        }

        let saldo_final = String(nuevo_saldo);

        this.DBService.updateMontoCuentas(this.cuenta_seleccionada.id, saldo_final);
    }

    ingresoExitoso() {

        if(this.validarIngreso()){

            if(this.nuevo_movimiento.id_tipo_movimiento === 2){

                this.nuevo_movimiento.monto = "-" +  this.nuevo_movimiento.monto;
            }

            this.DBService.insertMovimiento(this.nuevo_movimiento.descripcion, this.nuevo_movimiento.monto,new Date(),this.nuevo_movimiento.id_cuenta,this.nuevo_movimiento.id_tipo_movimiento);

            this.actualizarSaldoCuenta();

            this.goMovements();
        }
    }

    goMovements() {

        localStorage.setItem('cuenta_consultada', JSON.stringify(this.cuenta_seleccionada));

        this.router.navigate(['/movements']);
    }

    goHome() {

        this.router.navigate(['/home']);
    }
}
