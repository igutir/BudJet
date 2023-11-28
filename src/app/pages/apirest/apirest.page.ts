import { Component, OnInit } from '@angular/core';
import { ApiclientService } from 'src/app/services/apiclient.service';

@Component({
    selector: 'app-apirest',
    templateUrl: './apirest.page.html',
    styleUrls: ['./apirest.page.scss'],
})
export class ApirestPage implements OnInit {

    cuentas: any;
    cuenta: any;

    movimientos: any;
    movimiento: any = {
        id: null,
        descripcion: "",
        monto: "",
        fecha: "",
        tipo_movimiento: "",
        id_cuenta: null
    };

    compareWith: any;

    constructor(private api: ApiclientService) { }

    ionViewWillEnter() {
        this.getCuentas();
        this.getMovimientos();
    }
    ngOnInit() {
    }

    getCuenta(id_cuenta: any) {
        this.api.getCuenta(id_cuenta).subscribe((data) => {
            console.log(data)
            this.cuenta = data;
        });
    }

    getCuentas() {
        this.api.getCuentas().subscribe((data) => {
            this.cuentas = data;
        });
    }

    /* getMovimiento(id_movimiento: any){
        this.api.getMovimiento(id_movimiento).subscribe((data)=>{
            console.log(data)
            this.movimiento = data;
        });
    } */

    getMovimientos() {
        this.api.getMovimientos().subscribe((data) => {
            this.movimientos = data;
        });
    }

    saveMovimiento() {
        if (this.movimiento.id_cuenta == null) {
            if (this.cuenta == undefined) {
                console.log("Seleccione una cuenta")
                return;
            }

            this.movimiento.id_cuenta = this.cuenta.id;
            this.api.createMovimiento(this.movimiento).subscribe(
                () => {
                    console.log("Creado correctamente")
                    this.getMovimientos();
                },
                error => {
                    console.log("Error " + error)
                }
            );
        }
        else{
            this.api.updateMovimiento(this.movimiento.id, this.movimiento).subscribe(
                ()=>{
                    console.log("Actualizado correctamente")
                    this.getMovimientos();
                },
                error => {
                    console.log("Error " + error)
                }
            );
        }
    }

    setMovimiento(_movimiento: any){
        this.movimiento = _movimiento;
        this.getCuenta(_movimiento.id_cuenta);
        this.compareWith = this.compareWithFn;
    }

    deleteMovimiento(_movimiento: any){
        console.log("eliminar");
        this.api.deleteMovimiento(_movimiento.id).subscribe(
            success => {
                console.log("Eliminado correctamente")
                this.getMovimientos();
            },
            error => {
                console.log("Error " + error)
            }
        )
    }

    compareWithFn = (o1: any, o2: any) => {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };








}
