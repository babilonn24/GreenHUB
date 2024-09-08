import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from 'src/app/servicios/datos.service';
import { LoginService } from 'src/app/servicios/login.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent {

  nombre:any;
  categoria:any = "Tecnología";
  dato_servicio:any = DatosService;
  precio:any;
  unidad:any;
  descuento:any;
  usuario:any=LoginService.usuarioObtener();
  imagenPesada:boolean=false;
  imagen:any;

  constructor(private servicioProducto: ProductoService, private router:Router) { }

  registrarProducto(): void {
    if(!this.imagenPesada)
      this.servicioProducto.registrarProducto(
        {
          "nombre":this.nombre,
          "codigo_productor":this.usuario.dni_ruc,
          "categoria":this.categoria,
          "precio":this.precio,
          "unidad":this.unidad,
          "descuento":this.descuento,
          "imagen": this.imagen
        }
      ).subscribe(
        (data)=> {
          this.router.navigate(['']);
        },(err)=> {
          console.log(err)
        }   
      )
      else
      this.servicioProducto.registrarProducto(
        {
          "nombre":this.nombre,
          "codigo_productor":this.usuario.dni_ruc,
          "categoria":this.categoria,
          "precio":this.precio,
          "unidad":this.unidad,
          "descuento":this.descuento,
          "imagen": "defecto"
        }
      ).subscribe(
        (data)=> {
          this.router.navigate(['']);
        },(err)=> {
          console.log(err)
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
