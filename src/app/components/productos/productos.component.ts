import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';
import {PageEvent} from '@angular/material/paginator';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  lista: Producto[]=[];
  titulo:string='Lista de productos';
  totalRegistros=0;
  totalPorPagina=5;
  paginaActual=0;
  pageSizeOptions:number[]=[5, 10,25,100]

  constructor(private service:ProductoService) { }

  ngOnInit(): void {
    this.calcularRangos();
    //this.service.listar().subscribe(lista=> this.lista=lista);
  }
  eliminar(producto: Producto): void {
    Swal.fire({
      title: "Alerta !",
      text: `seguro de eliminar a ${producto.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(producto.id).subscribe(() => {
          //this.lista = this.lista.filter(p => p !== producto);
          //alert(`Producto ${producto.nombre} eliminado con exito`) 'Eliminado :',`Producto ${producto.nombre} eliminado con exito`
          this.calcularRangos();
          Swal.fire('Eliminado :', `Producto ${producto.nombre} eliminado con exito`)
        });
      }
    })
  }
  private calcularRangos(){
    this.service.listarPagina(this.paginaActual.toString(),this.totalPorPagina.toString()).subscribe( p =>{
      this.lista = p.content as Producto[]
      this.totalRegistros= p.totalElements as number;
    })
  }
  paginar(event:PageEvent):void{
    this.paginaActual=event.pageIndex;
    this.totalPorPagina=event.pageSize;
    this.calcularRangos();
  }
}
