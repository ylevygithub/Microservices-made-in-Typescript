"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExOrder = void 0;
class ExOrder {
    constructor(Pair, OrderId, Price, Quantity, QuantityRemaining, Status, Side, OrderType) {
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
exports.ExOrder = ExOrder;
//# sourceMappingURL=ExOrder.js.map