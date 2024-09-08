import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/servicios/chatbot.service';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})

export class ChatbotComponent {
  ver:boolean= true;
  mensaje:string="";
  mensajes:any=["Hola como puedo ayudarte"];


  constructor(private servicioChatbot:ChatbotService) {
  }

  enviar():void{
    console.log(this.mensaje);
    this.mensajes.push(this.mensaje)
    this.servicioChatbot.chat(this.mensaje).subscribe(
      (data)=>{
        console.log(data.respuesta);
        this.mensajes.push(data.respuesta)
        this.mensaje="";
      },
      (err)=>{
        console.log("Error")
        this.mensaje="";
      }
    );
  }
}
