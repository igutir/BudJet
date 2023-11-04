import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.page.html',
  styleUrls: ['./movements.page.scss'],
})
export class MovementsPage implements OnInit {

    cuenta_consultada = {
        id: 0,
        nombre: "",
        saldo: 0
    }

    mov1 = {
        id: 1,
        id_cuenta: 1,
        descripcion: "Sueldo",
        monto: 1500000,
        fecha: "01/11/2023",
        esIngreso: true
    }

    mov2 = {
        id: 2,
        id_cuenta: 1,
        descripcion: "Compra supermercado",
        monto: 100000,
        fecha: "05/11/2023",
        esIngreso: false
    }

    movimientos_cuenta: any[] = [this.mov1, this.mov2];

    constructor(private activeRouter: ActivatedRoute, private router: Router, public alertController: AlertController) {
        this.activeRouter.queryParams.subscribe(params =>{
            if(this.router.getCurrentNavigation()?.extras?.state){
                this.cuenta_consultada.id = this.router.getCurrentNavigation()?.extras?.state?.['cuenta_enviada.id'];
                this.cuenta_consultada.nombre = this.router.getCurrentNavigation()?.extras?.state?.['cuenta_enviada.nombre'];
                this.cuenta_consultada.saldo = this.router.getCurrentNavigation()?.extras?.state?.['cuenta_enviada.saldo'];
            }
            else{
                this.router.navigate(["/login"])
            }
        })
    }

  ngOnInit() {
  }

}
