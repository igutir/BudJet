import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataBaseServiceService } from 'src/app/services/data-base-service.service';


@Component({
    selector: 'app-update-movement',
    templateUrl: './update-movement.page.html',
    styleUrls: ['./update-movement.page.scss'],
})
export class UpdateMovementPage implements OnInit {

    //DATOS

    usuario: any = {
        id: 0,
        nombre: "",

    };

    //ACTUALES

    cuenta_consultada: any = {
        id: 0,
        nombre: "",
        saldo: "",
    }

    tipo_movimiento: any = {
        id: 0,
        descripcion: ""
    }


    //NUEVOS

    movimiento: any = {
        id: 0,
        descripcion: "",
        monto: "",
        id_cuenta: 0,
        nombre_cuenta: "",
        id_tipo_movimiento: 0
    }

    id = 0;
    descripcion = "";
    monto = "";
    fecha = new Date();
    id_cuenta = 0;
    nombre_cuenta = "";
    id_tipo_movimiento = 0;
    descripcion_tipo = "";


    constructor(private router: Router, private DBService: DataBaseServiceService) {

        this.usuario = JSON.parse(localStorage.getItem("usuario") || '{}');

        this.cuenta_consultada = JSON.parse(localStorage.getItem("cuenta_consultada") || '{}');

        this.movimiento = JSON.parse(localStorage.getItem("movement_info") || '{}');

        this.id = this.movimiento.id;
        this.descripcion = this.movimiento.descripcion;
        this.monto = this.movimiento.monto;
        this.id_cuenta = this.movimiento.id_cuenta;
        this.nombre_cuenta = this.movimiento.nombre_cuenta;
        this.id_tipo_movimiento = this.movimiento.id_tipo_movimiento;

    }

    async ngOnInit() {

        this.tipo_movimiento = await this.DBService.getTipoMovimientoById(this.id_tipo_movimiento);

        console.log("monto de local Storage: " + this.movimiento.monto);

        let monto_abs = String(Math.abs(this.movimiento.monto));

        console.log("monto ABS: " + monto_abs);

        this.monto = monto_abs;

        console.log("monto nuevo: " + this.monto);

    }

    async actualizarSaldoCuenta(){

        let saldo_antiguo = parseInt(this.cuenta_consultada.saldo);
        let saldo_nuevo = 0;
        let monto_antiguo = Math.abs(parseInt(this.movimiento.monto));
        let monto_nuevo = parseInt(this.monto);
        let saldo_final = "";

        console.log("saldo_antiguo : " + saldo_antiguo);
        console.log("monto_antiguo : " + monto_antiguo);
        console.log("monto_nuevo : " + monto_nuevo);

        console.log("saldo_nuevo : " + saldo_nuevo);

        if(this.tipo_movimiento.id === 1){

            saldo_nuevo = saldo_antiguo - monto_antiguo;
            saldo_nuevo = saldo_nuevo + monto_nuevo;

            console.log("saldo_nuevo : " + saldo_nuevo);
        }
        else{
            saldo_nuevo = saldo_antiguo + monto_antiguo;
            saldo_nuevo = saldo_nuevo - monto_nuevo;

            console.log("saldo_nuevo : " + saldo_nuevo);

            this.monto = "-" + this.monto;

            console.log("monto : " + this.monto);
        }

        saldo_final = String(saldo_nuevo);

        console.log("saldo_final : " + saldo_final);

        console.log("entrada : " + this.cuenta_consultada.id + " | " +saldo_final);

        await this.DBService.updateMontoCuentas(this.cuenta_consultada.id, saldo_final);
    }

    async actualizarMovimiento() {

        this.actualizarSaldoCuenta();

        console.log(this.id + "|" +  this.descripcion + "|" +  this.monto + "|" +  this.cuenta_consultada.id)

        this.DBService.updateMovimiento(this.id, this.descripcion, this.monto, this.cuenta_consultada.id);

        this.DBService.presentToast("Movimiento actualizado");

        this.router.navigate(['/movements']);
    }

}
