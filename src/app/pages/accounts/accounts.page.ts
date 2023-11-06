import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Cuenta } from '../interfaces/cuenta';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.page.html',
    styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {

    cuentas_registradas: Cuenta[] = [
        {
            id: 1,
            id_user: 1,
            nombre: "Personal",
            saldo: 1400000,
            fecha_creacion: new Date(2020, 5, 19),
            fecha_actualizacion: new Date()
        }, {
            id: 2,
            id_user: 1,
            nombre: "Ahorro",
            saldo: 450000,
            fecha_creacion: new Date(2020, 12, 5),
            fecha_actualizacion: new Date()
        }
    ];

    constructor(private router: Router) { }

    ngOnInit() {
        registerLocaleData( es );
    }

    seleccionarCuenta(id_cuenta: number) {

        let cuenta_seleccionada;

        for(var cuenta in this.cuentas_registradas){
            if(this.cuentas_registradas[cuenta].id === id_cuenta){
                cuenta_seleccionada = this.cuentas_registradas[cuenta];
            }
        }

        let navigationExtras: NavigationExtras = {
            state: {
                cuenta_enviada: cuenta_seleccionada
            }
        }

        this.router.navigate(['/movements'], navigationExtras);
    }

    goToCreateAccounts() {

        this.router.navigate(['/create-account']);
    }

}
