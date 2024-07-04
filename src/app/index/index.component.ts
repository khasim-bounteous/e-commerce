import { Component } from '@angular/core';
import { UserauthService } from '../service/userauth.service';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  isUserAuth = false
  constructor(
    private userAuth: UserauthService,
    private productService: ProductService,
    private route: Router
  ){}

  ngOnInit(){
    this.userAuth.getUserProfile().subscribe({
      next: (data)=>{
        console.log(data)
        this.isUserAuth = true
      },
      error: (err)=>{
        this.route.navigate(["/login"])
      }
    })
  }
}
