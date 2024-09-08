import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private direccion="http://brianmotta.pythonanywhere.com"

  constructor(private http: HttpClient) { }

  chat(mensaje:any):Observable<any>{
    return this.http.post<any>(this.direccion+"/chat", {"mensaje":mensaje});
  }
}
