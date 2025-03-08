import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../../environments/environments';
import { AuthService } from '../../Authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly authService = inject(AuthService)

  constructor(private http: HttpClient) { }


  createCheckout(cartId: string, shippingAddress: {
    details: string,
    phone: string,
    city: string,
  }): Observable<any> {
    const url = encodeURIComponent('http://localhost:4200/#')
    return this.http.post(`${env.BASE_URL}orders/checkout-session/${cartId}?url=${url}`,
      {
        shippingAddress
      })

  }

  getUserOrders(userId:string):Observable<any>{
    return this.http.get(`${env.BASE_URL}orders/user/${userId}`)

  }
}
