import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataBaseServiceService } from 'src/app/services/data-base-service.service';

@Component({
    selector: 'app-update-account',
    templateUrl: './update-account.page.html',
    styleUrls: ['./update-account.page.scss'],
})
export class UpdateAccountPage implements OnInit {

    usuario: any = {
        id: 0,
        nombre: "",

    };

    id = 0;
    nombre = "";
    saldo = "";
    fecha_actualizacion = new Date();

    constructor(private activeRouter: ActivatedRoute, private router: Router, private DBService: DataBaseServiceService) {
        this.usuario = JSON.parse(localStorage.getItem("usuario") || '{}');

        this.activeRouter.queryParams.subscribe(param => {
            if (this.router.getCurrentNavigation()?.extras.state) {
                this.id = this.router.getCurrentNavigation()?.extras?.state?.['idEnv'];
                this.nombre = this.router.getCurrentNavigation()?.extras?.state?.['nombreEnv'];
                this.saldo = this.router.getCurrentNavigation()?.extras?.state?.['saldoEnv'];
            }
        })
    }

    ngOnInit() {
    }

    actualizarCuenta(){
        this.DBService.updateCuenta(this.id, this.nombre, this.saldo, this.fecha_actualizacion, this.usuario.ud);

        this.DBService.presentToast("Cuenta actualizado");

        this.router.navigate(['/accounts']);
    }

}
