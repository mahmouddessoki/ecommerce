import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { }

  getRecommendedProducts():Observable<any>{
    return this.httpClient.get(env.BASE_URL +`products?limit=8&sort=-ratingsAverage`)
  }

  getAllProducts():Observable<any>{
    return this.httpClient.get(env.BASE_URL +`products`)
  }

  getProductDetails(id:string):Observable<any>{
    return this.httpClient.get(env.BASE_URL +`products/${id}`)
  }
}
