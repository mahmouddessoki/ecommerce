import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToastrService)
  return next(req).pipe(catchError((err)=>{
    if (!req.url.includes('verifyToken')) {
      toaster.error(err.error.message,"FreshCart")
    }
    return throwError(err)
  }));
};
