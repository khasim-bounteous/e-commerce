import { Component,Input } from '@angular/core';
import { Product } from '../../interface/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() item!: Product

  constructor(private route: Router){

  }

  viewDetails(id: number){
    this.route.navigate(['product/'+id])
  }
}
