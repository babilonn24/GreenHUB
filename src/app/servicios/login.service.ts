import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private static singlenton: LoginService | null = null ;
  
  private constructor() {
  }

  static registrar(usuario:any): void{
    if(!LoginService.singlenton)
      LoginService.singlenton = usuario;
  }

  static salir(): void{
    if(LoginService.singlenton)
      LoginService.singlenton = null ;
  }

  static usuarioObtener(): any{
    return LoginService.singlenton;
  }

}
