export interface User{
    uid?:string,
    nombre?: string,
    apellidos?: string,
    correo: string,
    password: string,
    telefono?: string,
    locacion?: string,
    imagen?: string,
    imagenPortada?:string,
    oficio?: string,
    descripcion?:string,
}