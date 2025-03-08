import { Component, Input } from '@angular/core';
import { Order, User } from '../../models/order';
import { CurrencyPipe, DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-order-card',
  imports: [DatePipe,CurrencyPipe],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css'
})
export class OrderCardComponent {
  @Input() order:Order= {} as Order
  @Input() orderUser:User= {} as User

}
