import express, { Application, Request, Response, NextFunction } from 'express';
import { APIResult } from './ApiResult';
import { AExchange } from './Exchanges/AExchange';
import { AscendexExchange } from './Exchanges/Ascendex';
import { BybitExchange } from './Exchanges/Bybit';
import { CoinbaseExchange } from './Exchanges/Coinbase';
import { CoinbaseProExchange } from './Exchanges/CoinbasePro';
import { resultError } from './Exchanges/Common';
import { CryptocomExchange } from './Exchanges/Cryptocom';
import { OkxExchange } from './Exchanges/Okx';

const app: Application = express();

const GetExchange = (req) => {
  try {
    const name = req.query?.name ?? '';
    const apiKey = req.query?.apiKey ?? '';
    const apiPrivate = req.query?.apiPrivate ?? '';
    const options = req.query?.options == null ? {} : JSON.parse(req.query?.options) ?? {};
    switch (name) {
      case 'coinbasepro':
        return new CoinbaseProExchange(name, apiKey, apiPrivate, options);
      case 'cryptocom':
        return new CryptocomExchange(name, apiKey, apiPrivate, options);
      case 'bybit':
        return new BybitExchange(name, apiKey, apiPrivate, options);
      case 'coinbase':
        return new CoinbaseExchange(name, apiKey, apiPrivate, options);
      case 'ascendex':
        return new AscendexExchange(name, apiKey, apiPrivate, options);
      case 'okx':
        return new OkxExchange(name, apiKey, apiPrivate, options);
      default:
        return new AExchange(name, apiKey, apiPrivate, options);
    }
  } catch (e) {
    return null;
  }
};

app.get('/GetBalances', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exchange = GetExchange(req);
    return res.status(200).send(await exchange.GetBalancesAsync());
  } catch (e) {
    return res.status(400).send(resultError(new APIResult(), e.Message));
  }
});

app.get('/GetMarkets', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exchange = GetExchange(req);
    return res.status(200).send(await exchange.GetMarketsAsync());
  } catch (e) {
    return res.status(400).send(resultError(new APIResult(), e.Message));
  }
});

app.get('/GetPrices', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exchange = GetExchange(req);
    return res.status(200).send(await exchange.GetPricesAsync());
  } catch (e) {
    return res.status(400).send(resultError(new APIResult(), e.Message));
  }
});

app.get('/GetPrice', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exchange = GetExchange(req);
    const pair = req.query.pair?.toString();
    return res.status(200).send(await exchange.GetPriceAsync(pair));
  } catch (e) {
    return res.status(400).send(resultError(new APIResult(), e.Message));
  }
});

app.get('/CancelOrder', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exchange = GetExchange(req);
    const pair = req.query.pair?.toString();
    const orderId = req.query.orderId?.toString();
    return res.status(200).send(await exchange.CancelOrderAsync(orderId, pair));
  } catch (e) {
    return res.status(400).send(resultError(new APIResult(), e.Message));
  }
});

app.get('/GetOrder', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exchange = GetExchange(req);
    const pair = req.query.pair?.toString();
    const orderId = req.query.orderId?.toString();
    return res.status(200).send(await exchange.GetOrderAsync(orderId, pair));
  } catch (e) {
    return res.status(400).send(resultError(new APIResult(), e.Message));
  }
});

app.get('/PlaceOrder', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exchange = GetExchange(req);
    const pair = req.query.pair?.toString();
    const side = Number(req.query.side);
    const quantity = Number(req.query.quantity);
    const price = Number(req.query.price);
    const leverage = Number(req.query.leverage);
    const options = JSON.parse(req.query.placeOrderOptions.toString());
    return res
      .status(200)
      .send(await exchange.PlaceOrderAsync(side, pair, quantity, price, leverage, options));
  } catch (e) {
    return res.status(400).send(resultError(new APIResult(), e.Message));
  }
});

const port = 8085;
app.listen(port, () => console.log(`server is listening on ${port}`));
