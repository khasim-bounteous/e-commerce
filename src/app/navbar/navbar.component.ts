import { Component } from '@angular/core';
import { UserauthService } from '../service/userauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(
    private userauth: UserauthService,
    private route: Router
  ){}

  onLogout(){
    this.userauth.userLogout()
    this.route.navigate(["/login"])
  }

}
