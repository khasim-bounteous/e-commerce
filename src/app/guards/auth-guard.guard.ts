import { inject } from '@angular/core';
import { CanActivateFn,Router,ActivatedRouteSnapshot,RouterStateSnapshot, Route } from '@angular/router';
import { UserauthService } from '../service/userauth.service';
import { map } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  
  const router:Router = inject(Router)
  const protectedRoutes: string[] = ['/products'];
  const authService = inject(UserauthService)
  
  return authService.getUserProfile().pipe(
    map(userObject => {
      if (userObject && userObject.id) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
