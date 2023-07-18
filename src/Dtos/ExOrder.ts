import { EOrderType, OrderSide, OrderStatus } from '../Exchanges/Enum';

export class ExOrder {
  Pair: string;

  OrderId: string;

  Price: number;

  Quantity: number;

  QuantityRemaining: number;

  Status: OrderStatus;

  Side: OrderSide;

  OrderType: EOrderType;

  constructor(
    Pair: string,
    OrderId: string,
    Price: number,
    Quantity: number,
    QuantityRemaining: number,
    Status: number,
    Side: OrderSide,
    OrderType: EOrderType
  ) {
    this.Pair = Pair;
    this.OrderId = OrderId;
    this.Price = Price;
    this.Quantity = Quantity;
    this.QuantityRemaining = QuantityRemaining;
    this.Status = Status;
    this.Side = Side;
    this.OrderType = OrderType;
  }
}
