import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = 'Iniciar Sesion'
  usuario: Usuario;
  err:any;
  constructor(
    private authService:AuthService,
    private router:Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAutenticated()){
      //Swal.fire('login',`Hola ${this.authService.usuario.username}, ya esta auteticado !`,'info');
      this.router.navigate(['/home'])
    }
  }

  public login(): void {

    console.info(this.usuario)
    if (this.usuario.username == null || this.usuario.password == null) {
      //Swal.fire('Error login','Username or password vacios','error');
      return;
    }

    this.authService.login(this.usuario).subscribe({
     next:(response)=>{
      console.log(response);
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarUsuario(response.access_token);
      let usuario =this.authService.usuario;
      this.router.navigate(['/home'])
     },
     error:(e)=>{
      this.err=e
        if(this.err.status == 400){
          //Swal.fire('Error login','Username or password incorrectos!','error');
        }
     }
    })
  }

}
