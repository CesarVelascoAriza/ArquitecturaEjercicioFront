import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { buffer, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario?: Usuario;
  private _token?: string;

  constructor(
    private http: HttpClient
  ) { }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    }
    else {
      if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
        this._usuario = JSON.parse(sessionStorage.getItem('usuario')!) as Usuario;
        return this._usuario;
      }
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else {
      if (this._token == null && sessionStorage.getItem('token') != '') {
        this._token = sessionStorage.getItem('token')!;
        return this._token
      }
    }
    return null!;
  }


  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.username = payload.user_name;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.nombre = payload.nombre;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {

    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null
  }
  public login(usuario: Usuario): Observable<any> {
    const urlEndPoit = '/api/security/oauth/token';

    const credentials = btoa('AngularApp' + ':' + '1234567890');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credentials
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post<any>(urlEndPoit, params.toString(), { headers: httpHeaders });
  }

  isAutenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null!;
    this._usuario = null!;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.clear()
  }
  hasRoles(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false
  }
}
