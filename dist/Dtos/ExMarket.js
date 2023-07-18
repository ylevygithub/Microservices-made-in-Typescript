"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExMarket = void 0;
class ExMarket {
    constructor(Pair, PrecisionAmount, PrecisionPrice, LimitLeverageMin, LimitLeverageMax, LimitAmountMin, LimitAmountMax, LimitPriceMin, LimitPriceMax, LimitCostMin, LimitCostMax, Taker, Maker) {
        this.Pair = Pair;
        this.PrecisionAmount = PrecisionAmount;
        this.PrecisionPrice = PrecisionPrice;
        this.LimitLeverageMin = LimitLeverageMin;
        this.LimitLeverageMax = LimitLeverageMax;
        this.LimitAmountMin = LimitAmountMin;
        this.LimitAmountMax = LimitAmountMax;
        this.LimitPriceMin = LimitPriceMin;
        this.LimitPriceMax = LimitPriceMax;
        this.LimitCostMin = LimitCostMin;
        this.LimitCostMax = LimitCostMax;
        this.Taker = Taker;
        this.Maker = Maker;
    }
}
exports.ExMarket = ExMarket;
//# sourceMappingURL=ExMarket.js.map