import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  correo:any;
  clave:any;

  constructor(private servicioUsuario: UsuarioService, private router: Router) {
  }

  ingresar():void{
    
    this.servicioUsuario.loggearUsuario(this.correo,Md5.hashStr(this.clave+"")).subscribe(
      (data)=>{
        LoginService.registrar(data);
        this.router.navigate(['mi-usuario']);
      },
      (err)=>{
      }
    );

  }

}
