import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Cuenta } from '../interfaces/cuenta';
import { DataBaseServiceService } from 'src/app/services/data-base-service.service';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.page.html',
    styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

    usuario: any = {
        id: 0,
        nombre: "",
    };

    nueva_cuenta: Cuenta = {
        id: 0,
        nombre: "",
        saldo: "",
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date(),
        id_usuario: 0,
    }

    constructor(private activeRouter: ActivatedRoute, private router: Router, private DBService: DataBaseServiceService) {

        this.usuario = JSON.parse(localStorage.getItem("usuario") || '{}');
/* 
        this.activeRouter.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation()?.extras?.state) {
                this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
            }
        }) */
    }

    ngOnInit() {
    }

    validarIngreso() {

        let nombre_ok = false;

        if (this.nueva_cuenta.nombre.length > 0) {
            nombre_ok = true;
        }
        else {
            if (!(this.nueva_cuenta.nombre.length > 0)) this.DBService.presentToast('Nombre vacío');
        }
        return nombre_ok;
    }

    ingresoExitoso() {
        if (this.validarIngreso()) {

            this.DBService.insertCuenta(
                this.nueva_cuenta.nombre,
                this.nueva_cuenta.saldo,
                new Date(),
                new Date(),
                this.usuario.id,
            );

            this.DBService.presentToast('Cuenta registrada exitosamente');

            this.goAccounts();
        }

        else {

            this.DBService.presentToast('El nombre no puede estar vacío');

        }
    }

    goAccounts() {

        /* let navigationExtras: NavigationExtras = {
            state: {
                usuario: this.usuario
            }
        } */

        this.router.navigate(['/accounts']/* , navigationExtras */);

    }

    goHome() {

        /* let navigationExtras: NavigationExtras = {
            state: {
                usuario: this.usuario
            }
        } */

        this.router.navigate(['/home']/* , navigationExtras */);
    }


}
