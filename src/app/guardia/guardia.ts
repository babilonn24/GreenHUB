import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';

export const authGuard: CanActivateFn = (route, state) => {

    const authService = LoginService;
    const router = inject(Router);
  
    if (authService.usuarioObtener()) {
      return true;
    }
    else{
        router.navigate(['']);
        return false;
    }
  };