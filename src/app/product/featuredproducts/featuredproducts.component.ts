import { Component} from '@angular/core';
import { Product } from '../../interface/Product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-featuredproducts',
  templateUrl: './featuredproducts.component.html',
  styleUrl: './featuredproducts.component.scss'
})
export class FeaturedproductsComponent {
  mensProducts : Product[] = []
  womenProducts: Product[] = []

  ngOnInit(){
    this.productService.getMensClothing().subscribe((data)=>{
      this.mensProducts = data
    });

    this.productService.getWomensClothing().subscribe((data)=>{
      this.womenProducts = data
    })
  }

  constructor(private productService: ProductService){}

}
