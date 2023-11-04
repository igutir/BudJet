import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    data: any;

    loggedUser = {
        nombre: "",
        apellido: ""
    }

    constructor(private activeRouter: ActivatedRoute, private router: Router, public alertController: AlertController) {
        this.activeRouter.queryParams.subscribe(params =>{
            if(this.router.getCurrentNavigation()?.extras?.state){
                this.data = this.router.getCurrentNavigation()?.extras?.state?.['user'];

            }
            else{
                this.router.navigate(["/login"])
            }
        })
    }

}
