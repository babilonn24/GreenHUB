import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  usuario:any;

  constructor(private router: Router) {
  }

  ingresar():void {
    this.router.navigate(['login']);
  }

  salir():void {
    LoginService.salir();
    CarritoService.deshacer();
    this.router.navigate(['']);
  }

  inicio():void {
    this.router.navigate(['']);
  }

  carrito():void {
    this.router.navigate(['carrito']);
  }

  miUsuario():void {
    this.router.navigate(['mi-usuario']);
  }

  registrarUsuario(): void{
    this.router.navigate(['agregar-usuario']);
  }

  ingreso():boolean {
    this.usuario= LoginService.usuarioObtener();
    if(this.usuario){
      return true;
    }else{
      return false;
    }
  }

}
