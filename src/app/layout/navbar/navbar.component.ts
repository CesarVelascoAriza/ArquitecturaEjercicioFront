import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public autoService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    let username = this.autoService.usuario.username;
    this.autoService.logout();
    Swal.fire('logout',`Hola ${username}, has cerrado la sesion con exito ! `,'success');
    this.router.navigate(['/login'])
  }
}
