import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.verifySession().pipe(
    switchMap((res: any) => {
      if (res) {
        return of(true);
      }
      return router.navigateByUrl('/login');
    }),
    catchError(() => router.navigateByUrl('/login'))
  );

  
};
