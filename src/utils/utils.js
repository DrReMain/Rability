import currencyJs from 'currency.js';

export const RMB = (value, symbol) => currencyJs(value, { symbol: symbol ? '￥' : '', precision: 2 }).format(true);

export const another = () => undefined;
