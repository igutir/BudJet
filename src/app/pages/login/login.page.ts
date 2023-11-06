import { AfterViewInit, Component, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Animation, AnimationController, IonList } from  '@ionic/angular'

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {

    @ViewChild(IonList, {read: ElementRef}) titulo!: ElementRef<HTMLIonListElement>;

    user = {
        username: "",
        password: ""
    }

    private animation!: Animation;

    constructor(private router: Router, public alertController: AlertController, private animationCtrl: AnimationController) { }

    ngAfterViewInit() {
        this.animation = this.animationCtrl
            .create()
            .addElement(this.titulo.nativeElement)
            .duration(1500)
            .iterations(1)
            .fromTo("transform", "translateY(100px)", "translateY(0px)")
            .fromTo("opacity", 0.2, 1);

        this.animation.play();

    }

    numerico(texto: string) {
        if (typeof texto !== "string") return false;

        if (texto.replace(/[0-9]/g, "") === "") {
            return true;
        }

        else {
            return false;
        }
    }

    alfanumerico(texto: string) {

        if (typeof texto !== "string") return false;

        if (texto.replace(/[A-Z]|[a-z]|[0-9]/g, "") === "") {
            return true;
        }

        else {
            return false;
        }
    }

    validarCredenciales() {
        let validacion_usuario = false;
        let validacion_password = false;

        if (this.alfanumerico(this.user.username) && this.user.username.length >= 3 && this.user.username.length <= 8) validacion_usuario = true;

        if (this.numerico(this.user.password) && this.user.password.length === 4) validacion_password = true;

        return (validacion_usuario && validacion_password);
    }

    async enviarDatos() {

        if (this.validarCredenciales()) {

            console.log("validacion credenciales ok")

            let navigationExtras: NavigationExtras = {
                state: {
                    user: this.user
                }
            }

            this.router.navigate(['/home'], navigationExtras);
        }

        else {
            console.log("Credenciales invalidas");

            const alert = await this.alertController.create({
                header: 'Error',
                message: 'Las credenciales ingresadas no son correctas',
                buttons: ['OK']
            });

            await alert.present();

        }
    }

}
