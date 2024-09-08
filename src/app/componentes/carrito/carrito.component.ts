import { Component } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { LoginService } from 'src/app/servicios/login.service';
import { VentaService } from 'src/app/servicios/venta.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  total:any = 0;
  carrito = CarritoService;
  productos:any = CarritoService.obtenerProductos();
  usuario:any= LoginService.usuarioObtener();

  constructor(private servicioVenta: VentaService) {
    for(let p of CarritoService.obtenerProductos()){
      p.precio = p.cantidad * p.precio_real;
    }
    this.calcularTotal();
  }

  comprar():void {
    let carrito = [];
    for(let p of CarritoService.obtenerProductos()){
      carrito.push({"nombre_producto":p.nombre,"codigo_productor": p.codigo_productor,
      "codigo_comprador": this.usuario.dni_ruc,
      "precio": p.precio, "cantidad": p.cantidad});
    }
    this.servicioVenta.registrarVenta({"carrito":carrito}).subscribe(
      (data)=>{
        CarritoService.deshacer();
        this.productos=CarritoService.obtenerProductos();
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  operacion(nombre:any,codigo_productor:any,op:any): void{
    for(let p of CarritoService.obtenerProductos()){
      if(p.nombre == nombre && p.codigo_productor == codigo_productor){
        if(op == 'aumentar')
          p.cantidad = p.cantidad + 1;
        else
          p.cantidad = p.cantidad - 1;
        p.precio = p.cantidad * p.precio_real;
        break;
      }
    }
    this.calcularTotal()
  }

  eliminar(producto:any): void{
    CarritoService.eliminar(producto);
    this.calcularTotal()
  }

  //Calculate the total amount to pay
  calcularTotal(): void{
    this.total = 0;
    for(let p of CarritoService.obtenerProductos()){
      this.total = this.total + p.precio;
    }
  }

  irArriba() {
    const element = document.getElementById('cart-top');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
