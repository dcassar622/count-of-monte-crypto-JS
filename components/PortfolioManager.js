import {
  displayEntries,
  displayTotals,
  clearTotals
} from "./EntriesDisplay.js";

export async function updatePortfolio(entries, entriesSection, currency) {
  for (var i = 0; i < entries.length; i++) {
    let currPriceData = await getCurrPrice(entries[i].coin, currency);
    let currPriceJSON = await currPriceData.json();
    let currPrice = Math.round(currPriceJSON[currency]);

    let currTotalValue = Math.round(entries[i].amount * entries[i].currPrice);

    let delta = Math.round(
      entries[i].currTotalValue - entries[i].buyTotalValue
    );
    let deltaFraction = entries[i].delta / entries[i].buyTotalValue;
    let deltaPerc = Math.round(deltaFraction * 100);

    entries[i].currPrice = currPrice;
    entries[i].currTotalValue = currTotalValue;
    entries[i].delta = delta;
    entries[i].deltaPerc = deltaPerc;
  }
  displayEntries(entries);
  updateEntries(entries);
}

export function updateEntries(entries) {
  return entries;
}

export async function getCurrPrice(coin) {
  console.log(coin);
  let currPrice = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=USD`
  );
  return currPrice;
}

export function calcTotal(entries) {
  let totalBuyValue = 0;
  let totalCurrValue = 0;
  let totalDelta = 0;
  let totalDeltaPerc = 0;

  entries.forEach(entry => {
    totalBuyValue += entry.buyTotalValue;
    totalCurrValue += entry.currTotalValue;
  });

  totalDelta = totalCurrValue - totalBuyValue;
  totalDeltaPerc = Math.round((totalDelta / totalBuyValue) * 100);
  if (entries.length > 0) {
    displayTotals(totalBuyValue, totalCurrValue, totalDelta, totalDeltaPerc);
  } else clearTotals();
}
