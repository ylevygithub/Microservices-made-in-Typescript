import * as ccxt from 'ccxt';
import ololog from 'ololog';
import { APIResult } from '../ApiResult';
import { ExOrder } from '../Dtos/ExOrder';
import { ExPlaceOrder } from '../Dtos/ExPlaceOrder';
import { ExPrice } from '../Dtos/ExPrice';
import { getStatus, getOrderType, OrderSide } from './Enum';

const log = ololog;

/************************************** ERROR IN RESULT ********************************************/
export const resultError = <T>(resultAPI: APIResult<T>, msg: string) => {
  resultAPI.Success = false;
  resultAPI.Error = msg;
  return resultAPI;
};

/************************************** GET CCXT ERROR ********************************************/
const GetCcxtError = (e: Error) => {
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
    errorStr = '[Error] ' + e.message;;
  log.bright.yellow(errorStr);
  return errorStr;
};

/************************************** TRY/CATCH COMMON ********************************************/
export const tryCatch = async <T>(
  callback: (resultOfAPI: APIResult<T>) => Promise<APIResult<T>>
) => {
  const resultOfAPI = new APIResult<T>();

  try {
    return await callback(resultOfAPI);
  } catch (e) {
    resultOfAPI.Error = GetCcxtError(e);
    resultOfAPI.Success = false;
    return resultOfAPI;
  }
};

/************************************** ("exchangeFormat to ETH-USDT") ********************************************/
const GetPairExchange = (exchangePair: string) => {
  if (exchangePair == null) return null;
  let copySymbol = (' ' + exchangePair).slice(1);
  return copySymbol.split('/').join('-');
};

/************************************** TICKERS RESULT ********************************************/
export const tickerCCXTtoExPrice = (ticker: ccxt.Ticker) => {
  return new ExPrice(
    GetPairExchange(ticker?.symbol) ?? '',
    ticker?.close ?? 0,
    ticker?.low ?? 0,
    ticker?.quoteVolume ?? 0,
    ticker?.last ?? 0,
    ticker?.baseVolume ?? 0,
    ticker?.bid ?? 0,
    ticker?.ask ?? 0
  );
};
export const tickersResult = async (
  exchangeName: ccxt.Exchange,
  resultAPI: APIResult<ExPrice[]>
) => {
  const tickers = await exchangeName.fetchTickers();

  // await exchangeName.loadMarkets ();
  // const request = {
  //     // 'currency': 'USD',
  // };
  // const response = await exchangeName.publicGetExchangeRates (exchangeName.extend ({}, {}));
  // //
  // //     {
  // //         "data":{
  // //             "currency":"USD",
  // //             "rates":{
  // //                 "AED":"3.6731",
  // //                 "AFN":"103.163942",
  // //                 "ALL":"106.973038",
  // //             }
  // //         }
  // //     }
  // //
  // const data = exchangeName.safeValue (response, 'data', {});
  // // console.log(data);
  // const rates = exchangeName.safeValue (data, 'rates', {});
  // const quoteId = exchangeName.safeString (data, 'currency');
  // const result = {};
  // const baseIds = Object.keys (rates);
  // const delimiter = '-';
  // for (let i = 0; i < baseIds.length; i++) {
  //     const baseId = baseIds[i];
  //     const marketId = baseId + delimiter + quoteId;
  //     const market = exchangeName.safeMarket (marketId, undefined, delimiter);
  //     const symbol = market['symbol'];
  //     result[symbol] = exchangeName.parseTicker (rates[baseId], market);
  //     console.log(result[symbol]);
  // }
  



  if (tickers == null)
    return resultError(resultAPI, 'tickers of GetPrices is null or undefined');
  resultAPI.Result = [];
  resultAPI.Success = true;
  for (const p in tickers) {
    const ticker = tickers[p];
    resultAPI.Result.push(tickerCCXTtoExPrice(ticker));
  }
  return resultAPI;
};

/************************************** TICKER RESULT ********************************************/
export const tickerResult = async (
  exchangeName: ccxt.Exchange,
  resultAPI: APIResult<ExPrice>,
  pair: string
) => {
  let ticker = await exchangeName.fetchTicker(pair);
  if (ticker == null)
    return resultError(resultAPI, 'ticker of GetPrice is null or undefined');
  resultAPI.Success = true;
  resultAPI.Result = tickerCCXTtoExPrice(ticker);
  return resultAPI;
};

/************************************** CANCEL ORDER  ********************************************/
export const cancelOrder = async (
  exchangeName: ccxt.Exchange,
  resultAPI: APIResult<string>,
  pair: string,
  orderId: string
) => {
  let cancelOrder = await exchangeName.cancelOrder(orderId, pair);

  if (cancelOrder == null)
    return resultError(resultAPI, 'cancelOrder is null or undefined');
  resultAPI.Success = true;
  resultAPI.Result =
    'The pair: ' +
    pair +
    ' of orderId: ' +
    orderId +
    ' was cancelled successfully';
  return resultAPI;
};

/************************************** GET ORDER  ********************************************/
export const getOrder = async (
  exchangeName: ccxt.Exchange,
  resultAPI: APIResult<ExOrder>,
  pair: string,
  orderId: string
) => {
  let order = await exchangeName.fetchOrder(orderId, pair);
  const datas = order;
  if (datas == null)
    return resultError(resultAPI, 'datas of GetOrder is null or undefined');
  resultAPI.Success = true;
  resultAPI.Result = new ExOrder(
    GetPairExchange(pair) ?? '',
    datas?.id ?? '',
    datas?.average ?? datas?.price ?? 0,
    datas?.amount ?? 0,
    datas?.remaining ?? 0,
    getStatus(datas?.status) ?? null,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    datas?.side === 'buy' ? OrderSide.Buy : OrderSide.Sell ?? null,
    getOrderType(datas?.type) ?? null
  );
  return resultAPI;
};

/************************************** PLACE ORDER  ********************************************/
export const placeOrder = async (
  exchangeOrder: ccxt.Order,
  resultAPI: APIResult<ExPlaceOrder>
) => {
  const datas = exchangeOrder;
  if (datas == null)
    return resultError(resultAPI, 'datas of PlaceOrder is null or undefined');
  resultAPI.Success = true;
  resultAPI.Result = new ExPlaceOrder(
    datas?.id ?? '',
    datas?.average ?? datas?.price ?? 0
  );
  return resultAPI;
};

/************************************** CALCULATE PRECISION ********************************************/
export const calculatePrecision = (precision: number, active: Boolean) => {
  if (active === true) {
    if (precision == 0) return precision;
    if (precision >= 1) {
      let newP = 1;
      for (let i = 0; i < precision; i++)
        newP /= 10;
      return Number(newP.toPrecision(precision));
    }
    return precision;
  }
  else
    return null
}
