import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent {
  nombre?:string;
  descripcion?:string;
  dni_ruc?:string;
  tipo?:string;
  clave?:string;
  correo?:string;
  celular?:number;
  usuario:any;
  mensajeErrorVisible:boolean=false;
  mensajeError:string='';
  imagenPesada:boolean=false;
  imagen:any;

  constructor(private servicioUsuario: UsuarioService, private router:Router, private route: ActivatedRoute) {
    this.usuario=LoginService.usuarioObtener();
    this.dni_ruc=this.usuario?.dni_ruc
    this.nombre=this.usuario?.nombre;
    this.correo=this.usuario?.correo;
    this.celular=this.usuario?.celular;
    this.clave=this.usuario?.clave;
    this.tipo=this.usuario?.tipo;
    this.descripcion=this.usuario?.descripcion;
    this.imagen=this.usuario?.imagen;

  }

  ngOnInit(): void {
  }

  modificarUsuario(): void {
    if(!this.imagenPesada)
      this.servicioUsuario.actualizarUsuario(
        {
          "nombre":this.nombre,
          "clave":Md5.hashStr(this.clave+""),
          "correo":this.correo,
          "celular":this.celular,
          "dni_ruc":this.dni_ruc,
          "descripcion":this.descripcion,
          "tipo":this.tipo,
          "imagen":this.imagen,
        }, LoginService.usuarioObtener()
      ).subscribe(
        (data)=> {
          LoginService.salir();
          LoginService.registrar(data);
          this.mensajeErrorVisible=false;
          this.router.navigate(['mi-usuario']);
        },(err)=> {
          console.log(err)
          this.mensajeErrorVisible=true;
          this.mensajeError=err;
        }   
      )
    else
    this.servicioUsuario.actualizarUsuario(
      {
        "nombre":this.nombre,
        "clave":Md5.hashStr(this.clave+""),
        "correo":this.correo,
        "celular":this.celular,
        "descripcion":this.descripcion,
        "dni_ruc":this.dni_ruc,
        "tipo":this.tipo,
        "imagen":"defecto"
      }, LoginService.usuarioObtener()
    ).subscribe(
      (data)=> {
        LoginService.salir();
        LoginService.registrar(data);
        this.mensajeErrorVisible=false;
        this.router.navigate(['mi-usuario']);
      },(err)=> {
        console.log(err)
        this.mensajeErrorVisible=true;
        this.mensajeError=err;
      }   
    )
  }

  cancelar():void {
    this.router.navigate(['mi-usuario']);
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
