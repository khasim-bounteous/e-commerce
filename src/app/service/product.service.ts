import { Injectable } from '@angular/core';
import { Product } from '../interface/Product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ProductService {

  private readonly baseUrl = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) { }


  getMensClothing(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/category/men's clothing?limit=4`)
  }

  getWomensClothing(): Observable<Product[]>{
    return this.http.get<Product[]>("https://fakestoreapi.com/products/category/women's clothing?limit=4")
  }
  
  getEverthing(): Observable<Product[]>{
    return this.http.get<Product[]>('https://fakestoreapi.com/products')
  }

  getSpecificProduct(productType:string):Observable<Product[]>{
    return this.http.get<Product[]>(`https://fakestoreapi.com/products/category/${productType}`)
  }

  getCategories(): Observable<string[]>{
    return this.http.get<string[]>('https://fakestoreapi.com/products/categories')
  }
}
