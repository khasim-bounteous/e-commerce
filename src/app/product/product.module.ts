import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { FeaturedproductsComponent } from './featuredproducts/featuredproducts.component';
import { RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';



@NgModule({
  declarations: [
    ProductComponent,
    ProductCardComponent,
    FeaturedproductsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    
  ],
  exports:[
    FeaturedproductsComponent
  ]
})
export class ProductModule { }
