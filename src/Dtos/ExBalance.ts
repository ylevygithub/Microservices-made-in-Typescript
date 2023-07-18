export class ExBalance {
  Currency: string;

  Free: number;

  Locked: number;

  Borrowed: number;

  Interest: number;

  Total: number;

  constructor(
    Currency: string,
    Free: number,
    Locked: number,
    Total: number,
    Borrowed: number = 0,
    Interest: number = 0
  ) {
    this.Currency = Currency;
    this.Free = Free;
    this.Locked = Locked;
    this.Total = Total;
    this.Borrowed = Borrowed;
    this.Interest = Interest;
  }
}
