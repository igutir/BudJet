import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Cuenta } from '../interfaces/cuenta';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { DataBaseServiceService } from 'src/app/services/data-base-service.service';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.page.html',
    styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {

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

    constructor(private activeRouter: ActivatedRoute, private router: Router, private DBService: DataBaseServiceService) {
        this.activeRouter.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation()?.extras?.state) {
                this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
            }
        })
    }

    ngOnInit() {
        registerLocaleData( es );

        this.DBService.selectCuentasUsuario(this.usuario.id);

        this.DBService.dbState().subscribe(res => {
            if(res){
                this.DBService.fetchCuentasPorUsuario().subscribe(item => {
                    this.arreglo_cuentas = item;
                })
            }
        })
    }

    seleccionarCuenta(id_cuenta: number) {

        for(var cuenta in this.arreglo_cuentas){
            if(this.arreglo_cuentas[cuenta].id === id_cuenta){
                this.cuenta_seleccionada.id = id_cuenta;
                this.cuenta_seleccionada.nombre = this.arreglo_cuentas[cuenta].nombre;
                this.cuenta_seleccionada.saldo = this.arreglo_cuentas[cuenta].saldo;
            }
        }


        let navigationExtras: NavigationExtras = {
            state: {
                usuario: this.usuario,
                cuenta_enviada: this.cuenta_seleccionada
            }
        }

        this.router.navigate(['/movements'], navigationExtras);
    }

    goToCreateAccounts() {

        let navigationExtras: NavigationExtras = {
            state: {
                usuario: this.usuario
            }
        }

        this.router.navigate(['/create-account'], navigationExtras);
    }

}
