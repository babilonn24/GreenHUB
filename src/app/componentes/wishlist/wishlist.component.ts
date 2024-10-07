import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { WishlistService } from 'src/app/servicios/wishlist.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})

export class WishlistComponent {
  usuario:any=LoginService.usuarioObtener();
  misDeseos:any;
  productos:any = [];

  constructor(private router:Router, private servicioWishlist: WishlistService, private servicioProducto: ProductoService){
    this.servicioWishlist.obtenerWishlit(this.usuario.dni_ruc).subscribe(
      (data)=> {
        this.misDeseos=data.items;
        for(let p of this.misDeseos) {
          console.log(this.misDeseos);
          this.servicioProducto.obtenerProducto(p.nombre_producto, p.codigo_productor).subscribe(
            (data)=> {
              this.productos.push(data);
            },
            (err)=> {
            }   
          );
          
        }
        console.log(this.productos)
      },(err)=> {
      }   
    );
  }

  verProducto(nombre:any, codigo_productor:any): void {
    if(LoginService.usuarioObtener() && LoginService.usuarioObtener().dni_ruc == codigo_productor)
      this.router.navigate(['mi-producto/'+codigo_productor+'/'+nombre]);
    else
      this.router.navigate(['ver-producto/'+codigo_productor+'/'+nombre]);
  }

  agregarCarrito(item:any): void{
    CarritoService.agregar(item);
  }

  eliminarItem(item:any): void{
    let index = this.productos.indexOf(item)
    if(index != -1){
      this.productos.splice(index, 1);
    }

    this.servicioWishlist.eliminarItem(
      {
        "codigo_usuario": LoginService.usuarioObtener().dni_ruc,
        "items":[
          {
            "nombre_producto": item.nombre,
            "codigo_productor": item.codigo_productor,
          }
        ]
      }
    ).subscribe(
      (data)=> {
        //this.router.navigate(['']);
        console.log('success');
      },(err)=> {
        console.log(err)
      }   
    );
  }
}
