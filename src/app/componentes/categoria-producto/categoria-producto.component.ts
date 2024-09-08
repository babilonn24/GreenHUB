import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filtroBase } from 'src/app/patron-decorator/filtroBase.class';
import { filtroPrecioMenor } from 'src/app/patron-decorator/filtroPrecioMenor.class';
import { Context } from 'src/app/patron-strategy/context.class';
import { ninguna } from 'src/app/patron-strategy/ninguna.class';
import { ordenarNombre } from 'src/app/patron-strategy/ordenarNombre.class';
import { ordenarPrecio } from 'src/app/patron-strategy/ordenarPrecio.class';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { LoginService } from 'src/app/servicios/login.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { DatosService } from 'src/app/servicios/datos.service';

@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css']
})
export class CategoriaProductoComponent {

  categoriaSeleccionada: any;
  categoria: any;
  productos: any = [];
  productosBackUp: any = [];
  orden: string = 'Ninguna';
  precioFiltro: any;

  constructor(private route: ActivatedRoute, private servicioProducto: ProductoService, private router:Router){
    this.categoria = this.route.snapshot.paramMap.get('categoria');
    this.categoriaSeleccionada = DatosService.categorias().find((c:any) => c?.nombre === this.categoria);
    this.servicioProducto.obtenerProductosCategoria(this.categoria).subscribe(
      (data)=> {
        for(let producto of data){
          this.servicioProducto.obtenerProducto(producto.nombre,producto.codigo_productor).subscribe(
            (data)=> {
              this.productos.push(data);
              this.productosBackUp = this.productos; 
            },
            (err)=> {
            }   
          );
        }
      },
      (err)=> {

      }   
    );
  }

  filtrarProductos(): void{
    this.productos = this.productosBackUp
    let lf:any = new filtroBase(this.productos);
    if(this.precioFiltro){
      lf = new filtroPrecioMenor(lf,this.precioFiltro);
    }
    this.productos = lf.filtrado();
  }

  ordenarProductos(): void{
    let ordenar:Context = new Context();
    if(this.orden == 'Nombre'){
      ordenar.setStrategy(new ordenarNombre());
    }
    if(this.orden == 'Precio'){
      ordenar.setStrategy(new ordenarPrecio());
    }
    if(this.orden == 'Ninguna'){
      ordenar.setStrategy(new ninguna());
    }
    this.productos = ordenar.orden(this.productos);
  }

  agregarCarrito(producto:any): void{
    CarritoService.agregar(producto);
  }


  verProducto(nombre:any, codigo_productor:any): void {
    if(LoginService.usuarioObtener() && LoginService.usuarioObtener().dni_ruc == codigo_productor)
      this.router.navigate(['mi-producto/'+codigo_productor+'/'+nombre]);
    else
      this.router.navigate(['ver-producto/'+codigo_productor+'/'+nombre]);
  }

  usuarioIngreso(): boolean{
    if(LoginService.usuarioObtener())
      return true
    else
      return false
  }
}
