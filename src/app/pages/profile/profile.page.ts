import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    user = {
        username: "Israel",
        fecha_nacimiento: new Date(1994, 1, 1),
        email: "correo@budjet.cl",
        telefono: 123456789
    };

    constructor() { }

    ngOnInit() {
        registerLocaleData( es );
    }

}
