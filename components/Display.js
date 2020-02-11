import { getCurrencySymbol } from "./DataManager.js";

export function displayEntries(entries, entriesSection, currency) {
  let currencySymbol = getCurrencySymbol(currency);
  entriesSection.innerHTML = "";

  entries.forEach(entry => {
    let entryContainer = document.createElement("div");
    entryContainer.id = entry.id;
    entryContainer.className = "entry-container";

    let entryCoin = document.createElement("p");
    entryCoin.className = "entry-coin grid-cell";
    entryCoin.innerHTML = entry.coin;

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
    } else if (entry.deltaPerc < 0) {
      entryDeltaPerc.className = "entry-delta-perc loss grid-cell";
    }
    entryDeltaPerc.innerHTML = `${entry.deltaPerc}%`;

    let entryDelBtn = document.createElement("button");
    entryDelBtn.className = "entry-del-btn";
    entryDelBtn.innerHTML = "Remove";

    entryContainer.appendChild(entryCoin);
    entryContainer.appendChild(entryAmount);
    entryContainer.appendChild(entryBuyDiv);
    entryContainer.appendChild(entryCurrDiv);
    entryContainer.appendChild(entryDelta);
    entryContainer.appendChild(entryDeltaPerc);
    entryContainer.appendChild(entryDelBtn);

    entriesSection.appendChild(entryContainer);
  });
}
