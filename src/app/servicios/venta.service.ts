import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private direccion="https://tad-backend-production.up.railway.app/ventas"
  //private direccion="http://localhost:3000/ventas"

  constructor(private http: HttpClient) { 
  }

  registrarVenta(carrito:any):Observable<any>{
    return this.http.post<any>(this.direccion+"/registrar_ventas", carrito);
  }

  obtenerMisCompras(codigo_comprador:any):Observable<any>{
    return this.http.get<any>(this.direccion+"/mis_compras/" + codigo_comprador);
  }

  obtenerMisVentas(codigo_productor:any):Observable<any>{
    return this.http.get<any>(this.direccion+"/mis_ventas/" + codigo_productor);
  }

}
