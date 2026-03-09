import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AccountService } from '../services/account.service';
import { LS_USER_TOKEN } from '../constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);

  const token = localStorage.getItem(LS_USER_TOKEN);
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        accountService.signOut();
      }
      return throwError(() => error);
    }),
  );
};
