import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.getAuthToken();

  // Si el usuario está autenticado
  if (isAuthenticated) {
    // Si el usuario intenta acceder a 'login', 'register' o 'recover-pw', redirige a 'tabs'
    if (state.url === '/login' || state.url === '/register' || state.url === '/recover-pw') {
      router.navigate(['/tabs']);
      return false;
    }
  } else {
    // Si el usuario no está autenticado
    // Si intenta acceder a 'tabs', 'tabs-old' o 'tutorial', redirige a 'login'
    if (state.url === '/tabs' || state.url === '/tabs-old' || state.url === '/tutorial') {
      router.navigate(['/login']);
      return false;
    }
  }

  // Si cumple con las condiciones, permite el acceso a la ruta solicitada
  return true;
};
