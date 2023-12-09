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

    usuarioActual: UsuarioSimple = {
        id: 0,
        nombre: ""
    }

    password = "";

    validacion_credenciales = false;
    autenticacion = false;

    authUsuario: Usuario[] = [
        {
            id: 0,
            nombre: "",
            email: "",
            telefono: "",
            fecha_nacimiento: new Date(),
            imagen_perfil: "",
            notificaciones: false
        }
    ]

    usuarios_simples: UsuarioSimple[] = [];

    private animation!: Animation;

    constructor(private router: Router, private animationCtrl: AnimationController, private DBService: DataBaseServiceService) { }

    ngAfterViewInit() {

        localStorage.clear();

        this.DBService.dbState().subscribe(res => {
            if (res) {
                this.DBService.fetchUsuariosSimples().subscribe(item => {
                    this.usuarios_simples = item;
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


    /*  validarUsuario() {

        this.autenticacion = false;

        console.log(JSON.stringify(this.authUsuario));

        this.DBService.autenticarUsuario(this.usuarioActual.nombre, this.password);

        console.log(JSON.stringify(this.authUsuario));

        if(this.authUsuario[0].id !== 0){
            console.log("comparacion: " + (this.authUsuario[0].id !== 0));

            console.log("id: " + this.authUsuario[0].id + " | tipo: " + typeof(this.authUsuario[0].id));

            this.usuarioActual.id = this.authUsuario[0].id;

            this.autenticacion = true;
        }

        console.log("NO IF---");
    } */

    async autenticarUsuarioSimple(){

        let usuario: any = {
            id: 0,
            nombre: ""
        };

        usuario = await this.DBService.autenticarUsuario(this.usuarioActual.nombre, this.password);

 /*        usuario = this.getUsuarioSimple(); */

        console.log("usuario autenticado " + JSON.stringify(usuario));

        if(usuario.id === 0){

            console.log("No definido, consulta no trae datos al arreglo / Usuario no encontrado");

            console.log("usuario autenticado? " + JSON.stringify(usuario));
        }
        else{
            this.usuarioActual.id = usuario.id;
            this.usuarioActual.nombre = usuario.nombre;

            console.log("usuario autenticado ELSE" + JSON.stringify(usuario));
            console.log("usuario actual " + JSON.stringify(this.usuarioActual));

            this.autenticacion = true;
        }
    }

    async enviarDatos() {

        this.validarCredenciales();

        /* this.validarUsuario(); */

        await this.autenticarUsuarioSimple();

        if (this.validacion_credenciales && this.autenticacion) {

            console.log("validacion credenciales ok");

            localStorage.setItem('usuario', JSON.stringify(this.usuarioActual));

            this.DBService.presentToast('Login exitoso');

            /* let navigationExtras: NavigationExtras = {
                state: {
                    usuario: this.usuarioActual
                }
            } */

            this.router.navigate(['/home']/* , navigationExtras */);
        }
    }

    goToRegister() {
        this.router.navigate(['/register']);
    }

    goToApi() {
        this.router.navigate(['/apirest']);
    }

    A(){
        console.log("A || credenciales validas?: " + this.validacion_credenciales + " | " + "usuario autenticado?: " + this.autenticacion);
    }

    B(){

        console.log("B || Largo del arreglo de usuarios: " + this.authUsuario.length +"");

        for(var i = 0; i < this.authUsuario.length; i++){
            console.log("B || Usuario AUTH ID: " + this.authUsuario[i].id + " | " + "Usuario AUTH Nombre: " + this.authUsuario[i].nombre);
        }
    }

    C(){
        console.log("C || Usuario actual ID: " + this.usuarioActual.id + " | " + "Usuario actual Nombre: " + this.usuarioActual.nombre);
    }

   

/*     getUsuarioSimple(){
        
        return usuarios;
    } */

}
