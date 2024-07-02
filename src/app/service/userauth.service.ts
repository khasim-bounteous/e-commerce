import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject,Injectable } from '@angular/core';
import { Login } from '../interface/userauth';
import { environment } from '../../environments/environment.development';
import { localStorageToken } from '../javascriptapis/localstorage.token';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {

  constructor(
    private http: HttpClient,
    @Inject(localStorageToken) private storage: Storage
  ) { }

  userLogin(loginDetails: Login){
    return this.http.post<any>(`${environment.apiEndPoint}/auth/login`,loginDetails)
  }

  getUserProfile(){
    const access_token = this.storage.getItem('access_token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${access_token}`
    });

    return this.http.get<any>('https://api.escuelajs.co/api/v1/auth/profile', { headers });
  }
}
