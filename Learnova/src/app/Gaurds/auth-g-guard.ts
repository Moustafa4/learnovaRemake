import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Authserv } from '../../services/authserv';

export const authGGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router = inject(Router)
  const auth= inject(Authserv)
  if (auth.authgard()) {
    return true
  }
  else {
    return router.createUrlTree(['/sign-in']);
  }
  
};
