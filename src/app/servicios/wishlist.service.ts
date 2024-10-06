import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private direccion="http://localhost:3000/wishlists"

  constructor(private http: HttpClient) { }

  obtenerWishlit(codigo_usuario:any):Observable<any>{
    return this.http.get<any>(this.direccion+"/mi_wishlist/"+codigo_usuario)
  }

  agregarItem(nuevo_item:any):Observable<any>{
    return this.http.put<any>(this.direccion+"/agregar_item_wishlist", nuevo_item);
  }
}
