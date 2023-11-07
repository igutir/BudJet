import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Cuenta } from '../interfaces/cuenta';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.page.html',
    styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

    nueva_cuenta: Cuenta = {
        id: 3,
        id_user: 1,
        nombre: "",
        saldo: 0,
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date()
    }

constructor(private router: Router, public alertController: AlertController) { }

ngOnInit() {
}

validarIngreso() {

    let nombre_ok = false;

    if (this.nueva_cuenta.nombre.length > 0){
        nombre_ok = true;
    }
    else{
        if(!(this.nueva_cuenta.nombre.length > 0)) console.log("nombre vacio");
    }
    return nombre_ok;
}

async ingresoExitoso() {
    if (this.validarIngreso()) {

        const alert = await this.alertController.create({
            header: 'Ingreso exitoso',
            message: 'Cuenta registrada exitosamente',
            buttons: ['OK']
        });

        await alert.present();

        this.goAccounts();
    }

    else {
        const alert = await this.alertController.create({
            header: 'Error',
            message: 'El nombre no puede estar vacío',
            buttons: ['OK']
        });

        await alert.present();
    }
}

goAccounts() {

    this.router.navigate(['/accounts']);

}

}
