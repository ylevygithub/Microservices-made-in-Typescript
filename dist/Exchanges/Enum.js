"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderType = exports.getStatus = exports.ETimeInForce = exports.OrderSide = exports.OrderStatus = exports.EOrderType = void 0;
var EOrderType;
(function (EOrderType) {
    EOrderType[EOrderType["Limit"] = 0] = "Limit";
    EOrderType[EOrderType["Market"] = 1] = "Market";
    EOrderType[EOrderType["StopLoss"] = 2] = "StopLoss";
    EOrderType[EOrderType["StopLossLimit"] = 3] = "StopLossLimit";
    EOrderType[EOrderType["Stop"] = 4] = "Stop";
    EOrderType[EOrderType["StopMarket"] = 5] = "StopMarket";
    EOrderType[EOrderType["TakeProfit"] = 6] = "TakeProfit";
    EOrderType[EOrderType["TakeProfitMarket"] = 7] = "TakeProfitMarket";
    EOrderType[EOrderType["TakeProfitLimit"] = 8] = "TakeProfitLimit";
    EOrderType[EOrderType["LimitMaker"] = 9] = "LimitMaker";
    EOrderType[EOrderType["TrailingStopMarket"] = 10] = "TrailingStopMarket";
    EOrderType[EOrderType["Liquidation"] = 11] = "Liquidation";
})(EOrderType = exports.EOrderType || (exports.EOrderType = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Open"] = 0] = "Open";
    OrderStatus[OrderStatus["PartiallyFilled"] = 1] = "PartiallyFilled";
    OrderStatus[OrderStatus["Filled"] = 2] = "Filled";
    OrderStatus[OrderStatus["Canceled"] = 3] = "Canceled";
    OrderStatus[OrderStatus["PendingCancel"] = 4] = "PendingCancel";
    OrderStatus[OrderStatus["Rejected"] = 5] = "Rejected";
    OrderStatus[OrderStatus["Expired"] = 6] = "Expired";
    OrderStatus[OrderStatus["Insurance"] = 7] = "Insurance";
    OrderStatus[OrderStatus["Adl"] = 8] = "Adl";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var OrderSide;
(function (OrderSide) {
    OrderSide[OrderSide["Buy"] = 0] = "Buy";
    OrderSide[OrderSide["Sell"] = 1] = "Sell";
})(OrderSide = exports.OrderSide || (exports.OrderSide = {}));
var ETimeInForce;
(function (ETimeInForce) {
    ETimeInForce[ETimeInForce["GoodTillCancel"] = 0] = "GoodTillCancel";
    ETimeInForce[ETimeInForce["ImmediateOrCancel"] = 1] = "ImmediateOrCancel";
    ETimeInForce[ETimeInForce["FillOrKill"] = 2] = "FillOrKill";
    ETimeInForce[ETimeInForce["GoodTillCrossing"] = 3] = "GoodTillCrossing";
    ETimeInForce[ETimeInForce["GoodTillExpiredOrCanceled"] = 4] = "GoodTillExpiredOrCanceled";
})(ETimeInForce = exports.ETimeInForce || (exports.ETimeInForce = {}));
exports.getStatus = (status) => {
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
exports.getOrderType = (orderType) => {
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
//# sourceMappingURL=Enum.js.map