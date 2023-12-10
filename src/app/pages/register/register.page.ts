import { AfterViewInit, Component, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Animation, AnimationController, IonList } from '@ionic/angular'
import { Usuario } from '../interfaces/usuario';
import { DataBaseServiceService } from 'src/app/services/data-base-service.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements AfterViewInit {
    @ViewChild(IonList, {read: ElementRef}) titulo!: ElementRef<HTMLIonListElement>;

    usuario_actual: Usuario = {
        id: 0,
        nombre: "",
        email: "",
        telefono: "",
        fecha_nacimiento: new Date(),
        imagen_perfil: "",
        notificaciones: true
    }

    password = "";

    private animation!: Animation;

    constructor(private router: Router, public alertController: AlertController, private animationCtrl: AnimationController, private DBService: DataBaseServiceService) { }

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

    validarEmail(texto: string) {

        if (typeof texto !== "string") return false;

        if (texto.replace(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "") === "") {
            return true;
        }

        else {
            return false;
        }
    }

    validarTelefono(numero: string){
        if (typeof numero !== "string") return false;

        if (numero.replace(/\d{9}/g, "") === "") {
            return true;
        }

        else {
            return false;
        }
    }

    cambiarToggleNotificaciones(){
        this.usuario_actual.notificaciones =  !this.usuario_actual.notificaciones;
    }

    validarCredenciales() {
        let validacion_usuario = false;
        let validacion_password = false;
        let validacion_email = false;
        let validacion_telefono = false;

        if (this.alfanumerico(this.usuario_actual.nombre) && this.usuario_actual.nombre.length >= 3 && this.usuario_actual.nombre.length <= 8) validacion_usuario = true;

        if (this.numerico(this.password) && this.password.length === 4) validacion_password = true;

        if(this.validarEmail(this.usuario_actual.email) && this.usuario_actual.email.length > 0) validacion_email = true;

        if (this.validarTelefono(this.usuario_actual.telefono)) validacion_telefono = true;

        return (validacion_usuario && validacion_password && validacion_email && validacion_telefono);
    }

    async enviarDatos() {

        if (this.validarCredenciales()) {

            await this.DBService.insertUsuario(this.usuario_actual.nombre, this.password,  this.usuario_actual.email, this.usuario_actual.telefono, this.usuario_actual.fecha_nacimiento, "", this.usuario_actual.notificaciones);

            this.DBService.presentAlert("Usuario registrado correctamente");

            this.router.navigate(['/login']);
        }

        else {

            this.DBService.presentAlert("Los datos no son validos para el registro");
        }
    }

    goToLogin() {
        this.router.navigate(['/login']);
    }

}
