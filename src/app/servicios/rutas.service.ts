import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RutasService {
  
  constructor(private router:Router) {

  }

  public irUsuario(dni_ruc:any): void{
    if(LoginService.usuarioObtener() && LoginService.usuarioObtener().dni_ruc == dni_ruc)
      this.router.navigate(['mi-usuario']);
    else
      this.router.navigate(['ver-usuario/'+ dni_ruc]);
  }
}
