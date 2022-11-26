import { EspecificacionTecnica } from "./especificacio-tecnica";

export class Producto {
    id:number=0;
    nombre:string="";
    cantidad:number=0;
    precio:number=0;
    createAt:string="";
    especificacion:EspecificacionTecnica= new EspecificacionTecnica();

}
