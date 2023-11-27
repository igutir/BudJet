import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuenta } from '../interfaces/cuenta';
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

    constructor(private activeRouter: ActivatedRoute, private router: Router, private DBService: DataBaseServiceService) {
        this.activeRouter.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation()?.extras?.state) {
                this.cuenta_consultada = this.router.getCurrentNavigation()?.extras?.state?.['cuenta_enviada'];
            }
        })
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
}
