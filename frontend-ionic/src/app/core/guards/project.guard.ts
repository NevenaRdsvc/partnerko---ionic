import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

export const projectGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  if (accountService.isInRole('admin')) return true;
  if (accountService.isInRole('kompanija')) return true;

  const requestedId = +route.params['id'];
  const userIteracijaId = accountService.getIteracijaId();

  if (!userIteracijaId || requestedId !== userIteracijaId) {
    if (userIteracijaId) {
      return router.createUrlTree(['/projekat', userIteracijaId, 'robni-partneri'], {
        queryParams: { tipPartnera: 'robni' },
      });
    }
    return router.createUrlTree(['/projekti']);
  }

  return true;
};
