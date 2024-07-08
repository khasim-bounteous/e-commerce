import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable, catchError,throwError } from 'rxjs'
import { UserauthService } from '../service/userauth.service'
import { Injectable } from '@angular/core'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService: UserauthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.authService.getAccessToken();

        let authReq = req;
        if(accessToken){
            authReq = req.clone();
            authReq.headers.append('Authorization',`Bearer ${accessToken}`)
        }
        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                  return this.authService.handle401Error(authReq);
                }
                const errorMessage = `Error: ${error.error.message}`; // Example of creating a custom error message
                return throwError(errorMessage);
              })
        )
    }

}