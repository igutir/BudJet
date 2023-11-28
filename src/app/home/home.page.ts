import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Usuario } from '../pages/interfaces/usuario';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    usuario: any = {
        id: 0,
        nombre: "",
    };

    constructor(private activeRouter: ActivatedRoute, private router: Router) {

        this.activeRouter.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation()?.extras?.state) {
                this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
            }
        })
    }

    goToAccounts() {

        let navigationExtras: NavigationExtras = {
            state: {
                usuario: this.usuario
            }
        }

        this.router.navigate(['/accounts'], navigationExtras);
    }

    goToCreateMovements() {

        let navigationExtras: NavigationExtras = {
            state: {
                usuario: this.usuario
            }
        }

        this.router.navigate(['/create-movement'], navigationExtras);
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
