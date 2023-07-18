export class ExPlaceOrder {
  GUID: string;

  Price: number;

  constructor(GUID: string, Price: number) {
    this.GUID = GUID;
    this.Price = Price;
  }
}
