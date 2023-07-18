import { Exchange } from 'ccxt';
import { ExBalance } from '../Dtos/ExBalance';
import { ExMarket } from '../Dtos/ExMarket';
import { APIResult } from '../ApiResult';
import { ExPrice } from '../Dtos/ExPrice';
import { ExPlaceOrder } from '../Dtos/ExPlaceOrder';
import { ExOrder } from '../Dtos/ExOrder';
import { OrderSide } from './Enum';

export interface IExchange {
  GetBalancesAsync: () => Promise<APIResult<ExBalance[]>>;
  GetMarketsAsync: () => Promise<APIResult<ExMarket[]>>;
  GetPricesAsync: () => Promise<APIResult<ExPrice[]>>;
  GetPriceAsync: (pair: string) => Promise<APIResult<ExPrice>>;
  GetExchange: () => Exchange;
  GetPairFormat: (marketName: string) => string;
  GetPairExchange: (exchangePair: string) => string;
  PlaceOrderAsync: (
    side: OrderSide,
    pair: string,
    quantity: number,
    price: number,
    leverage: number,
    options: { [key: string]: string }
  ) => Promise<APIResult<ExPlaceOrder>>;
  CancelOrderAsync: (orderId: string, pair: string) => Promise<APIResult<string>>;
  GetOrderAsync: (orderId: string, pair: string) => Promise<APIResult<ExOrder>>;
}
