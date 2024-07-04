import { Component } from '@angular/core';
import { Category, Product } from '../interface/Product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { ProductService } from '../service/product.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  items: Product[] = []
  categories: Category[] = []
  categoryId: string = ''
  searchControl = new FormControl("")
  minPrice: number = 20;
  maxPrice: number = 40;
  currPage: number = 1
  offSet: number = 0

  constructor(
    private productService:ProductService,
    private route: ActivatedRoute
  ){}


  ngOnInit(){

    this.productService.getEverthing(this.offSet).subscribe((data)=>{
      this.items=data
    })

    this.productService.getCategories().subscribe((data)=>{
      this.categories = data
    })

    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      switchMap(()=>this.productService.searchProduct(this.searchControl.value??""))
    ).subscribe((data)=>this.items=data)
  }

  applyFilter() {
    this.productService.searchProductByFilter(this.minPrice,this.maxPrice,this.categoryId).subscribe(
      (data)=>this.items = data
    )
  }

  getAllProducts(){
    this.categoryId = ''
    this.productService.getEverthing(this.offSet).subscribe((data)=>{
      this.items=data
    })
  }

  getProductsByCategory(id:number){
    this.categoryId = id.toString()
    this.productService.getProductsByCategory(id).subscribe((data)=>{
      this.items = data
    })
  }  

  getPage(page:number){
    if(page>0 && page<=4)
    {
      this.currPage=page
      this.offSet=(this.currPage-1)*12
      this.getAllProducts()
    }
  }

  pageIncDec(page:number){
    if(this.currPage+page<1 || this.currPage+page>5)
      console.log("last page")
    else
    {
      this.currPage+=page
      this.offSet=(this.currPage-1)*12
      this.getAllProducts()
    }
  }

}
