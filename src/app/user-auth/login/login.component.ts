import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserauthService } from '../../service/userauth.service';
import { Login } from '../../interface/userauth';
import {localStorageToken } from '../../javascriptapis/localstorage.token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginDetails = new FormGroup({
    email: new FormControl("",Validators.required),
    password: new FormControl("",Validators.required)
  })

  constructor(
      private userAuth: UserauthService,
      @Inject(localStorageToken) private localStorageToken: Storage,
      private route: Router
    ){}

  onSubmit(){
    const userDetails: Login = {
      email: this.loginDetails.value.email?.toString() ?? "",
      password: this.loginDetails.value.password?.toString() ?? ""
    }

    this.userAuth.userLogin(userDetails).subscribe(data=>{
      localStorage.setItem("access_token",data.access_token)
      localStorage.setItem("refresh_token",data.refresh_token)
      this.route.navigate([""])
    })
  }
}
