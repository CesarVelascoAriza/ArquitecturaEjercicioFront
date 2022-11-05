import { EspecificacioTecnica } from "./especificacio-tecnica";

export class Producto {
    id:number=0;
    nombre:string="";
    cantidad:number=0;
    precio:number=0;
    createAt:string="";
    especificacionTecnica:EspecificacioTecnica= new EspecificacioTecnica();

}
