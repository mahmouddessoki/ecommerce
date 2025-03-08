import { Component, inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../Authentication/services/auth.service';
import { Subscription } from 'rxjs';
import { redirectToLogin } from '../../../../shared/helpers/redirect';
import { Order } from '../../models/order';
import { OrderCardComponent } from "../order-card/order-card.component";
import { EmptyOrdersComponent } from "../empty-orders/empty-orders.component";

@Component({
  selector: 'app-order-list',
  imports: [OrderCardComponent, EmptyOrdersComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {

  private readonly orderService = inject(OrderService)
  private readonly auth = inject(AuthService)
  sub = new Subscription()
  userId!: string;
  orders: Order[] = [];
  ngOnInit() {
    this.sub = redirectToLogin(this.auth, 'allorders')

    this.getUserId()
    // this.getUserOrders()
  }
  getUserId() {
    const userData = this.auth.getUserData()
    this.userId = userData.id
    this.getUserOrders(this.userId)
    console.log(this.userId);
  }

  getUserOrders(id: string) {
    this.sub = this.orderService.getUserOrders(id).subscribe({
      next: (res) => {
        this.orders = res
        console.log(res);
      }
    })
  }

}
