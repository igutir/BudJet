import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Cuenta } from '../interfaces/cuenta';
import { Movimiento } from '../interfaces/movimiento';
import { TipoMovimiento } from '../interfaces/tipo_movimiento';

@Component({
    selector: 'app-create-movement',
    templateUrl: './create-movement.page.html',
    styleUrls: ['./create-movement.page.scss'],
})
export class CreateMovementPage implements OnInit {

    cuentas_usuario: Cuenta[] = [
        {
            id: 1,
            id_user: 1,
            nombre: "Personal",
            saldo: 500000,
            fecha_creacion: new Date(),
            fecha_actualizacion: new Date()
        },
        {
            id: 2,
            id_user: 1,
            nombre: "Ahorro",
            saldo: 1500000,
            fecha_creacion: new Date(),
            fecha_actualizacion: new Date(),
        }
    ]

    nuevo_movimiento: Movimiento = {
        id: 0,
        id_cuenta: 0,
        descripcion: "",
        monto: 0,
        fecha: new Date(),
        tipo_movimiento: 1
    }

    tipos_movimiento: TipoMovimiento[] = [
        { id: 1, nombre: "Ingreso" },
        { id: 2, nombre: "Gasto" }
    ]

    constructor(private router: Router, public alertController: AlertController) { }

    ngOnInit() {
    }

    setIdMov(){
        this.nuevo_movimiento.id = 1;
    }

    setCuenta(cuenta: Cuenta) {
        this.nuevo_movimiento.id_cuenta = cuenta.id;
    }

    SetTipo(tipo: TipoMovimiento) {
        this.nuevo_movimiento.tipo_movimiento = tipo.id;
    }

    esNumerico(numero: number) {
        return (typeof numero === "number");
    }

    validarIngreso() {
        let monto_ok = false;
        let descripcion_ok = false;

        if (this.esNumerico(this.nuevo_movimiento.monto) && this.nuevo_movimiento.monto > 0){
            monto_ok = true;
        }
        else{
            if(!this.esNumerico(this.nuevo_movimiento.monto)) console.log("monto no numerico");
            if(!(this.nuevo_movimiento.monto > 0)) console.log("monto menor o igual a cero");
        }

        if (this.nuevo_movimiento.descripcion.length > 0){
            descripcion_ok = true;
        }
        else{
            if(!(this.nuevo_movimiento.descripcion.length > 0)) console.log("descripcion vacia");
        }
        return (monto_ok && descripcion_ok);
    }

    async ingresoExitoso() {
        if (this.validarIngreso()) {

            this.setIdMov();

            const alert = await this.alertController.create({
                header: 'Ingreso exitoso',
                message: 'Movimiento registrado exitosamente',
                buttons: ['OK']
            });

            await alert.present();

            this.goMovements();
        }

        else {
            const alert = await this.alertController.create({
                header: 'Error',
                message: 'Los datos ingresados no son válidos',
                buttons: ['OK']
            });

            await alert.present();
        }
    }

    goMovements() {

        this.router.navigate(['/movements']);

    }

    goHome() {

        this.router.navigate(['/home']);

    }

}
