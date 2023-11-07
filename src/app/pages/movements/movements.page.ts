import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Cuenta } from '../interfaces/cuenta';
import { Movimiento } from '../interfaces/movimiento';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
    selector: 'app-movements',
    templateUrl: './movements.page.html',
    styleUrls: ['./movements.page.scss'],
})
export class MovementsPage implements OnInit {

    cuenta_consultada: Cuenta = {
        id: 0,
        id_user: 0,
        nombre: "",
        saldo: 0,
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date()
    }

    movimientos_cuenta_1: Movimiento[] = [
        {
            id: 1,
            id_cuenta: 1,
            descripcion: "Sueldo",
            monto: 1500000,
            fecha: new Date(),
            tipo_movimiento: 1
        },
        {
            id: 2,
            id_cuenta: 1,
            descripcion: "Compra supermercado",
            monto: 100000,
            fecha: new Date(),
            tipo_movimiento: 2
        }
    ]

    movimientos_cuenta_2: Movimiento[] = [
        {
            id: 3,
            id_cuenta: 1,
            descripcion: "Ahorro casa",
            monto: 520000,
            fecha: new Date(),
            tipo_movimiento: 1
        },
        {
            id: 4,
            id_cuenta: 1,
            descripcion: "Emergencia",
            monto: 70000,
            fecha: new Date(),
            tipo_movimiento: 2
        }
    ]

    movimiento_nuevo: Movimiento = {
        id: 3,
        id_cuenta: 0,
        descripcion: "Compra supermercado",
        monto: 100000,
        fecha: new Date(),
        tipo_movimiento: 2
    }

    constructor(private activeRouter: ActivatedRoute, private router: Router, public alertController: AlertController) {
        this.activeRouter.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation()?.extras?.state) {
                this.cuenta_consultada = this.router.getCurrentNavigation()?.extras?.state?.['cuenta_enviada'];
            }
            else {
                this.cuenta_consultada = {
                    id: 1,
                    id_user: 1,
                    nombre: "Personal",
                    saldo: 500000,
                    fecha_creacion: new Date(),
                    fecha_actualizacion: new Date()
                }
            }
        })
    }

    ngOnInit() {
        registerLocaleData( es );
    }
}
