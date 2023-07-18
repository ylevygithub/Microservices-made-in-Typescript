export enum EOrderType {
  Limit,
  Market,
  StopLoss,
  StopLossLimit,
  Stop,
  StopMarket,
  TakeProfit,
  TakeProfitMarket,
  TakeProfitLimit,
  LimitMaker,
  TrailingStopMarket,
  Liquidation
}

export enum OrderStatus {
  Open,
  PartiallyFilled,
  Filled,
  Canceled,
  PendingCancel,
  Rejected,
  Expired,
  Insurance,
  Adl
}

export enum OrderSide {
  Buy,
  Sell
}

export enum ETimeInForce {
  GoodTillCancel,
  ImmediateOrCancel,
  FillOrKill,
  GoodTillCrossing,
  GoodTillExpiredOrCanceled
}

export const getStatus = (status: string) => {
  switch (status) {
    case 'open':
      return OrderStatus.Open;
    case 'partially filled':
      return OrderStatus.PartiallyFilled;
    case 'filled':
    case 'closed':
      return OrderStatus.Filled;
    case 'canceled':
      return OrderStatus.Canceled;
    case 'pending cancel':
      return OrderStatus.PendingCancel;
    case 'rejected':
      return OrderStatus.Rejected;
    case 'expired':
      return OrderStatus.Expired;
    case 'insurance':
      return OrderStatus.Insurance;
    default:
      return OrderStatus.Adl;
  }
};

/************************************** VERIF ORDER TYPE ********************************************/
export const getOrderType = (orderType: string) => {
  switch (orderType) {
    case 'limit':
      return EOrderType.Limit;
    case 'market':
      return EOrderType.Market;
    case 'stop loss':
      return EOrderType.StopLoss;
    case 'stop loss limit':
      return EOrderType.StopLossLimit;
    case 'stop':
      return EOrderType.Stop;
    case 'stop market':
      return EOrderType.StopMarket;
    case 'take profit':
      return EOrderType.TakeProfit;
    case 'take profit market':
      return EOrderType.TakeProfitMarket;
    case 'take profit limit':
      return EOrderType.TakeProfitLimit;
    case 'limit maker':
      return EOrderType.LimitMaker;
    case 'trailing stop market':
      return EOrderType.TrailingStopMarket;
    default:
      return EOrderType.Liquidation;
  }
};
