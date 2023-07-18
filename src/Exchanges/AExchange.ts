import * as ccxt from 'ccxt';
import { ExBalance } from '../Dtos/ExBalance';
import { ExMarket } from '../Dtos/ExMarket';
import { ExOrder } from '../Dtos/ExOrder';
import { ExPlaceOrder } from '../Dtos/ExPlaceOrder';
import { ExPrice } from '../Dtos/ExPrice';
import {
  calculatePrecision,
  cancelOrder,
  getOrder,
  placeOrder,
  resultError,
  tickerResult,
  tickersResult,
  tryCatch
} from './Common';
import { OrderSide } from './Enum';
import { IExchange } from './IExchange';

export class AExchange implements IExchange {
  protected name: string;

  protected publicAPI: string;

  protected privateAPI: string;

  protected options: { [key: string]: string };

  constructor(
    name: string,
    publicAPI: string,
    privateAPI: string,
    options: { [key: string]: string }
  ) {
    this.name = name;
    this.publicAPI = publicAPI;
    this.privateAPI = privateAPI;
    this.options = options;
  }

  /************************************** ("ETH-USDT to exchangeFormat") ********************************************/
  public GetPairFormat = (marketName: string) => {
    const copySymbol = (' ' + marketName).slice(1);
    return copySymbol.split('-').join('/');
  };

  /************************************** ("exchangeFormat to ETH-USDT") ********************************************/
  public GetPairExchange = (exchangePair: string) => {
    if (exchangePair == null) {
      return null;
    }
    const copySymbol = (' ' + exchangePair).slice(1);
    return copySymbol.split('/').join('-');
  };

  /************************************** GET BALANCES ********************************************/
  public GetBalancesAsync = async () => {
    return tryCatch<ExBalance[]>(async (resultAPI) => {
      const exchange = this.GetExchange();
      const data = await exchange.fetchBalance();
      if (data == null) {
        return resultError(resultAPI, 'data of GetBalances is null or undefined');
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
          resultAPI.Result.push(
            new ExBalance(token ?? '', Number(free) ?? 0, Number(used) ?? 0, Number(total) ?? 0)
          );
        }
      }
      return resultAPI;
    });
  };

  /************************************** GET MARKETS ********************************************/
  public GetMarketsAsync = async () => {
    return tryCatch<ExMarket[]>(async (resultAPI) => {
      const exchange = this.GetExchange(false);
      const okxMarkets = await exchange.fetchMarkets();
      const datas = okxMarkets;
      if (datas == null) {
        return resultError(resultAPI, 'datas of GetMarkets is null or undefined');
      }
      resultAPI.Result = [];
      resultAPI.Success = true;
      for (const data of datas) {
        resultAPI.Result.push(
          new ExMarket(
            this.GetPairExchange(data?.symbol) ?? '',
            Number(calculatePrecision(data?.precision?.amount, data?.active)) ?? 0,
            Number(calculatePrecision(data?.precision?.price, data?.active)) ?? 0,
            Number(data?.limits?.leverage?.min) ?? 0,
            Number(data?.limits?.leverage?.max) ?? 0,
            Number(data?.limits?.amount?.min) ?? 0,
            Number(data?.limits?.amount?.max) ?? 0,
            Number(data?.limits?.price?.min) ?? 0,
            Number(data?.limits?.price?.max) ?? 0,
            Number(data?.limits?.cost?.min) ?? 0,
            Number(data?.limits?.cost?.max) ?? 0,
            Number(data?.taker),
            Number(data?.maker)
          )
        );
      }
      return resultAPI;
    });
  };

  public GetPricesAsync = async () => {
    return tryCatch<ExPrice[]>(async (resultAPI) => {
      const exchange = this.GetExchange(false);
      return tickersResult(exchange, resultAPI);
    });
  };

  public GetPriceAsync = async (pair: string) => {
    return tryCatch<ExPrice>(async (resultAPI) => {
      const exchange = this.GetExchange(false);
      return tickerResult(exchange, resultAPI, this.GetPairFormat(pair));
    });
  };

  public CancelOrderAsync = async (orderId: string, pair: string) => {
    return tryCatch<string>(async (resultAPI) => {
      const exchange = this.GetExchange();
      return cancelOrder(exchange, resultAPI, this.GetPairFormat(pair), orderId);
    });
  };

  public GetOrderAsync = async (orderId: string, pair: string) => {
    return tryCatch<ExOrder>(async (resultAPI) => {
      const exchange = this.GetExchange();
      return getOrder(exchange, resultAPI, this.GetPairFormat(pair), orderId);
    });
  };

  public PlaceOrderAsync = async (
    side: OrderSide,
    pair: string,
    quantity: number,
    price: number,
    leverage: number,
    options: { [key: string]: string }
  ) => {
    return tryCatch<ExPlaceOrder>(async (resultAPI) => {
      const exchange = this.GetExchange();
      const type = price === 0 ? 'market' : 'limit';
      const order = await exchange.createOrder(
        this.GetPairFormat(pair),
        type,
        side === 0 ? 'buy' : 'sell',
        quantity,
        price
      );
      if (order?.average == null && order?.price == null) {
        const orderInfo = await this.GetOrderAsync(order.id, pair);
        order.price = orderInfo?.Result?.Price ?? 0;
      }
      return placeOrder(order, resultAPI);
    });
  };

  public GetExchange = (needCredentials: boolean = true) => {
    if (!(this.name in ccxt)) throw new Error('Exchange name does not exist');
    return new ccxt[this.name]({
      apiKey: needCredentials ? this.publicAPI : '',
      secret: needCredentials ? this.privateAPI : '',
      password: needCredentials ? this.options?.PassPhrase ?? '' : ''
    });
  };
}
