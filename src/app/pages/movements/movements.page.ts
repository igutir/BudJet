import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Movimiento } from '../interfaces/movimiento';
import { DataBaseServiceService } from 'src/app/services/data-base-service.service';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
    selector: 'app-movements',
    templateUrl: './movements.page.html',
    styleUrls: ['./movements.page.scss'],
})
export class MovementsPage implements OnInit {

    usuario: any = {
        id: 0,
        nombre: "",
    };

    cuenta_consultada: any = {
        id: 0,
        nombre: "",
        saldo: "",
    }

    arreglo_movimientos: Movimiento[] = [
        {
            id: 0,
            descripcion: "",
            monto: "",
            fecha: new Date(),
            id_cuenta: 0,
            id_tipo_movimiento: 0,
        }
    ]

    constructor(private router: Router, private DBService: DataBaseServiceService) {

        this.usuario = JSON.parse(localStorage.getItem("usuario") || '{}');

        this.cuenta_consultada = JSON.parse(localStorage.getItem("cuenta_consultada") || '{}');

        localStorage.removeItem('movement_info');
    }

    ngOnInit() {
        registerLocaleData( es );

        this.DBService.selectMovimientosCuenta(this.cuenta_consultada.id);

        this.DBService.dbState().subscribe(res => {
            if(res){
                this.DBService.fetchMovimientosCuenta().subscribe(item => {
                    this.arreglo_movimientos = item;
                })
            }
        })
    }

    goHome() {

        this.router.navigate(['/home']);
    }

    goToCreateMovements() {

        this.router.navigate(['/create-movement']);
    }

    goUpdateMovement(movimiento: any){

        let movement_info_to_update: any = {
            id: movimiento.id,
            descripcion: movimiento.descripcion,
            monto: movimiento.monto,
            id_cuenta: movimiento.id_cuenta,
            nombre_cuenta: this.cuenta_consultada.nombre,
            id_tipo_movimiento: movimiento.id_tipo_movimiento
        }

        localStorage.setItem('movement_info', JSON.stringify(movement_info_to_update));

/*         let navigationExtras: NavigationExtras = {
            state: {
                idEnv: movimiento.id,
                descripcionEnv: movimiento.descripcion,
                montoEnv: movimiento.monto,
                id_cuentaEnv: movimiento.id_cuenta,
                id_tipo_movimientoEnv: movimiento.id_tipo_movimiento,
            }
        } */

        this.router.navigate(['/update-movement'] /* , navigationExtras */);
    }

    actualizarSaldoCuenta(movimiento: any){

        let monto_eliminado = parseInt(movimiento.monto);

        let saldo_antiguo = parseInt(this.cuenta_consultada.saldo);
        let saldo_nuevo = 0;
        let saldo_final = "";

        saldo_nuevo = saldo_antiguo - (monto_eliminado);
        console.log("saldo previo: " + saldo_nuevo);

        saldo_final = String(saldo_nuevo);

        console.log(String(saldo_nuevo));

        this.DBService.updateMontoCuentas(this.cuenta_consultada.id, saldo_final);
    }

    goDeleteMovement(movimiento: any){

        this.actualizarSaldoCuenta(movimiento);

        this.DBService.deleteMovimiento(movimiento.id, movimiento.id_cuenta);
        this.DBService.presentToast("Movimiento Eliminado");
    }
}
