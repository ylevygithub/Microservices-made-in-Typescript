"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AExchange = void 0;
const ccxt = __importStar(require("ccxt"));
const ExBalance_1 = require("../Dtos/ExBalance");
const ExMarket_1 = require("../Dtos/ExMarket");
const Common_1 = require("./Common");
class AExchange {
    constructor(name, publicAPI, privateAPI, options) {
        /************************************** ("ETH-USDT to exchangeFormat") ********************************************/
        this.GetPairFormat = (marketName) => {
            const copySymbol = (' ' + marketName).slice(1);
            return copySymbol.split('-').join('/');
        };
        /************************************** ("exchangeFormat to ETH-USDT") ********************************************/
        this.GetPairExchange = (exchangePair) => {
            if (exchangePair == null) {
                return null;
            }
            const copySymbol = (' ' + exchangePair).slice(1);
            return copySymbol.split('/').join('-');
        };
        /************************************** GET BALANCES ********************************************/
        this.GetBalancesAsync = () => __awaiter(this, void 0, void 0, function* () {
            return Common_1.tryCatch((resultAPI) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                const exchange = this.GetExchange();
                const data = yield exchange.fetchBalance();
                if (data == null) {
                    return Common_1.resultError(resultAPI, 'data of GetBalances is null or undefined');
                }
                resultAPI.Result = [];
                resultAPI.Success = true;
                const listTotal = data.total;
                const listFree = data.free;
                const listUsed = data.used;
                for (const token in listTotal) {
                    const total = token in listTotal ? listTotal[token] : 0;
                    const free = token in listFree ? listFree[token] : 0;
                    const used = token in listUsed ? listUsed[token] : 0;
                    if (total > 0) {
                        resultAPI.Result.push(new ExBalance_1.ExBalance(token !== null && token !== void 0 ? token : '', (_a = Number(free)) !== null && _a !== void 0 ? _a : 0, (_b = Number(used)) !== null && _b !== void 0 ? _b : 0, (_c = Number(total)) !== null && _c !== void 0 ? _c : 0));
                    }
                }
                return resultAPI;
            }));
        });
        /************************************** GET MARKETS ********************************************/
        this.GetMarketsAsync = () => __awaiter(this, void 0, void 0, function* () {
            return Common_1.tryCatch((resultAPI) => __awaiter(this, void 0, void 0, function* () {
                var _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
                const exchange = this.GetExchange(false);
                const okxMarkets = yield exchange.fetchMarkets();
                const datas = okxMarkets;
                if (datas == null) {
                    return Common_1.resultError(resultAPI, 'datas of GetMarkets is null or undefined');
                }
                resultAPI.Result = [];
                resultAPI.Success = true;
                for (const data of datas) {
                    resultAPI.Result.push(new ExMarket_1.ExMarket((_d = this.GetPairExchange(data === null || data === void 0 ? void 0 : data.symbol)) !== null && _d !== void 0 ? _d : '', (_f = Number(Common_1.calculatePrecision((_e = data === null || data === void 0 ? void 0 : data.precision) === null || _e === void 0 ? void 0 : _e.amount, data === null || data === void 0 ? void 0 : data.active))) !== null && _f !== void 0 ? _f : 0, (_h = Number(Common_1.calculatePrecision((_g = data === null || data === void 0 ? void 0 : data.precision) === null || _g === void 0 ? void 0 : _g.price, data === null || data === void 0 ? void 0 : data.active))) !== null && _h !== void 0 ? _h : 0, (_l = Number((_k = (_j = data === null || data === void 0 ? void 0 : data.limits) === null || _j === void 0 ? void 0 : _j.leverage) === null || _k === void 0 ? void 0 : _k.min)) !== null && _l !== void 0 ? _l : 0, (_p = Number((_o = (_m = data === null || data === void 0 ? void 0 : data.limits) === null || _m === void 0 ? void 0 : _m.leverage) === null || _o === void 0 ? void 0 : _o.max)) !== null && _p !== void 0 ? _p : 0, (_s = Number((_r = (_q = data === null || data === void 0 ? void 0 : data.limits) === null || _q === void 0 ? void 0 : _q.amount) === null || _r === void 0 ? void 0 : _r.min)) !== null && _s !== void 0 ? _s : 0, (_v = Number((_u = (_t = data === null || data === void 0 ? void 0 : data.limits) === null || _t === void 0 ? void 0 : _t.amount) === null || _u === void 0 ? void 0 : _u.max)) !== null && _v !== void 0 ? _v : 0, (_y = Number((_x = (_w = data === null || data === void 0 ? void 0 : data.limits) === null || _w === void 0 ? void 0 : _w.price) === null || _x === void 0 ? void 0 : _x.min)) !== null && _y !== void 0 ? _y : 0, (_1 = Number((_0 = (_z = data === null || data === void 0 ? void 0 : data.limits) === null || _z === void 0 ? void 0 : _z.price) === null || _0 === void 0 ? void 0 : _0.max)) !== null && _1 !== void 0 ? _1 : 0, (_4 = Number((_3 = (_2 = data === null || data === void 0 ? void 0 : data.limits) === null || _2 === void 0 ? void 0 : _2.cost) === null || _3 === void 0 ? void 0 : _3.min)) !== null && _4 !== void 0 ? _4 : 0, (_7 = Number((_6 = (_5 = data === null || data === void 0 ? void 0 : data.limits) === null || _5 === void 0 ? void 0 : _5.cost) === null || _6 === void 0 ? void 0 : _6.max)) !== null && _7 !== void 0 ? _7 : 0, Number(data === null || data === void 0 ? void 0 : data.taker), Number(data === null || data === void 0 ? void 0 : data.maker)));
                }
                return resultAPI;
            }));
        });
        this.GetPricesAsync = () => __awaiter(this, void 0, void 0, function* () {
            return Common_1.tryCatch((resultAPI) => __awaiter(this, void 0, void 0, function* () {
                const exchange = this.GetExchange(false);
                return Common_1.tickersResult(exchange, resultAPI);
            }));
        });
        this.GetPriceAsync = (pair) => __awaiter(this, void 0, void 0, function* () {
            return Common_1.tryCatch((resultAPI) => __awaiter(this, void 0, void 0, function* () {
                const exchange = this.GetExchange(false);
                return Common_1.tickerResult(exchange, resultAPI, this.GetPairFormat(pair));
            }));
        });
        this.CancelOrderAsync = (orderId, pair) => __awaiter(this, void 0, void 0, function* () {
            return Common_1.tryCatch((resultAPI) => __awaiter(this, void 0, void 0, function* () {
                const exchange = this.GetExchange();
                return Common_1.cancelOrder(exchange, resultAPI, this.GetPairFormat(pair), orderId);
            }));
        });
        this.GetOrderAsync = (orderId, pair) => __awaiter(this, void 0, void 0, function* () {
            return Common_1.tryCatch((resultAPI) => __awaiter(this, void 0, void 0, function* () {
                const exchange = this.GetExchange();
                return Common_1.getOrder(exchange, resultAPI, this.GetPairFormat(pair), orderId);
            }));
        });
        this.PlaceOrderAsync = (side, pair, quantity, price, leverage, options) => __awaiter(this, void 0, void 0, function* () {
            return Common_1.tryCatch((resultAPI) => __awaiter(this, void 0, void 0, function* () {
                var _8, _9;
                const exchange = this.GetExchange();
                const type = price === 0 ? 'market' : 'limit';
                const order = yield exchange.createOrder(this.GetPairFormat(pair), type, side === 0 ? 'buy' : 'sell', quantity, price);
                if ((order === null || order === void 0 ? void 0 : order.average) == null && (order === null || order === void 0 ? void 0 : order.price) == null) {
                    const orderInfo = yield this.GetOrderAsync(order.id, pair);
                    order.price = (_9 = (_8 = orderInfo === null || orderInfo === void 0 ? void 0 : orderInfo.Result) === null || _8 === void 0 ? void 0 : _8.Price) !== null && _9 !== void 0 ? _9 : 0;
                }
                return Common_1.placeOrder(order, resultAPI);
            }));
        });
        this.GetExchange = (needCredentials = true) => {
            var _a, _b;
            if (!(this.name in ccxt))
                throw new Error('Exchange name does not exist');
            return new ccxt[this.name]({
                apiKey: needCredentials ? this.publicAPI : '',
                secret: needCredentials ? this.privateAPI : '',
                password: needCredentials ? (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.PassPhrase) !== null && _b !== void 0 ? _b : '' : ''
            });
        };
        this.name = name;
        this.publicAPI = publicAPI;
        this.privateAPI = privateAPI;
        this.options = options;
    }
}
exports.AExchange = AExchange;
//# sourceMappingURL=AExchange.js.map