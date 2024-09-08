import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { io } from "socket.io-client";
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent {

  nombre?:string;
  dni_ruc?:string;
  descripcion?:string;
  tipo:string="Empresa";
  clave?:string;
  correo?:string;
  celular?:number;
  mensajeErrorVisible:boolean=false;
  mensajeError:string='';
  imagenPesada:boolean=false;
  imagen:any;

  constructor(private servicioUsuario: UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  registrarUsuario(): void {
    if(!this.imagenPesada)
      this.servicioUsuario.registrarUsuario(
        {
          "nombre":this.nombre,
          "clave":Md5.hashStr(this.clave+""),
          "correo":this.correo,
          "celular":this.celular,
          "descripcion":this.descripcion,
          "dni_ruc":this.dni_ruc,
          "tipo":this.tipo,
          "imagen": this.imagen
        }
      ).subscribe(
        (data)=> {
          this.mensajeErrorVisible=false;
          this.router.navigate(['']);
        },(err)=> {
          console.log(err)
          this.mensajeErrorVisible=true;
          this.mensajeError=err;
        }   
      )
      else{
      this.servicioUsuario.registrarUsuario(
        {
          "nombre":this.nombre,
          "clave":Md5.hashStr(this.clave+""),
          "correo":this.correo,
          "celular":this.celular,
          "descripcion":this.descripcion,
          "dni_ruc":this.dni_ruc,
          "tipo":this.tipo,
          "imagen": "defecto"
        }
      ).subscribe(
        (data)=> {
          this.mensajeErrorVisible=false;
          this.router.navigate(['']);
        },(err)=> {
          console.log(err)
          this.mensajeErrorVisible=true;
          this.mensajeError=err;
        }   
      )
    }
  }

  cancelar():void {
    this.router.navigate(['']);
  }

  cargarImagen(event:any):void{
    const archivo = event.target.files[0];
    const lector= new FileReader();

    if (archivo.size > 1024*1024*5)
      this.imagenPesada=true;
    else
      this.imagenPesada=false;
    
    lector.onloadend = () => {
      if(!this.imagenPesada)
        this.imagen= lector.result;
      else
        this.imagen= null;
    }

    if(archivo)
      lector.readAsDataURL(archivo);
      
  }

}
