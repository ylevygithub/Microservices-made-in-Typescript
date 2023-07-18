export class ExPrice {
  Pair: string;

  High: number;

  Low: number;

  Volume: number;

  Last: number;

  BaseVolume: number;

  Bid: number;

  Ask: number;

  constructor(
    Pair: string,
    High: number,
    Low: number,
    Volume: number,
    Last: number,
    BaseVolume: number,
    Bid: number,
    Ask: number
  ) {
    this.Pair = Pair;
    this.High = High;
    this.Low = Low;
    this.Volume = Volume;
    this.Last = Last;
    this.BaseVolume = BaseVolume;
    this.Bid = Bid;
    this.Ask = Ask;
  }
}
