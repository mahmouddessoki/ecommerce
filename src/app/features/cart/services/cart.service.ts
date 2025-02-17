import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../Authentication/services/auth.service';
import { env } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  addProduct(productId: string) {
    this.http.post(env.BASE_URL + 'cart', {
      productId
    }, {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }

  updateProductQuantity(productId: string, count: number) {
    this.http.put(env.BASE_URL + `cart/${productId}`, {
      count
    }, {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }

  getUserCart() {
    this.http.get(env.BASE_URL + 'cart', {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }
  clearCart() {
    this.http.delete(env.BASE_URL + 'cart', {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }
}
