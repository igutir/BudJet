import { Component, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonItem } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { DataBaseServiceService } from 'src/app/services/data-base-service.service';
import { Usuario } from '../interfaces/usuario';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements AfterViewInit {
    @ViewChildren(IonItem, { read: ElementRef }) profileItems!: QueryList<ElementRef<HTMLIonItemElement>>;

    private animacionProfile!: Animation;

    usuario: any = {
        id: 0,
        nombre: ""
    }

    data_usuario: Usuario[] = [
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

    imagen: any = "/assets/img/default_profile_img.png";

    constructor(private animationCtrl: AnimationController, private DBService: DataBaseServiceService) {
        registerLocaleData(es);

        this.usuario = JSON.parse(localStorage.getItem("usuario") || '{}');

    }

    ngAfterViewInit() {

        this.DBService.getUsuariobyId(this.usuario.id);

        this.DBService.dbState().subscribe(res => {
            if (res) {
                this.DBService.fetchUsuarioById().subscribe(item => {
                    this.data_usuario = item;
                })
            }
        })

        const animacionItem1 = this.animationCtrl
            .create()
            .addElement(this.profileItems.get(1)!.nativeElement)
            .duration(200)
            .fromTo("transform", "translateX(-300px)", "translateX(0px)")
            .fromTo("opacity", 0.0, 1);

        const animacionItem2 = this.animationCtrl
            .create()
            .addElement(this.profileItems.get(2)!.nativeElement)
            .duration(400)
            .fromTo("transform", "translateX(-300px)", "translateX(0px)")
            .fromTo("opacity", 0.1, 1);

        const animacionItem3 = this.animationCtrl
            .create()
            .addElement(this.profileItems.get(3)!.nativeElement)
            .duration(600)
            .fromTo("transform", "translateX(-300px)", "translateX(0px)")
            .fromTo("opacity", 0.1, 1);

        const animacionItem4 = this.animationCtrl
            .create()
            .addElement(this.profileItems.get(4)!.nativeElement)
            .duration(800)
            .fromTo("transform", "translateX(-300px)", "translateX(0px)")
            .fromTo("opacity", 0.1, 1);


        const animacionItem5 = this.animationCtrl
            .create()
            .addElement(this.profileItems.get(5)!.nativeElement)
            .duration(1000)
            .fromTo("transform", "translateX(-300px)", "translateX(0px)")
            .fromTo("opacity", 0.1, 1);

        this.animacionProfile = this.animationCtrl
            .create()
            .duration(1000)
            .iterations(1)
            .addAnimation([animacionItem1, animacionItem2, animacionItem3, animacionItem4, animacionItem5]);

        this.runAnimations();
    }

    async runAnimations() {
        this.animacionProfile.play();
    }

    takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.DataUrl
        });
        // image.webPath will contain a path that can be set as an image src.
        // You can access the original file using image.path, which can be
        // passed to the Filesystem API to read the raw data of the image,
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        this.imagen = image.dataUrl;
    }
}




