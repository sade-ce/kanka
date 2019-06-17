

import { Observable } from 'rxjs';

export interface OrderType {
  id: number;
  name: string;
}

export abstract class OrderTypeData {
  abstract list(): Observable<OrderType[]>;
}
