import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { LoginService } from 'src/app/servicios/login.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent {

  producto:any;
  nombre:any;
  codigo_productor:any;

  constructor(private servicioProducto: ProductoService, private route: ActivatedRoute, private router:Router) { 
    
    this.nombre  = this.route.snapshot.paramMap.get('nombre');
    this.codigo_productor = this.route.snapshot.paramMap.get('codigo_productor');
    this.servicioProducto.obtenerProducto(this.nombre,this.codigo_productor).subscribe(
      (data)=> {
        this.producto=data;
      },
      (err)=> {
      }   
    );
  }

  verProductor(){
    if(LoginService.usuarioObtener() && LoginService.usuarioObtener().dni_ruc == this.codigo_productor)
      this.router.navigate(['mi-usuario']);
    else
      this.router.navigate(['ver-usuario/'+ this.codigo_productor]);
  }

  agregarCarrito(): void{
    CarritoService.agregar(this.producto);
  }

  usuarioIngreso(): boolean{
    if(LoginService.usuarioObtener())
      return true
    else
      return false
  }
  
}
