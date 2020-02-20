import { getCurrencySymbol } from "./CurrencyManager.js";

const entriesHeader = document.getElementById("entries-header-container");
const entriesSection = document.getElementById("entries-container");

export function displayEntries(entries, currency) {
  if (entries.length) {
    // display entries
    let currencySymbol = getCurrencySymbol(currency);
    entriesSection.innerHTML = "";

    entries.forEach(entry => {
      let entryContainer = document.createElement("div");
      entryContainer.id = entry.id;
      entryContainer.className = "entry-container";

      let entryCoin = document.createElement("p");
      entryCoin.className = "entry-coin";
      entryCoin.innerHTML = entry.coin;

      let entryCoinName = document.createElement("p");
      entryCoinName.className = "entry-coin-name";
      entryCoinName.innerHTML = entry.coinName;

      let entryCoinDiv = document.createElement("div");
      entryCoinDiv.className = "entry-coin-div grid-cell";
      entryCoinDiv.appendChild(entryCoin);
      entryCoinDiv.appendChild(entryCoinName);

      let entryAmount = document.createElement("p");
      entryAmount.className = "entry-amount grid-cell";
      entryAmount.innerHTML = entry.amount;

      let entryBuyPrice = document.createElement("p");
      entryBuyPrice.className = "entry-buy-price";
      entryBuyPrice.innerHTML = `${currencySymbol}${entry.buyPrice}`;

      let entryBuyTotalValue = document.createElement("p");
      entryBuyTotalValue.className = "entry-buy-total-value";
      entryBuyTotalValue.innerHTML = `${currencySymbol}${entry.buyTotalValue}`;

      let entryBuyDiv = document.createElement("div");
      entryBuyDiv.className = "entry-buy-div grid-cell";
      entryBuyDiv.appendChild(entryBuyPrice);
      entryBuyDiv.appendChild(entryBuyTotalValue);

      let entryCurrPrice = document.createElement("p");
      entryCurrPrice.className = "entry-curr-price";
      entryCurrPrice.innerHTML = `${currencySymbol}${entry.currPrice}`;

      let entryCurrTotalValue = document.createElement("p");
      entryCurrTotalValue.className = "entry-curr-total-value";
      entryCurrTotalValue.innerHTML = `${currencySymbol}${entry.currTotalValue}`;

      let entryCurrDiv = document.createElement("div");
      entryCurrDiv.className = "entry-curr-div grid-cell";
      entryCurrDiv.appendChild(entryCurrPrice);
      entryCurrDiv.appendChild(entryCurrTotalValue);

      let entryDelta = document.createElement("p");

      if (entry.delta >= 0) {
        entryDelta.className = "entry-delta profit grid-cell";
        entryDelta.innerHTML = `${currencySymbol}${entry.delta}`;
      } else if (entry.delta < 0) {
        entryDelta.className = "entry-delta loss grid-cell";
        entryDelta.innerHTML = `-${currencySymbol}${Math.abs(entry.delta)}`;
      }

      let entryDeltaPerc = document.createElement("p");
      if (entry.deltaPerc >= 0) {
        entryDeltaPerc.className = "entry-delta-perc profit grid-cell";
        entryDeltaPerc.innerHTML = `${entry.deltaPerc}% &#x2191`;
      } else if (entry.deltaPerc < 0) {
        entryDeltaPerc.className = "entry-delta-perc loss grid-cell";
        entryDeltaPerc.innerHTML = `${entry.deltaPerc}% &#x2193`;
      }

      let entryDelBtn = document.createElement("button");
      entryDelBtn.className = "entry-del-btn";
      entryDelBtn.innerHTML = "Remove";

      let showChartBtn = document.createElement("button");
      showChartBtn.className = "show-chart-btn";
      showChartBtn.setAttribute("data-toggle", "modal");
      showChartBtn.setAttribute("data-target", "#coin-chart-container");
      showChartBtn.innerHTML = "Price Chart";

      entryContainer.appendChild(entryCoinDiv);
      entryContainer.appendChild(entryAmount);
      entryContainer.appendChild(entryBuyDiv);
      entryContainer.appendChild(entryCurrDiv);
      entryContainer.appendChild(entryDelta);
      entryContainer.appendChild(entryDeltaPerc);
      entryContainer.appendChild(showChartBtn);
      entryContainer.appendChild(entryDelBtn);

      entriesSection.appendChild(entryContainer);
    });
  } else {
    console.log("empty entries");
    entriesSection.innerHTML = `
      <h3>Your Portfolio Is Empty! Add at least one coin to start building your empire :)</h3>
    `;
  }
}

export function displayTotals(buy, curr, delta, deltaPerc, currency) {
  let currencySymbol = getCurrencySymbol(currency);
  let totalsArea = document.getElementById("totals-container");
  totalsArea.innerHTML = "";

  let totalsTitle = document.createElement("p");
  totalsTitle.className = "totals-title grid-cell";
  totalsTitle.innerHTML = "Total";

  let totalsBuyValue = document.createElement("p");
  totalsBuyValue.className = "totals-buy-value grid-cell";
  totalsBuyValue.innerHTML = `${currencySymbol}${buy}`;

  let totalsCurrValue = document.createElement("p");
  totalsCurrValue.className = "totals-curr-value grid-cell";
  totalsCurrValue.innerHTML = `${currencySymbol}${curr}`;

  let totalsDelta = document.createElement("p");
  if (delta >= 0) {
    totalsDelta.className = "totals-delta grid-cell profit";
  } else {
    totalsDelta.className = "totals-delta grid-cell loss";
  }
  totalsDelta.innerHTML = `${currencySymbol}${delta}`;

  let totalsDeltaPerc = document.createElement("p");
  if (deltaPerc >= 0) {
    totalsDeltaPerc.className = "totals-delta-perc grid-cell profit";
    totalsDeltaPerc.innerHTML = `${deltaPerc}% &#x2191`;
  } else {
    totalsDeltaPerc.className = "totals-delta-perc grid-cell loss";
    totalsDeltaPerc.innerHTML = `${deltaPerc}% &#x2193`;
  }

  totalsArea.appendChild(totalsTitle);
  totalsArea.appendChild(totalsBuyValue);
  totalsArea.appendChild(totalsCurrValue);
  totalsArea.appendChild(totalsDelta);
  totalsArea.appendChild(totalsDeltaPerc);
}

export function clearTotals() {
  let totalsArea = document.getElementById("totals-container");
  totalsArea.innerHTML = "";
}
