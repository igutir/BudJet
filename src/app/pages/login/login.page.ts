import { OnInit, AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import type { Animation } from '@ionic/angular'
import { AnimationController, IonList } from '@ionic/angular'
import { DataBaseServiceService } from 'src/app/services/data-base-service.service';
import { Usuario } from '../interfaces/usuario';
import { UsuarioSimple } from '../interfaces/usuario_simple';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {

    @ViewChild(IonList, { read: ElementRef }) titulo!: ElementRef<HTMLIonListElement>;

    usuarioActual: any = {
        id: 0,
        nombre: ""
    }

    password = "";

    validacion_credenciales = false;
    autenticacion = false;

    usuarios_simples: UsuarioSimple[] = [];

    private animation!: Animation;

    constructor(private router: Router, private animationCtrl: AnimationController, private DBService: DataBaseServiceService) { }

    ngAfterViewInit() {

        localStorage.clear();

  /*       this.DBService.dbState().subscribe(res => {
            if (res) {
                this.DBService.fetchUsuariosSimples().subscribe(item => {
                    this.usuarios_simples = item;
                })
            }
        }) */

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
        this.validacion_credenciales = false;

        if (this.alfanumerico(this.usuarioActual.nombre) && this.usuarioActual.nombre.length >= 3 && this.usuarioActual.nombre.length <= 8) validacion_usuario = true;

        if (this.numerico(this.password) && this.password.length === 4) validacion_password = true;

        if (validacion_usuario && validacion_password) {
            this.validacion_credenciales = true;

        }
        else {
            this.DBService.presentAlert('Credenciales inválidas');
        }
    }

    async autenticarUsuarioSimple(){

        this.autenticacion = false;

        let usuario: any = {
            id: 0,
            nombre: ""
        };

        usuario = await this.DBService.autenticarUsuario(this.usuarioActual.nombre, this.password);

        if(usuario.id === 0){

            this.DBService.presentAlert("Usuario no encontrado");
        }
        else{
            this.usuarioActual.id = usuario.id;
            this.usuarioActual.nombre = usuario.nombre;

            this.autenticacion = true;
        }
    }

    async enviarDatos() {

        this.validarCredenciales();

        await this.autenticarUsuarioSimple();

        if (this.validacion_credenciales && this.autenticacion) {

            localStorage.setItem('usuario', JSON.stringify(this.usuarioActual));

            this.DBService.presentToast('Login exitoso');

            this.router.navigate(['/home']);
        }
    }

    goToRegister() {
        this.router.navigate(['/register']);
    }

    goToApi() {
        this.router.navigate(['/apirest']);
    }

}
