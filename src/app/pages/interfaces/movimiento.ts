export interface Movimiento {
    id: number;
    id_cuenta: number;
    descripcion: string;
    monto: number;
    fecha: Date;
    tipo_movimiento: number;
}