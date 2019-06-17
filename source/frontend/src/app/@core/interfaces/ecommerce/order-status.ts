

import { Observable } from 'rxjs';

export interface OrderStatus {
  id: number;
  name: string;
}

export abstract class OrderStatusData {
  abstract list(): Observable<OrderStatus[]>;
}
