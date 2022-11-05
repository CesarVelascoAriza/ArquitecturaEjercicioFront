import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlEndPoint:string="/api/productos"
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http:HttpClient) { }
  listar():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlEndPoint);
  }
  ver(id:number):Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`);
  }
  crear(producto:Producto):Observable<Producto>{
    return this.http.post<Producto>(this.urlEndPoint,producto,{headers:this.httpHeaders});
  }
  modificar(producto:Producto):Observable<Producto>{
    return this.http.put<Producto>(`${this.urlEndPoint}/${producto.id}`,producto,{headers:this.httpHeaders});
  }
  eliminar(id:number):Observable<void>{
    return this.http.get<void>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders});
  }
}
