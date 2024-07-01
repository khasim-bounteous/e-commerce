import { Component } from '@angular/core';
import { Product } from '../interface/Product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  items: Product[] = []
  categories: string[] = []
  category: string = "all"

  constructor(
    private productService:ProductService,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.route.paramMap.pipe(
      switchMap(params => {
        this.category = params.get('category') ?? "all";
        console.log(this.category)
        return this.category === 'all'
          ? this.productService.getEverthing()
          : this.productService.getSpecificProduct(this.category);
      })
    ).subscribe(items => this.items = items);

    this.productService.getCategories().subscribe((data)=>{
      this.categories = data
    })
  }

  getAllProducts(){
    this.productService.getEverthing().subscribe((data)=>this.items=data)
  }

  getSpecificProduct(productType: string){    
    this.productService.getSpecificProduct(productType).subscribe((data)=>this.items=data)
  }

}
