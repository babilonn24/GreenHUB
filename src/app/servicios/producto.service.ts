import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private direccion="https://tad-backend-production.up.railway.app/productos"
  //private direccion="http://localhost:3000/productos"

  constructor(private http: HttpClient) { }

  obtenerProductos():Observable<any>{
    return this.http.get<any>(this.direccion+"/obtener_productos");
  }

  obtenerProductosCategoria(categoria:any):Observable<any>{
    return this.http.get<any>(this.direccion+"/obtener_productos_categoria/"+categoria);
  }

  obtenerListaProductos(codigo_productor:any):Observable<any>{
    return this.http.get<any>(this.direccion+"/obtener_mis_productos/"+codigo_productor);
  }

  obtenerProducto(nombre:any, codigo_productor:any):Observable<any>{
    return this.http.get<any>(this.direccion+"/obtener_producto/"+nombre+'&'+codigo_productor);
  }

  registrarProducto(producto:any):Observable<any>{
    return this.http.post<any>(this.direccion+"/agregar_producto",producto);
  }

  modificarProducto(producto_antiguo:any, producto_nuevo:any):Observable<any>{
    return this.http.put<any>(this.direccion+"/actualizar_mi_producto",{"producto_antiguo":producto_antiguo,"producto_nuevo":producto_nuevo});
  }

  eliminarProducto(producto:any):Observable<any>{
    return this.http.delete<any>(this.direccion+"/eliminar_mi_producto",{body:producto});
  }

}
