import { Categoria } from "./categoria"

export class Docente{
    id_docente: number;
    nombre: String;
    dni: String;
    fch_nacimiento: Date;
    sueldo: number;
    email: String;
    sexo: String;
    categoria: Categoria;
}