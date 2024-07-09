import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable, catchError,throwError } from 'rxjs'
import { UserauthService } from '../service/userauth.service'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService: UserauthService,
        private router: Router
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.authService.getAccessToken();
        let authReq = req

        if(accessToken){
            authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                  }
            });
            return next.handle(authReq).pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401 && !authReq.url.includes('refresh-token')) {
                        console.log(authReq.url.includes("refresh-token"))
                      return this.authService.handle401Error(authReq);
                    }
                    const errorMessage = `Error: ${error.error.message}`; 
                    alert("session expired")
                    this.authService.userLogout()
                    return throwError(() => errorMessage);
                })
            )
        }

        this.router.navigate(["/login"])
        return next.handle(authReq)
    }

}


