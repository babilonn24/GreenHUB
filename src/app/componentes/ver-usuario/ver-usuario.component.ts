import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { LoginService } from 'src/app/servicios/login.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css']
})
export class VerUsuarioComponent {

  usuario:any;
  dni_ruc:any;
  productos:any;
  longText:boolean=false; 

  constructor(private servicioProducto: ProductoService, private servicioUsuario: UsuarioService, private route: ActivatedRoute,  private router:Router){
    this.dni_ruc = this.route.snapshot.paramMap.get('dni_ruc');
    this.servicioUsuario.obtenerUsuario(this.dni_ruc).subscribe(
      (data)=> {
        this.usuario=data;
      },
      (err)=> {
      }   
    );
    this.servicioProducto.obtenerListaProductos(this.dni_ruc).subscribe(
      (data)=> {
        this.productos=data;
        this.comprobarTexto();
      },
      (err)=> {
      }   
    );
  }

  /*ngAfterViewInit(){
    this.comprobarTexto();
    setTimeout(() => {
      this.comprobarTexto();
    }, 800);
  }*/

  //Check description's lenght (After resize)
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.comprobarTexto();
  }

  verProducto(nombre:any, codigo_productor:any): void {
    if(LoginService.usuarioObtener() && LoginService.usuarioObtener().dni_ruc == codigo_productor)
      this.router.navigate(['mi-producto/'+codigo_productor+'/'+nombre]);
    else
      this.router.navigate(['ver-producto/'+codigo_productor+'/'+nombre]);
  }

  agregarCarrito(producto:any): void{
    CarritoService.agregar(producto);
  }

  usuarioIngreso(): boolean{
    if(LoginService.usuarioObtener())
      return true
    else
      return false
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
