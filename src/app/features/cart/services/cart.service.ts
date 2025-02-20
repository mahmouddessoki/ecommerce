import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../Authentication/services/auth.service';
import { env } from '../../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  addProduct(productId: string):Observable<any> {
    return this.http.post(env.BASE_URL + 'cart', {
      productId
    }, {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }

  updateProductQuantity(productId: string, count: number):Observable<any> {
    return this.http.put(env.BASE_URL + `cart/${productId}`, {
      count
    }, {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }

  getUserCart():Observable<any>  {
   return this.http.get(env.BASE_URL + 'cart', {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }
  removeCartItem(id:string):Observable<any>  {
   return this.http.delete(env.BASE_URL + `cart/${id}`, {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }
  clearCart():Observable<any>  {
    return this.http.delete(env.BASE_URL + 'cart', {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }
}
