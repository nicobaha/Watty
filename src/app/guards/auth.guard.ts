import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.getAuthToken();

  // Redirige a 'tabs' si el usuario ya está autenticado e intenta acceder a 'login', 'register' o 'recover-pw'
  if (isAuthenticated && (state.url === '/login' || state.url === '/register' || state.url === '/recover-pw')) {
    router.navigate(['/tabs']);
    return false; // Bloquea el acceso a la página de autenticación
  }

  // Redirige a 'login' si el usuario no está autenticado e intenta acceder a 'tabs' o 'tabs-old'
  if (!isAuthenticated && (state.url === '/tabs' || state.url === '/tabs-old')) {
    router.navigate(['/login']);
    return false; // Bloquea el acceso a las páginas protegidas
  }

  // Permite el acceso a la ruta solicitada
  return true;
};
