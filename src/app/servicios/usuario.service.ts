import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private direccion="https://tad-backend-production.up.railway.app/usuarios"
  //private direccion="http://localhost:3000/usuarios"

  constructor(private http: HttpClient) { }

  obtenerUsuarios():Observable<any>{
    return this.http.get<any>(this.direccion+"/obtener_usuarios");
  }

  obtenerUsuario(usuario:any):Observable<any>{
    return this.http.get<any>(this.direccion+"/obtener_usuario/"+usuario);
  }

  loggearUsuario(correo:any,clave:any):Observable<any>{
    return this.http.get<any>(this.direccion+"/loggear/"+correo+"&"+clave);
  }

  registrarUsuario(usuario:any):Observable<any>{
    return this.http.post<any>(this.direccion+"/agregar_usuario",usuario);
  }

  actualizarUsuario(usuario_nuevo:any, usuario_antiguo: any):Observable<any>{
    return this.http.put<any>(this.direccion+"/actualizar_mi_usuario", {"usuario_nuevo":usuario_nuevo, "usuario_antiguo": usuario_antiguo});
  }
  
  eliminarUsuario(usuario:any):Observable<any>{
    return this.http.delete<any>(this.direccion+"/eliminar_mi_usuario", {body:usuario});
  }

}
