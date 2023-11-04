import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.page.html',
    styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {

    cuenta1 = {
        id: 1,
        nombre: "Personal",
        saldo: 500000
    }

    cuenta2 = {
        id: 2,
        nombre: "Ahorro",
        saldo: 1500000
    }

    cuentas_registradas: any[] = [this.cuenta1, this.cuenta2];

    constructor(private router: Router) { }

    ngOnInit() {
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

}
