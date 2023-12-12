import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataBaseServiceService } from 'src/app/services/data-base-service.service';
import { TipoMovimiento } from '../interfaces/tipo_movimiento';
import { Cuenta } from '../interfaces/cuenta';

@Component({
    selector: 'app-update-movement',
    templateUrl: './update-movement.page.html',
    styleUrls: ['./update-movement.page.scss'],
})
export class UpdateMovementPage implements OnInit {

    //DATOS

    usuario: any = {
        id: 0,
        nombre: "",

    };

    arreglo_cuentas: Cuenta[] = [
        {
            id: 0,
            nombre: "",
            saldo: "",
            fecha_creacion: new Date(),
            fecha_actualizacion: new Date(),
            id_usuario: 0
        }
    ]

    tipos_movimiento: TipoMovimiento[] = [
            {
                id: 0,
                descripcion: ""
            }
        ]
    //ACTUALES

    cuenta_consultada: any = {
        id: 0,
        nombre: "",
        saldo: "",
    }

    tipo_movimiento: any = {
            id: 0,
            descripcion: ""
        }

    //NUEVOS

    id = 0;
    descripcion = "";
    monto = "";
    fecha = new Date();
    id_cuenta = 0;
    id_tipo_movimiento = 0;


    constructor(private activeRouter: ActivatedRoute, private router: Router, private DBService: DataBaseServiceService) {

        this.usuario = JSON.parse(localStorage.getItem("usuario") || '{}');

        this.cuenta_consultada = JSON.parse(localStorage.getItem("cuenta_consultada") || '{}');

        this.activeRouter.queryParams.subscribe(param =>{
            if(this.router.getCurrentNavigation()?.extras.state){
                this.id = this.router.getCurrentNavigation()?.extras?.state?.['idEnv'];
                this.descripcion = this.router.getCurrentNavigation()?.extras?.state?.['descripcionEnv'];
                this.monto = this.router.getCurrentNavigation()?.extras?.state?.['montoEnv'];
                this.id_cuenta = this.router.getCurrentNavigation()?.extras?.state?.['id_cuentaEnv'];
                this.id_tipo_movimiento = this.router.getCurrentNavigation()?.extras?.state?.['id_tipo_movimientoEnv'];
            }
        })
     }

    ngOnInit() {


        //CUENTAS REGISTRADAS DEL USUARIO
        this.DBService.selectCuentasUsuario(this.usuario.id);

        this.DBService.dbState().subscribe(res => {
            if(res){
                this.DBService.fetchCuentasPorUsuario().subscribe(item => {
                    this.arreglo_cuentas = item;
                })
            }
        })

        //TIPOS DE MOVIMIENTO REGISTRADOS EN LA APP
        this.DBService.selectTiposMovimiento();

        this.DBService.dbState().subscribe(res => {
            if(res){
                this.DBService.fetchTiposMovimiento().subscribe(item => {
                    this.tipos_movimiento = item;
                })
            }
        })

        this.DBService.getTipoMovimientoById(this.id_tipo_movimiento);

        this.DBService.dbState().subscribe(res => {
            if(res){
                this.DBService.fetchTipoMovimientoById().subscribe(item => {
                    this.tipo_movimiento = item;
                })
            }
        })
    }

    setCuenta(cuenta: Cuenta) {
        this.id_cuenta = cuenta.id;
    }

    setTipoCuenta(tipo: TipoMovimiento) {
        this.id_tipo_movimiento = tipo.id;
    }

    actualizarMovimiento(){
        this.DBService.updateMovimiento(this.id, this.descripcion, this.monto, this.id_cuenta, this.id_tipo_movimiento);

        this.DBService.presentToast("Movimiento actualizado");

        this.router.navigate(['/movements']);
    }

}
