import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductoFormComponent } from './components/productos/producto-form.component';
import { ProductosComponent } from './components/productos/productos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { VentasComponent } from './components/ventas/ventas.component';

const routes: Routes = [
  {path:"",pathMatch:'full', redirectTo:"home"},
  {path:"home",component:HomeComponent},
  {path:"usuarios",component:UsuariosComponent},
  {path:"ventas", component:VentasComponent},
  {path:"productos",component:ProductosComponent},
  {path:"productos/form",component:ProductoFormComponent},
  {path:"productos/form/:id",component:ProductoFormComponent},
  {path:"**",redirectTo:"/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
