import { displayData } from "./MarketCapDataDisplay.js";

export async function setupMarketCapData(currency) {
  // get top 10 coins by trade volume from Cryptocompare API
  let data = await fetch(
    `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${currency}`
  );
  let dataJSON = await data.json();
  let coinData = dataJSON.Data;

  let filteredCoinData = [];

  // filter relevant coin information to be shown on screen
  coinData.map(function(item, index) {
    filteredCoinData[index] = {
      name: item.CoinInfo.Name,
      fullName: item.CoinInfo.FullName,
      price: item.RAW[currency].PRICE.toFixed(2),
      volume: (item.RAW[currency].TOTALVOLUME24HTO / 1000000000).toFixed(3),
      marketCap: (item.RAW[currency].MKTCAP / 1000000000).toFixed(3),
      deltaPerc: item.RAW[currency].CHANGEPCT24HOUR.toFixed(2)
    };
  });
  displayData(filteredCoinData, currency);
}
