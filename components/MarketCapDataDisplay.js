import { getCurrencySymbol } from "./CurrencyManager.js";

export function displayData(coinData, currency) {
  let marketCapSection = document.getElementById("market-cap-section");
  let currencySymbol = getCurrencySymbol(currency);

  coinData.forEach(item => {
    let tableRow = document.createElement("div");
    tableRow.className = "table-row";

    let coinName = document.createElement("p");
    coinName.className = "table-coin-name";
    coinName.innerHTML = item.name;

    let coinFullName = document.createElement("p");
    coinFullName.className = "table-coin-full-name";
    coinFullName.innerHTML = `(${item.fullName})`;

    let coinDiv = document.createElement("div");
    coinDiv.className = "coin-div grid-cell";
    coinDiv.appendChild(coinName);
    coinDiv.appendChild(coinFullName);

    let coinPrice = document.createElement("p");
    coinPrice.className = "table-coin-price grid-cell";
    coinPrice.innerHTML = `${currencySymbol} ${item.price}`;

    let coinVolume = document.createElement("p");
    coinVolume.className = "table-coin-volume grid-cell";
    coinVolume.innerHTML = `${currencySymbol} ${item.volume}`;

    let coinMarketCap = document.createElement("p");
    coinMarketCap.className = "table-coin-market-cap grid-cell";
    coinMarketCap.innerHTML = `${currencySymbol} ${item.marketCap}`;

    let coinDeltaPerc = document.createElement("p");
    if (item.deltaPerc >= 0) {
      coinDeltaPerc.className = "table-coin-delta-perc grid-cell profit";
      coinDeltaPerc.innerHTML = `${item.deltaPerc}%`;
    } else if (item.deltaPerc < 0) {
      coinDeltaPerc.className = "table-coin-delta-perc grid-cell loss";
      coinDeltaPerc.innerHTML = `-${Math.abs(item.deltaPerc)}%`;
    }

    tableRow.appendChild(coinDiv);
    tableRow.appendChild(coinPrice);
    tableRow.appendChild(coinVolume);
    tableRow.appendChild(coinMarketCap);
    tableRow.appendChild(coinDeltaPerc);

    marketCapSection.appendChild(tableRow);
  });
}
