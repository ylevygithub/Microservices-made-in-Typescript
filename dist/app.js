"use strict";
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
const express_1 = __importDefault(require("express"));
const ApiResult_1 = require("./ApiResult");
const AExchange_1 = require("./Exchanges/AExchange");
const Ascendex_1 = require("./Exchanges/Ascendex");
const Bybit_1 = require("./Exchanges/Bybit");
const Coinbase_1 = require("./Exchanges/Coinbase");
const CoinbasePro_1 = require("./Exchanges/CoinbasePro");
const Common_1 = require("./Exchanges/Common");
const Cryptocom_1 = require("./Exchanges/Cryptocom");
const Okx_1 = require("./Exchanges/Okx");
const app = express_1.default();
const GetExchange = (req) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        const name = (_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
        const apiKey = (_d = (_c = req.query) === null || _c === void 0 ? void 0 : _c.apiKey) !== null && _d !== void 0 ? _d : '';
        const apiPrivate = (_f = (_e = req.query) === null || _e === void 0 ? void 0 : _e.apiPrivate) !== null && _f !== void 0 ? _f : '';
        const options = ((_g = req.query) === null || _g === void 0 ? void 0 : _g.options) == null ? {} : (_j = JSON.parse((_h = req.query) === null || _h === void 0 ? void 0 : _h.options)) !== null && _j !== void 0 ? _j : {};
        switch (name) {
            case 'coinbasepro':
                return new CoinbasePro_1.CoinbaseProExchange(name, apiKey, apiPrivate, options);
            case 'cryptocom':
                return new Cryptocom_1.CryptocomExchange(name, apiKey, apiPrivate, options);
            case 'bybit':
                return new Bybit_1.BybitExchange(name, apiKey, apiPrivate, options);
            case 'coinbase':
                return new Coinbase_1.CoinbaseExchange(name, apiKey, apiPrivate, options);
            case 'ascendex':
                return new Ascendex_1.AscendexExchange(name, apiKey, apiPrivate, options);
            case 'okx':
                return new Okx_1.OkxExchange(name, apiKey, apiPrivate, options);
            default:
                return new AExchange_1.AExchange(name, apiKey, apiPrivate, options);
        }
    }
    catch (e) {
        return null;
    }
};
app.get('/GetBalances', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exchange = GetExchange(req);
        return res.status(200).send(yield exchange.GetBalancesAsync());
    }
    catch (e) {
        return res.status(400).send(Common_1.resultError(new ApiResult_1.APIResult(), e.Message));
    }
}));
app.get('/GetMarkets', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exchange = GetExchange(req);
        return res.status(200).send(yield exchange.GetMarketsAsync());
    }
    catch (e) {
        return res.status(400).send(Common_1.resultError(new ApiResult_1.APIResult(), e.Message));
    }
}));
app.get('/GetPrices', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exchange = GetExchange(req);
        return res.status(200).send(yield exchange.GetPricesAsync());
    }
    catch (e) {
        return res.status(400).send(Common_1.resultError(new ApiResult_1.APIResult(), e.Message));
    }
}));
app.get('/GetPrice', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const exchange = GetExchange(req);
        const pair = (_a = req.query.pair) === null || _a === void 0 ? void 0 : _a.toString();
        return res.status(200).send(yield exchange.GetPriceAsync(pair));
    }
    catch (e) {
        return res.status(400).send(Common_1.resultError(new ApiResult_1.APIResult(), e.Message));
    }
}));
app.get('/CancelOrder', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const exchange = GetExchange(req);
        const pair = (_b = req.query.pair) === null || _b === void 0 ? void 0 : _b.toString();
        const orderId = (_c = req.query.orderId) === null || _c === void 0 ? void 0 : _c.toString();
        return res.status(200).send(yield exchange.CancelOrderAsync(orderId, pair));
    }
    catch (e) {
        return res.status(400).send(Common_1.resultError(new ApiResult_1.APIResult(), e.Message));
    }
}));
app.get('/GetOrder', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const exchange = GetExchange(req);
        const pair = (_d = req.query.pair) === null || _d === void 0 ? void 0 : _d.toString();
        const orderId = (_e = req.query.orderId) === null || _e === void 0 ? void 0 : _e.toString();
        return res.status(200).send(yield exchange.GetOrderAsync(orderId, pair));
    }
    catch (e) {
        return res.status(400).send(Common_1.resultError(new ApiResult_1.APIResult(), e.Message));
    }
}));
app.get('/PlaceOrder', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const exchange = GetExchange(req);
        const pair = (_f = req.query.pair) === null || _f === void 0 ? void 0 : _f.toString();
        const side = Number(req.query.side);
        const quantity = Number(req.query.quantity);
        const price = Number(req.query.price);
        const leverage = Number(req.query.leverage);
        const options = JSON.parse(req.query.placeOrderOptions.toString());
        return res
            .status(200)
            .send(yield exchange.PlaceOrderAsync(side, pair, quantity, price, leverage, options));
    }
    catch (e) {
        return res.status(400).send(Common_1.resultError(new ApiResult_1.APIResult(), e.Message));
    }
}));
const port = 8085;
app.listen(port, () => console.log(`server is listening on ${port}`));
//# sourceMappingURL=app.js.map