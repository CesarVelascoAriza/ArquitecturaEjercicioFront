import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { buffer, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  public login(usuario:Usuario):Observable<any>{
    const urlEndPoit='localhost:8090/api/security/oauth/token';

    const credentials= btoa('AngularApp'+':'+ '1234567890');
    const httpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' +credentials
    });
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.username);
    params.set('password',usuario.password);
    return this.http.post<any>(urlEndPoit,params.toString(),{headers:httpHeaders});
  }
}
