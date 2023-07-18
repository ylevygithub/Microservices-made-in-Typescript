"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExBalance = void 0;
class ExBalance {
    constructor(Currency, Free, Locked, Total, Borrowed = 0, Interest = 0) {
        this.Currency = Currency;
        this.Free = Free;
        this.Locked = Locked;
        this.Total = Total;
        this.Borrowed = Borrowed;
        this.Interest = Interest;
    }
}
exports.ExBalance = ExBalance;
//# sourceMappingURL=ExBalance.js.map