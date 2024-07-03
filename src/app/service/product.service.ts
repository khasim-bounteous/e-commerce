import { Inject, Injectable } from '@angular/core';
import { Category, Product } from '../interface/Product';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root' 
})
export class ProductService {

  private readonly baseUrl = 'https://fakestoreapi.com/products';

  constructor(
    private http: HttpClient,
  ) { }

  

  getMensClothing(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/category/men's clothing?limit=4`)
  }

  getWomensClothing(): Observable<Product[]>{
    return this.http.get<Product[]>("https://fakestoreapi.com/products/category/women's clothing?limit=4")
  }
  
  getEverthing(offSet: number): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiEndPoint}/products/?offset=${offSet}&limit=12`)
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiEndPoint}/categories`)
  }

  getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`${environment.apiEndPoint}/products/${id}`)
  }

  getProductsByCategory(id:number): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiEndPoint}/categories/${id}/products`)
  }

  searchProduct(search:string):Observable<Product[]>{
    console.log(search)
    return this.http.get<Product[]>(`${environment.apiEndPoint}/products/?title=${search}`)
  }

  searchProductByFilter(price_min:number,price_max:number,category:string):Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiEndPoint}/products/?price_min=${price_min}&price_max=${price_max}&categoryId=${category}`)
  }

  // api related 
  // deleteProduce(id:number):Observable<Product>{
  //   return this.http.delete<any>(`https://api.escuelajs.co/api/v1/products/${id}`)
  // }

  // createProduct(product:any):Observable<Product>{
  //   return this.http.post<any>('https://api.escuelajs.co/api/v1/products/',product)
  // }
}
