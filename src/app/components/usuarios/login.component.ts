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
  constructor(
    private authService:AuthService,
    private router:Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  public login(): void {

    console.info(this.usuario)
    if (this.usuario.username == null || this.usuario.password == null) {
      //Swal.fire('Error login','Username or password vacios','error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response=>{
      console.log(response)
      this.router.navigate(['/home'])
      //Swal.fire('login',`Hola ${resonse.username}, has iniciado sesion con exito!`,'success');
    })
  }

}
