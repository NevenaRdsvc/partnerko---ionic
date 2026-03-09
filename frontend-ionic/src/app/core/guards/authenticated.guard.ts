import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

export const authenticatedGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  if (accountService.authenticated()) return true;
  return router.createUrlTree(['/login']);
};
