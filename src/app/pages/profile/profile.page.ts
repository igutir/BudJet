import { Component, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonItem } from '@ionic/angular';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements AfterViewInit {
    @ViewChildren(IonItem, { read: ElementRef }) profileItems!: QueryList<ElementRef<HTMLIonItemElement>>;

    private animacionProfile!: Animation;

    user = {
        username: "Israel",
        fecha_nacimiento: new Date(1994, 0, 1),
        email: "correo@budjet.cl",
        telefono: 123456789
    };

    constructor(private animationCtrl: AnimationController) {
        registerLocaleData(es);
    }

    ngAfterViewInit() {

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
}




