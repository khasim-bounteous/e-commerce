import { Component, OnInit } from '@angular/core';
import { Product } from '../../interface/Product';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  item?: Product;
  currentSlide = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        return this.productService.getProductById(id ? parseInt(id) : 0);
      })
    ).subscribe((data) => this.item = data);
  }

  prevSlide() {
    if (this.item) {
      this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.item.images.length - 1;
      this.updateCarousel();
    }
  }

  nextSlide() {
    if (this.item) {
      this.currentSlide = (this.currentSlide < this.item.images.length - 1) ? this.currentSlide + 1 : 0;
      this.updateCarousel();
    }
  }

  updateCarousel() {
    const carouselInner = document.querySelector('.carousel-inner') as HTMLElement;
    if (carouselInner) {
      carouselInner.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }
  }
}
