import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {

  private static carrito: any =[];
  
  constructor() {}

  static agregar(producto:any): void{
    producto.cantidad = 1;
    producto.precio_sin_descuento = producto.precio;
    producto.precio_real = producto.precio-producto.descuento*producto.precio/100;
    if(LoginService.usuarioObtener() && LoginService.usuarioObtener().dni_ruc != producto.codigo_productor && !this.existeElementoCarrito(producto))
      this.carrito.push(producto);
  }

  static eliminar(producto:any): void{
    if(LoginService.usuarioObtener() && LoginService.usuarioObtener().dni_ruc != producto.codigo_productor){
      let index=this.carrito.indexOf(producto)
      if(index!=-1){
        this.carrito.splice(index,1);
      }
    }   
  }

  static existeElementoCarrito(producto:any): boolean{
    let existe = false;
    for(let c of this.carrito){
      if(c.nombre == producto.nombre && c.codigo_productor == producto.codigo_productor){
        existe = true;
        break;
      }
    }
    return existe;
  }

  static obtenerProductos(): any{
    return this.carrito;
  }

  static deshacer(): void{
    this.carrito = [] ;
  }
}
