import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-mi-producto',
  templateUrl: './mi-producto.component.html',
  styleUrls: ['./mi-producto.component.css']
})
export class MiProductoComponent {

  producto:any;
  nombre:any;
  codigo_productor:any;

  constructor(private servicioProducto: ProductoService, private route: ActivatedRoute, private router:Router) { 
    
    this.nombre  = this.route.snapshot.paramMap.get('nombre');
    this.codigo_productor = this.route.snapshot.paramMap.get('codigo_productor');
    this.servicioProducto.obtenerProducto(this.nombre,this.codigo_productor).subscribe(
      (data)=> {
        console.log(data);
        this.producto=data;
      },
      (err)=> {
      }   
    );
  }

  modificarProducto(nombre:any, codigo_productor:any): void{

    this.router.navigate(['modificar-producto/'+codigo_productor+'/'+nombre])

  }

  eliminarProducto(producto:any): void{

    this.servicioProducto.eliminarProducto(producto).subscribe(
      (data)=> {
        this.router.navigate(['mi-usuario'])
      },
      (err)=> {
      }   
    );

  }
}
