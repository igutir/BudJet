import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    user: any;

    constructor(private activeRouter: ActivatedRoute, private router: Router, public alertController: AlertController) {
        this.activeRouter.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation()?.extras?.state) {
                this.user = this.router.getCurrentNavigation()?.extras?.state?.['user'];
            }
            else{
                this.user = {
                    username: "Israel",
                    password: "1234"
                }
            }
        })
    }

    goToAccounts() {

        let navigationExtras: NavigationExtras = {
            state: {
                user: this.user
            }
        }

        this.router.navigate(['/accounts'], navigationExtras);
    }

    goToCreateMovements() {

        let navigationExtras: NavigationExtras = {
            state: {
                user: this.user
            }
        }

        this.router.navigate(['/create-movement'], navigationExtras);
    }

    goToCreateAccounts() {

        this.router.navigate(['/create-account']);
    }

}
