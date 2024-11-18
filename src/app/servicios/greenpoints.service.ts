import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GreenpointsService {
  private direccion="http://localhost:3000/puntos"

  constructor(private http: HttpClient) { }

  obtenerFraseDelDia():Observable<any>{
    return this.http.get<any>(this.direccion+"/dato")
  }

  obtenerPuntos(codigo_usuario:any):Observable<any>{
    return this.http.get<any>(this.direccion+"/mis_puntos/"+codigo_usuario)
  }

  registrarPuntosPorCompra(nuevo_registro:any):Observable<any>{
    return this.http.post<any>(this.direccion+"/por_compra", nuevo_registro);
  }
}
