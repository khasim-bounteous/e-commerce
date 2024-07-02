import { Inject, Injectable } from '@angular/core';
import { Category, Product } from '../interface/Product';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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
  
  getEverthing(): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiEndPoint}/products`)
  }

  getProductByCategory(productType:string):Observable<Product[]>{
    return this.http.get<Product[]>(`https://fakestoreapi.com/products/category/${productType}`)
  }

  getCategories(): Observable<Category[]>{
    // return this.http.get<Category[]>(`${environment.apiEndPoint}/categories`)
    return this.http.get<Category[]>(`${environment.apiEndPoint}/categories`)
  }

  getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`${environment.apiEndPoint}/products/${id}`)
  }





  // api related 
  // deleteProduce(id:number):Observable<Product>{
  //   return this.http.delete<any>(`https://api.escuelajs.co/api/v1/products/${id}`)
  // }

  // createProduct(product:any):Observable<Product>{
  //   return this.http.post<any>('https://api.escuelajs.co/api/v1/products/',product)
  // }
}
