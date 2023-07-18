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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrecision = exports.placeOrder = exports.getOrder = exports.cancelOrder = exports.tickerResult = exports.tickersResult = exports.tickerCCXTtoExPrice = exports.tryCatch = exports.resultError = void 0;
const ccxt = __importStar(require("ccxt"));
const ololog_1 = __importDefault(require("ololog"));
const ApiResult_1 = require("../ApiResult");
const ExOrder_1 = require("../Dtos/ExOrder");
const ExPlaceOrder_1 = require("../Dtos/ExPlaceOrder");
const ExPrice_1 = require("../Dtos/ExPrice");
const Enum_1 = require("./Enum");
const log = ololog_1.default;
/************************************** ERROR IN RESULT ********************************************/
exports.resultError = (resultAPI, msg) => {
    resultAPI.Success = false;
    resultAPI.Error = msg;
    return resultAPI;
};
/************************************** GET CCXT ERROR ********************************************/
const GetCcxtError = (e) => {
    let errorStr = '';
    if (e instanceof ccxt.DDoSProtection || e.message.includes('ECONNRESET'))
        errorStr = '[DDoS Protection] ' + e.message;
    else if (e instanceof ccxt.RequestTimeout)
        errorStr = '[Request Timeout] ' + e.message;
    else if (e instanceof ccxt.AuthenticationError)
        errorStr = '[Authentication Error] ' + e.message;
    else if (e instanceof ccxt.ExchangeNotAvailable)
        errorStr = '[Exchange Not Available Error] ' + e.message;
    else if (e instanceof ccxt.ExchangeError)
        errorStr = '[Exchange Error] ' + e.message;
    else if (e instanceof ccxt.NetworkError)
        errorStr = '[Network Error] ' + e.message;
    else
        errorStr = '[Error] ' + e.message;
    ;
    log.bright.yellow(errorStr);
    return errorStr;
};
/************************************** TRY/CATCH COMMON ********************************************/
exports.tryCatch = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    const resultOfAPI = new ApiResult_1.APIResult();
    try {
        return yield callback(resultOfAPI);
    }
    catch (e) {
        resultOfAPI.Error = GetCcxtError(e);
        resultOfAPI.Success = false;
        return resultOfAPI;
    }
});
/************************************** ("exchangeFormat to ETH-USDT") ********************************************/
const GetPairExchange = (exchangePair) => {
    if (exchangePair == null)
        return null;
    let copySymbol = (' ' + exchangePair).slice(1);
    return copySymbol.split('/').join('-');
};
/************************************** TICKERS RESULT ********************************************/
exports.tickerCCXTtoExPrice = (ticker) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return new ExPrice_1.ExPrice((_a = GetPairExchange(ticker === null || ticker === void 0 ? void 0 : ticker.symbol)) !== null && _a !== void 0 ? _a : '', (_b = ticker === null || ticker === void 0 ? void 0 : ticker.close) !== null && _b !== void 0 ? _b : 0, (_c = ticker === null || ticker === void 0 ? void 0 : ticker.low) !== null && _c !== void 0 ? _c : 0, (_d = ticker === null || ticker === void 0 ? void 0 : ticker.quoteVolume) !== null && _d !== void 0 ? _d : 0, (_e = ticker === null || ticker === void 0 ? void 0 : ticker.last) !== null && _e !== void 0 ? _e : 0, (_f = ticker === null || ticker === void 0 ? void 0 : ticker.baseVolume) !== null && _f !== void 0 ? _f : 0, (_g = ticker === null || ticker === void 0 ? void 0 : ticker.bid) !== null && _g !== void 0 ? _g : 0, (_h = ticker === null || ticker === void 0 ? void 0 : ticker.ask) !== null && _h !== void 0 ? _h : 0);
};
exports.tickersResult = (exchangeName, resultAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const tickers = yield exchangeName.fetchTickers();
    console.log(tickers);
    if (tickers == null)
        return exports.resultError(resultAPI, 'tickers of GetPrices is null or undefined');
    resultAPI.Result = [];
    resultAPI.Success = true;
    for (const p in tickers) {
        const ticker = tickers[p];
        resultAPI.Result.push(exports.tickerCCXTtoExPrice(ticker));
    }
    return resultAPI;
});
/************************************** TICKER RESULT ********************************************/
exports.tickerResult = (exchangeName, resultAPI, pair) => __awaiter(void 0, void 0, void 0, function* () {
    let ticker = yield exchangeName.fetchTicker(pair);
    if (ticker == null)
        return exports.resultError(resultAPI, 'ticker of GetPrice is null or undefined');
    resultAPI.Success = true;
    resultAPI.Result = exports.tickerCCXTtoExPrice(ticker);
    return resultAPI;
});
/************************************** CANCEL ORDER  ********************************************/
exports.cancelOrder = (exchangeName, resultAPI, pair, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    let cancelOrder = yield exchangeName.cancelOrder(orderId, pair);
    if (cancelOrder == null)
        return exports.resultError(resultAPI, 'cancelOrder is null or undefined');
    resultAPI.Success = true;
    resultAPI.Result =
        'The pair: ' +
            pair +
            ' of orderId: ' +
            orderId +
            ' was cancelled successfully';
    return resultAPI;
});
/************************************** GET ORDER  ********************************************/
exports.getOrder = (exchangeName, resultAPI, pair, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    let order = yield exchangeName.fetchOrder(orderId, pair);
    const datas = order;
    if (datas == null)
        return exports.resultError(resultAPI, 'datas of GetOrder is null or undefined');
    resultAPI.Success = true;
    resultAPI.Result = new ExOrder_1.ExOrder((_a = GetPairExchange(pair)) !== null && _a !== void 0 ? _a : '', (_b = datas === null || datas === void 0 ? void 0 : datas.id) !== null && _b !== void 0 ? _b : '', (_d = (_c = datas === null || datas === void 0 ? void 0 : datas.average) !== null && _c !== void 0 ? _c : datas === null || datas === void 0 ? void 0 : datas.price) !== null && _d !== void 0 ? _d : 0, (_e = datas === null || datas === void 0 ? void 0 : datas.amount) !== null && _e !== void 0 ? _e : 0, (_f = datas === null || datas === void 0 ? void 0 : datas.remaining) !== null && _f !== void 0 ? _f : 0, (_g = Enum_1.getStatus(datas === null || datas === void 0 ? void 0 : datas.status)) !== null && _g !== void 0 ? _g : null, 
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    (datas === null || datas === void 0 ? void 0 : datas.side) === 'buy' ? Enum_1.OrderSide.Buy : (_h = Enum_1.OrderSide.Sell) !== null && _h !== void 0 ? _h : null, (_j = Enum_1.getOrderType(datas === null || datas === void 0 ? void 0 : datas.type)) !== null && _j !== void 0 ? _j : null);
    return resultAPI;
});
/************************************** PLACE ORDER  ********************************************/
exports.placeOrder = (exchangeOrder, resultAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    const datas = exchangeOrder;
    if (datas == null)
        return exports.resultError(resultAPI, 'datas of PlaceOrder is null or undefined');
    resultAPI.Success = true;
    resultAPI.Result = new ExPlaceOrder_1.ExPlaceOrder((_k = datas === null || datas === void 0 ? void 0 : datas.id) !== null && _k !== void 0 ? _k : '', (_m = (_l = datas === null || datas === void 0 ? void 0 : datas.average) !== null && _l !== void 0 ? _l : datas === null || datas === void 0 ? void 0 : datas.price) !== null && _m !== void 0 ? _m : 0);
    return resultAPI;
});
/************************************** CALCULATE PRECISION ********************************************/
exports.calculatePrecision = (precision, active) => {
    if (active === true) {
        if (precision == 0)
            return precision;
        if (precision >= 1) {
            let newP = 1;
            for (let i = 0; i < precision; i++)
                newP /= 10;
            return Number(newP.toPrecision(precision));
        }
        return precision;
    }
    else
        return null;
};
//# sourceMappingURL=Common.js.map