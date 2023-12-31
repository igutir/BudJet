import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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

    constructor(private router: Router, private DBService: DataBaseServiceService) {

        this.usuario = JSON.parse(localStorage.getItem("usuario") || '{}');

        localStorage.removeItem('cuenta_consultada');
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

        this.goMovements();
    }

    goMovements() {

        localStorage.setItem('cuenta_consultada', JSON.stringify(this.cuenta_seleccionada));

        this.router.navigate(['/movements']);
    }

    goToCreateAccounts() {

        this.router.navigate(['/create-account']);
    }

    goUpdateAccount(cuenta: any){

        let navigationExtras: NavigationExtras = {
            state: {
                idEnv: cuenta.id,
                nombreEnv: cuenta.nombre,
                saldoEnv: cuenta.saldo,
            }
        }

        this.router.navigate(['/update-account'] , navigationExtras);
    }

    goDeleteAccount(cuenta: any){
        this.DBService.deleteCuenta(this.usuario.id, cuenta.id);
        this.DBService.presentToast("Cuenta Eliminada");
    }

}
