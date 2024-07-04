import { Inject, Injectable } from '@angular/core';
import { Category, Product } from '../interface/Product';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, map, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { JsonPipe } from '@angular/common';
import {dummyProduct,dummyCategories} from '../mockdata/dummyData'

@Injectable({
  providedIn: 'root' 
})
export class ProductService {

  private readonly baseUrl = 'https://fakestoreapi.com/products';

  constructor(
    private http: HttpClient,
  ) { }

   
  // services which will emmit from dummy data
  getEverthing(offSet: number): Observable<Product[]>{
    const curr = offSet*12
    return of(dummyProduct.slice(curr,curr+12))
  }

  getCategories(): Observable<Category[]>{
    return of(dummyCategories)
  }

  getProductById(id:number):Observable<Product>{
    const product = dummyProduct.find((product)=>product.id===id)
    return of(product ?? dummyProduct[0])
  }

  getProductsByCategory(id:number): Observable<Product[]>{
    const product:Product[] = dummyProduct.filter((product)=>product.category.id==id)
    return of(product)
  }

  searchProduct(search:string):Observable<Product[]>{
    const product:Product[] = dummyProduct.filter((product)=>product.title.toLowerCase().includes(search.toLowerCase()))
    return of(product)
  }

  searchProductByFilter(price_min:number,price_max:number,category:string):Observable<Product[]>{
    const categoryName = category!=='' ? dummyCategories[parseInt(category)-1].name : ''
    let product:Product[] = dummyProduct.filter((product)=>{
      if(product.price>=price_min && product.price<=price_max )
        return true;
      return false
    })

    if(category==='')
      return of(product)
    else
    {
      product = product.filter((product)=>product.category.name===categoryName || category==='')
      return of(product)
    }
  }

// services which will emmit from api data

  // getEverthing(offSet: number): Observable<Product[]>{
  //   return this.http.get<Product[]>(`${environment.apiEndPoint}/products/?offset=${offSet}&limit=12`)
  // }

  // getCategories(): Observable<Category[]>{
  //   return this.http.get<Category[]>(`${environment.apiEndPoint}/categories`)
  // }

  // getProductById(id:number):Observable<Product>{
  //   return this.http.get<Product>(`${environment.apiEndPoint}/products/${id}`)
  // }

  // getProductsByCategory(id:number): Observable<Product[]>{
  //   return this.http.get<Product[]>(`${environment.apiEndPoint}/categories/${id}/products`)
  // }

  // searchProduct(search:string):Observable<Product[]>{
  //   console.log(search)
  //   return this.http.get<Product[]>(`${environment.apiEndPoint}/products/?title=${search}`)
  // }

  // searchProductByFilter(price_min:number,price_max:number,category:string):Observable<Product[]>{
  //   return this.http.get<Product[]>(`${environment.apiEndPoint}/products/?price_min=${price_min}&price_max=${price_max}&categoryId=${category}`)
  // }





  // ****************************************** to modify the public api
  // api related 
  // deleteProduce(id:number):Observable<Product>{
  //   return this.http.delete<any>(`https://api.escuelajs.co/api/v1/products/${id}`)
  // }

  // createProduct(product:any):Observable<Product>{
  //   return this.http.post<any>('https://api.escuelajs.co/api/v1/products/',product)
  // }
}
