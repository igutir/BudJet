import { OnInit, AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import type { Animation } from  '@ionic/angular'
import { AnimationController, IonList } from  '@ionic/angular'
import { DataBaseServiceService } from 'src/app/services/data-base-service.service';
import { Usuario } from '../interfaces/usuario';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {

    @ViewChild(IonList, {read: ElementRef}) titulo!: ElementRef<HTMLIonListElement>;

    usuariosRegistrados: Usuario[] = [
        {
            id: 0,
            nombre: "",
            password: "",
            email: "",
            telefono: "",
            fecha_nacimiento: new Date(),
            imagen_perfil: "",
            notificaciones: false
        }
    ]

    usuarioActual: Usuario = {
        id: 0,
        nombre: "",
        password: "",
        email: "",
        telefono: "",
        fecha_nacimiento: new Date(),
        imagen_perfil: "",
        notificaciones: false
    }

    private animation!: Animation;

    constructor(private router: Router, private animationCtrl: AnimationController, private DBService: DataBaseServiceService) { }

    ngAfterViewInit() {

        this.DBService.dbState().subscribe(res => {
            if(res){
                this.DBService.fetchUsuarios().subscribe(item => {
                    this.usuariosRegistrados = item;
                })
            }
        })

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

        if (this.alfanumerico(this.usuarioActual.nombre) && this.usuarioActual.nombre.length >= 3 && this.usuarioActual.nombre.length <= 8) validacion_usuario = true;

        if (this.numerico(this.usuarioActual.password) && this.usuarioActual.password.length === 4) validacion_password = true;

        if (validacion_usuario && validacion_password){
            return true;

        }
        else{
            this.DBService.presentAlert('Credenciales inválidas');
            return false;
        }
    }


    validarUsuario(){
        for(let i=0; i< this.usuariosRegistrados.length; i++){
            if(this.usuariosRegistrados[i].nombre === this.usuarioActual.nombre){
                if(this.usuariosRegistrados[i].password === this.usuarioActual.password){
                    this.usuarioActual.id = this.usuariosRegistrados[i].id
                    return true;
                }
                else{
                    this.DBService.presentAlert('Contraseña incorrecta');
                }
            }
        }
        this.DBService.presentAlert('Usuario no encontrado');

        return false;
    }

    enviarDatos() {

        if (this.validarCredenciales() && this.validarUsuario()) {

            console.log("validacion credenciales ok");

            this.DBService.presentToast('Login exitoso');

            let navigationExtras: NavigationExtras = {
                state: {
                    usuario: this.usuarioActual
                }
            }

            this.router.navigate(['/home'], navigationExtras);
        }
    }

    goToRegister(){
        this.router.navigate(['/register']);
    }

}
