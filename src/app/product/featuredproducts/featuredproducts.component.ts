import { Component} from '@angular/core';
import { Category, Product } from '../../interface/Product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-featuredproducts',
  templateUrl: './featuredproducts.component.html',
  styleUrl: './featuredproducts.component.scss'
})
export class FeaturedproductsComponent {
  categories : Category[] = []
  
  ngOnInit(){
    this.productService.getCategories().subscribe(data=>this.categories=data)
  }

  constructor(private productService: ProductService){}

}
