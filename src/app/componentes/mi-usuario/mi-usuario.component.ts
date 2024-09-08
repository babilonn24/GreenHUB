import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { RutasService } from 'src/app/servicios/rutas.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { VentaService } from 'src/app/servicios/venta.service';

@Component({
  selector: 'app-mi-usuario',
  templateUrl: './mi-usuario.component.html',
  styleUrls: ['./mi-usuario.component.css']
})
export class MiUsuarioComponent {

  usuario:any=LoginService.usuarioObtener();
  misCompras:any;
  misVentas:any;
  rutas_servicio:any;
  productos:any;
  longText:boolean=false; 

  constructor(private servicioRutas: RutasService, private servicioUsuario: UsuarioService, private servicioVenta: VentaService, private router:Router, private servicioProducto: ProductoService) { 
    this.rutas_servicio=this.servicioRutas;
    this.servicioVenta.obtenerMisCompras(this.usuario?.dni_ruc).subscribe(
      (data)=> {
        this.misCompras=data;
      },(err)=> {
      }   
    );
    this.servicioVenta.obtenerMisVentas(this.usuario?.dni_ruc).subscribe(
      (data)=> {
        this.misVentas=data;
      },(err)=> {
      }   
    )
    this.servicioProducto.obtenerListaProductos(this.usuario?.dni_ruc).subscribe(
      (data)=> {
        this.productos=data;
      },
      (err)=> {
      }   
    );
  }

  ngAfterViewInit(){
    this.comprobarTexto();
    setTimeout(() => {
      this.comprobarTexto();
    }, 800);
  }

  //Check description's lenght (After resize)
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.comprobarTexto();
  }

  modificarUsuario(): void{
    this.router.navigate(['modificar-usuario']);
  }

  eliminarUsuario(): void{
    this.servicioUsuario.eliminarUsuario(this.usuario).subscribe(
      (data)=> {
        LoginService.salir();
        this.router.navigate(['']);
      },(err)=> {
      }   
    )
  }

  registrarProducto(): void{
    this.router.navigate(['agregar-producto']);
  }

  verProducto(nombre:any, codigo_productor:any): void {
    if(LoginService.usuarioObtener() && LoginService.usuarioObtener().dni_ruc == codigo_productor)
      this.router.navigate(['mi-producto/'+codigo_productor+'/'+nombre]);
    else
      this.router.navigate(['ver-producto/'+codigo_productor+'/'+nombre]);
  }

  //Check description's lenght
  comprobarTexto(): void{
    const element = document.getElementById('profileDescription');
    if(element){
      const lineHeight = parseInt(window.getComputedStyle(element).lineHeight, 10);
      const lines = Math.ceil(element.scrollHeight / lineHeight);
      this.longText = lines > 3;
    }
  }
}
