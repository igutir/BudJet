export interface Movimiento {
    id: number;
    descripcion: string;
    monto: string;
    fecha: Date;
    id_cuenta: number;
    id_tipo_movimiento: number;
}