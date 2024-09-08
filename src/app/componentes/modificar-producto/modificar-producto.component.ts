import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from 'src/app/servicios/datos.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent {

  producto_antiguo:any;
  nombre:any;
  codigo_productor:any;
  dato_servicio:any = DatosService;
  categoria:any;
  precio:any;
  unidad:any;
  imagen:any
  imagenPesada:boolean=false;
  descuento:any;

  constructor(private servicioProducto: ProductoService, private route: ActivatedRoute, private router:Router) { 
    
    this.nombre  = this.route.snapshot.paramMap.get('nombre');
    this.codigo_productor = this.route.snapshot.paramMap.get('codigo_productor');
    this.servicioProducto.obtenerProducto(this.nombre,this.codigo_productor).subscribe(
      (data)=> {
        this.producto_antiguo=data;
        this.categoria=data.categoria;
        this.precio=data.precio;
        this.unidad=data.unidad;
        this.imagen=data.imagen;
        this.descuento=data.descuento;
      },
      (err)=> {
      }   
    );
  }

  modificarProducto(): void {
    if(!this.imagenPesada)
    this.servicioProducto.modificarProducto(this.producto_antiguo,
      {
        "nombre":this.nombre,
        "codigo_productor":this.codigo_productor,
        "categoria":this.categoria,
        "precio":this.precio,
        "unidad":this.unidad,
        "descuento":this.descuento,
        "imagen":this.imagen
      }
    ).subscribe(
      (data)=> {
        this.router.navigate(['mi-producto/'+data.codigo_productor+'/'+data.nombre]);
      },(err)=> {
        console.log(err)
      }   
    )
    else
    this.servicioProducto.modificarProducto(this.producto_antiguo,
      {
        "nombre":this.nombre,
        "codigo_productor":this.codigo_productor,
        "categoria":this.categoria,
        "precio":this.precio,
        "unidad":this.unidad,
        "descuento":this.descuento,
        "imagen":"defecto"
      }
    ).subscribe(
      (data)=> {
        this.router.navigate(['mi-producto/'+data.codigo_productor+'/'+data.nombre]);
      },(err)=> {
        console.log(err)
      }   
    )
  }

  cancelar():void {
    this.router.navigate(['mi-producto/'+this.codigo_productor+'/'+this.nombre]);
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
