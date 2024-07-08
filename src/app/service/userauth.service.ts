import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject,Injectable } from '@angular/core';
import { Login } from '../interface/userauth';
import { environment } from '../../environments/environment.development';
import { localStorageToken } from '../javascriptapis/localstorage.token';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {

  constructor(
    private http: HttpClient,
    @Inject(localStorageToken) private storage: Storage,
    private router: Router
  ) { }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  refreshToken():Observable<any>{
    const refreshToken = this.getRefreshToken();
    if(!refreshToken){
      return of('')
    }

    return this.http.post(`${environment.apiEndPoint}/auth/refresh-token`, {
      refreshToken,
    });
  }

  saveTokens(accessToken:string,refreshToken:string):void{
    this.storage.setItem('access_token', accessToken);
    this.storage.setItem('refresh_token', refreshToken);
  }

  userLogin(loginDetails: Login){
    return this.http.post<any>(`${environment.apiEndPoint}/auth/login`,loginDetails)
  }

  userLogout():void{
    this.storage.removeItem('access_token');
    this.storage.removeItem('regresh_token');
    this.router.navigate(["/login"])    
  }

  getUserProfile(){
    const access_token = this.storage.getItem('access_token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${access_token}`
  });

    return this.http.get<any>('https://api.escuelajs.co/api/v1/auth/profile', { headers });
  }

  handle401Error(originalRequest: HttpRequest<any>):Observable<any>{
    return this.refreshToken().pipe(
      switchMap((tokens:any)=>{
        this.saveTokens(tokens.access_token,tokens.refresh_token);
        const newRequest = originalRequest.clone({
          setHeaders:{
            Authorization: `Bearer ${tokens.access_token}`,
          }
        })
        return this.http.request(newRequest)
      }),
      catchError(err=>{
        console.warn(err)
        this.userLogout();
        return of()
      })
    )
  }
}
