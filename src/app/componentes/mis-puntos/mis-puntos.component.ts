import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from 'src/app/servicios/login.service';
import { GreenpointsService } from 'src/app/servicios/greenpoints.service';

@Component({
  selector: 'app-mis-puntos',
  templateUrl: './mis-puntos.component.html',
  styleUrls: ['./mis-puntos.component.css']
})
export class MisPuntosComponent {
  usuario:any=LoginService.usuarioObtener();
  misPuntos:any=null;
  fraseDia:any=null;
  iframeSrc:any=null;
  porcentaje:any;

  constructor(private router:Router, private servicioGreenPoints: GreenpointsService, private sanitizer: DomSanitizer) {
    this.servicioGreenPoints.obtenerFraseDelDia().subscribe(
      (data)=> {
        this.fraseDia=data;
        console.log(this.fraseDia);
      },(err)=> {
      }   
    );

    this.servicioGreenPoints.obtenerPuntos(this.usuario?.dni_ruc).subscribe(
      (data)=> {
        this.misPuntos=data;
        this.calcularPorcentaje();
        console.log(this.misPuntos);
      },(err)=> {
      }   
    );
  }

  calcularPorcentaje(): void{
    const expMin = this.misPuntos.exp_parcial;
    const expMax = this.misPuntos.exp_necesaria;
    const expActual = this.misPuntos.exp;

    this.porcentaje = parseFloat((((expActual - expMin)/(expMax  - expMin))*100).toFixed(2))
  }

  cargarPagina(link:any) :void{
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  cerrarPagina() :void{
    this.iframeSrc = null;
  }
}
