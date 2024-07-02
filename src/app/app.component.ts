import { Component } from '@angular/core';
import { UserauthService } from './service/userauth.service';
import { Router } from '@angular/router';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'E-Commerce';

  constructor(
    private userAuth: UserauthService,
    private productService: ProductService,
    private route: Router
  ){}

  ngOnInit(){
    this.userAuth.getUserProfile().subscribe({
      next: (data)=>{
        console.log(data)
      },
      error: (err)=>{
        this.route.navigate(["/login"])
      }
    })
  }
  // onDelete(){
  //   for(let product in this.productService.product)
  //   {
  //     this.productService.createProduct(product).subscribe(data=>console.log(data))
  //   }
  // }
}
