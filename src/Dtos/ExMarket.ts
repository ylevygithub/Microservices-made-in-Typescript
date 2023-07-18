export class ExMarket {

  Pair: string
  PrecisionAmount: number
  PrecisionPrice: number
  LimitLeverageMin: number
  LimitLeverageMax: number
  LimitAmountMin: number
  LimitAmountMax: number
  LimitPriceMin: number
  LimitPriceMax: number
  LimitCostMin: number
  LimitCostMax: number
  Taker: number
  Maker: number

  constructor(
    Pair: string,
    PrecisionAmount: number,
    PrecisionPrice: number,
    LimitLeverageMin: number,
    LimitLeverageMax: number,
    LimitAmountMin: number,
    LimitAmountMax: number,
    LimitPriceMin: number,
    LimitPriceMax: number,
    LimitCostMin: number,
    LimitCostMax: number,
    Taker: number,
    Maker: number
  ) {
    this.Pair = Pair;
    this.PrecisionAmount = PrecisionAmount;
    this.PrecisionPrice = PrecisionPrice;
    this.LimitLeverageMin = LimitLeverageMin;
    this.LimitLeverageMax = LimitLeverageMax;
    this.LimitAmountMin =LimitAmountMin;
    this.LimitAmountMax = LimitAmountMax;
    this.LimitPriceMin = LimitPriceMin;
    this.LimitPriceMax = LimitPriceMax;
    this.LimitCostMin = LimitCostMin;
    this.LimitCostMax = LimitCostMax;
    this.Taker = Taker;
    this.Maker = Maker;
  }
}
