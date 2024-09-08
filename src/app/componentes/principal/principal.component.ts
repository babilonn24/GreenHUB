import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filtroBase } from 'src/app/patron-decorator/filtroBase.class';
import { filtroCategoria } from 'src/app/patron-decorator/filtroCategoria.class';
import { filtroPrecioMenor } from 'src/app/patron-decorator/filtroPrecioMenor.class';
import { Context } from 'src/app/patron-strategy/context.class';
import { ninguna } from 'src/app/patron-strategy/ninguna.class';
import { ordenarNombre } from 'src/app/patron-strategy/ordenarNombre.class';
import { ordenarPrecio } from 'src/app/patron-strategy/ordenarPrecio.class';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { DatosService } from 'src/app/servicios/datos.service';
import { LoginService } from 'src/app/servicios/login.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  categoriaFiltro:string = 'Todos';
  orden:string = 'Ninguna';
  precioFiltro:any;
  usuarios:any = [];  
  productos:any = [];  
  productosBackUp: any;
  mensajeErrorVisible:boolean=false;
  mensajeError:any;
  categorias: any = DatosService.categorias();
  dato_servicio:any = DatosService;
  largeScreenList:any;
  smallScreenList:any;

  constructor(private servicioUsuario: UsuarioService, private router:Router, private servicioProducto: ProductoService) { 
    this.servicioUsuario.obtenerUsuarios().subscribe(
      (data)=> {
        for(let usuario of data){
          this.servicioUsuario.obtenerUsuario(usuario.dni_ruc).subscribe(
            (data)=> {
              this.usuarios.push(data);
            },
            (err)=> {
              this.mensajeErrorVisible=true;
              this.mensajeError=err.error.mensaje;
            }   
          );
        }
      },
      (err)=> {
        this.mensajeErrorVisible=true;
        this.mensajeError=err.error.mensaje;
      }   
    );
    this.servicioProducto.obtenerProductos().subscribe(
      (data)=> {
        for(let producto of data){
          this.servicioProducto.obtenerProducto(producto.nombre,producto.codigo_productor).subscribe(
            (data)=> {
              this.productos.push(data);
              this.productosBackUp = this.productos;              
            },
            (err)=> {
              this.mensajeErrorVisible=true;
              this.mensajeError=err.error.mensaje;
            }   
          );
        }
        this.largeScreenList = this.chuckItems(this.categorias, 4);
        this.smallScreenList = this.chuckItems(this.categorias, 2);
      },
      (err)=> {
        this.mensajeErrorVisible=true;
        this.mensajeError=err.error.mensaje;
      }   
    );
  }

  agregarCarrito(producto:any): void{
    CarritoService.agregar(producto);
  }

  verUsuario(dni_ruc:any): void {
    if(LoginService.usuarioObtener() && LoginService.usuarioObtener().dni_ruc == dni_ruc)
      this.router.navigate(['mi-usuario']);
    else
      this.router.navigate(['ver-usuario/'+ dni_ruc]);
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

  //Chunk items depending the screen size
  chuckItems(itemList: any[], split:number){
    let result = [];
    for (let i = 0; i < itemList.length; i += split) {
      result.push(itemList.slice(i, i + split));
    }

    return result;
  }

  filtrarProductos(): void{
    this.productos = this.productosBackUp
    let lf:any = new filtroBase(this.productos);
    if(this.categoriaFiltro != 'Todos'){
      lf = new filtroCategoria(lf,this.categoriaFiltro);
    }
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

  irCategoria(categoria:any): void {
    this.router.navigate(['categoria-producto/'+categoria]);
  }

}
