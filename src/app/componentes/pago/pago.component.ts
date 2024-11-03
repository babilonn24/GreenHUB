import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { VentaService } from 'src/app/servicios/venta.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  public payPalConfig?: IPayPalConfig;
  total:any = 0;
  carrito = CarritoService;
  productos:any = CarritoService.obtenerProductos();
  usuario:any= LoginService.usuarioObtener();

  constructor(private servicioVenta: VentaService, private router: Router) {
    for(let p of CarritoService.obtenerProductos()){
      p.precio = p.cantidad * p.precio_real;
    }
    console.log("cart");
    console.log(this.productos);
    

    this.calcularTotal();
  }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
        clientId: 'Aa_bPUx2R8JioSINWk0JCD1YAoVd-8sJScbDR8yGTrZW_-vpiIdN2umqsvvW7E_0WIO5u1WF_eXPQgPu',
        createOrderOnServer: (data: any) => fetch('http://localhost:3000/pagos/crear_orden', {
          method: 'post',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.crearItemsParaPaypal())
        })
          .then((res) => res.json())
          .then((order) => order.id),
        authorizeOnServer: (approveData: any) => {
          return fetch('http://localhost:3000/pagos/capturar_orden', {
            method: 'post',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              payerID: approveData.payerID,
              orderID: approveData.orderID
            })
          }).then((res) => {
            return res.json();
          }).then((details) => {
            console.log("Detalles");
            console.log(details);
            this.registrarCompra(details);
          });
        },
        onApprove: (data:any, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);

          actions.order.get().then((details:any) => {
            this.inicio();
          });
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        },
    };
  }

  inicio():void {
    this.router.navigate(['']);
  }

  calcularTotal(): void{
    this.total = 0;
    for(let p of CarritoService.obtenerProductos()){
      this.total = this.total + p.precio;
    }
  }

  registrarCompra(paypalDetails:any):void {
    let productos = [];
    for(let p of CarritoService.obtenerProductos()){
      productos.push(
      {  
        "codigo_productor": p.codigo_productor,
        "nombre_producto": p.nombre,
        "cantidad": p.cantidad,
        "precio_unitario": p.precio_real,
        "subtotal": p.precio
      });
    }

    const orden_compra = {
      "codigo_comprador": this.usuario.dni_ruc,
      "orden_paypal_ID": paypalDetails.id,
      "estado": paypalDetails.status,
      "productos": productos,
      "total": this.total
    }

    this.servicioVenta.registrarVenta({"orden_compra": orden_compra}).subscribe(
      (data)=>{
        CarritoService.deshacer();
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  crearItemsParaPaypal(): any {
    const items = [];

    for (let p of CarritoService.obtenerProductos()) {
      const item = {
        name: p.nombre,
        unit_amount: {
          currency_code: "USD",
          value: p.precio_real.toFixed(2),
        },       
        quantity: p.cantidad.toString()  
      };
      items.push(item);
    }

    const carritoPaypal = {
      items: items,
      total: this.total.toFixed(2)
    }
    console.log("carritoPaypal");
    console.log(carritoPaypal);
    return carritoPaypal;
  }
}
