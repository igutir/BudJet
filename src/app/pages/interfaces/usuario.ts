export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
    fecha_nacimiento: Date;
    imagen_perfil: string;
    notificaciones: boolean;
}