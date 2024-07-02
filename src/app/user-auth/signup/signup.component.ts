import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserauthService } from '../../service/userauth.service';
import { Login } from '../../interface/userauth';
import {localStorageToken } from '../../javascriptapis/localstorage.token';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  loginDetails = new FormGroup({
    email: new FormControl("",Validators.required),
    password: new FormControl("",Validators.required)
  })

  constructor(
      private userAuth: UserauthService,
      @Inject(localStorageToken) private localStorageToken: Storage     
    ){}

  onSubmit(){
    const userDetails: Login = {
      email: this.loginDetails.value.email?.toString() ?? "",
      password: this.loginDetails.value.password?.toString() ?? ""
    }
    
  }
}
