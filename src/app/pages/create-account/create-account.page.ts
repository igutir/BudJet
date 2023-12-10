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

    }

    ngOnInit() {
    }

    async ingresoExitoso() {

        if (this.nueva_cuenta.nombre.length > 0) {

            await this.DBService.insertCuenta(
                this.nueva_cuenta.nombre,
                this.nueva_cuenta.saldo,
                new Date(),
                new Date(),
                this.usuario.id,
            );

            if(parseInt(this.nueva_cuenta.saldo) > 0){

                let id_cuenta = await this.DBService.ultimaCuentaCreada(this.usuario.id);

                await this.DBService.insertMovimiento("Saldo inicial", this.nueva_cuenta.saldo, new Date(), id_cuenta, 1);

            }

            this.DBService.presentToast('Cuenta registrada exitosamente');

            this.goAccounts();
        }

        else {

            this.DBService.presentAlert("Campos con valores inválidos");

        }
    }

    goAccounts() {

        this.router.navigate(['/accounts']);
    }

    goHome() {

        this.router.navigate(['/home']);
    }

}
