import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Usuario } from '../pages/interfaces/usuario';
import { DataBaseServiceService } from '../services/data-base-service.service';

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

    constructor(private activeRouter: ActivatedRoute, private router: Router, private DBService: DataBaseServiceService) {

        this.usuario = JSON.parse(localStorage.getItem("usuario") || '{}');

        localStorage.removeItem('cuenta_consultada');

        this.actualizarSaldosUsuario();

    }

    async actualizarSaldosUsuario(){
        await this.DBService.actualizarSaldos(this.usuario.id);
        console.log("saldos actualizados en la bd...")
    }

    goToAccounts() {

        this.router.navigate(['/accounts']);
    }

    goToCreateMovements() {

        this.router.navigate(['/create-movement']);
    }

    goToCreateAccounts() {

        this.router.navigate(['/create-account']);
    }

}
