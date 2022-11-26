import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  titulo: string = "Crear Producto";
  producto: Producto = new Producto();
  error: any;

  constructor(
    private servicio: ProductoService,
    private router: Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.editar();
  }

  crear(): void {
    this.servicio.crear(this.producto).subscribe(producto => {
      //alert(`alert producto id ${producto.nombre} creado con exito!`);
      Swal.fire('Nuevo:',`alert producto id ${producto.nombre} creado con exito!`,'success')
      this.router.navigate(['/productos'])
    }, err => {
      if (err.status === 400)
        this.error = err.error
    });
  }
  actualiza():void{
    this.servicio.modificar(this.producto).subscribe(producto=>{
      //alert(`producto ${producto.nombre} actualizado con exit`)
      Swal.fire('Modificado:',`producto ${producto.nombre} actualizado con exito`,'success')
      this.router.navigate(['/productos'])
    }, err => {
      if (err.status === 400)
        this.error = err.error
    })
  }
  editar():void{
      this.route.params.subscribe(params=>{
        let id=params['id']
        if(id){
          this.servicio.ver(id).subscribe((producto)=> this.producto=producto);
        }
      })
  }
}
