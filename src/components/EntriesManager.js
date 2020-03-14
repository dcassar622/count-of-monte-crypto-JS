import { displayTotals } from "./EntriesDisplay.js";

export const completeEntries = async (dbEntries, currency) => {
  // create array which will be returned as a completed set of entries later
  let entries = [];

  // take in hardwired db info and fill out a full entry based on dynamic calculations
  for (let i = 0; i < dbEntries.length; i++) {
    // the total value of coin amount bought originally
    let buyTotalValue = (dbEntries[i].buyPrice * dbEntries[i].amount).toFixed(
      2
    );

    // the current coin price and total value
    let currPriceData = await getCurrPrice(dbEntries[i].coin, currency);
    let currPriceJSON = await currPriceData.json();
    let currPrice = currPriceJSON[currency].toFixed(2);
    let currTotalValue = (dbEntries[i].amount * currPrice).toFixed(2);

    // the difference between the original buy and current vlaues
    let delta = (currTotalValue - buyTotalValue).toFixed(2);
    let deltaFraction = delta / buyTotalValue;
    let deltaPerc = (deltaFraction * 100).toFixed(2);

    /* ----- CREATE NEW COMPLETED ENTRY ----- */
    let newEntry = {
      // static values
      id: dbEntries[i].id,
      date: dbEntries[i].date,
      coin: dbEntries[i].coin,
      coinName: dbEntries[i].coinName,
      amount: dbEntries[i].amount,
      buyPrice: dbEntries[i].buyPrice,
      // dynamic values
      buyTotalValue: buyTotalValue,
      currPrice: currPrice,
      currTotalValue: currTotalValue,
      delta: delta,
      deltaPerc: deltaPerc
    };

    // add entry to completed entries array
    entries.push(newEntry);
  }
  return entries;
};

// gets the current price for requested coin from Cryptocompare API
async function getCurrPrice(coin, currency) {
  let currPrice = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=${currency}`
  );
  return currPrice;
}

/* ----- Calculate totals from all entries and display them ----- */
export function calcTotal(entries, currency) {
  let totalBuyValue = 0;
  let totalCurrValue = 0;
  let totalDelta = 0;
  let totalDeltaPerc = 0;

  entries.forEach(entry => {
    totalBuyValue += parseFloat(entry.buyTotalValue);
    totalCurrValue += parseFloat(entry.currTotalValue);
  });

  totalBuyValue = totalBuyValue.toFixed(2);
  totalCurrValue = totalCurrValue.toFixed(2);

  totalDelta = (totalCurrValue - totalBuyValue).toFixed(2);
  totalDeltaPerc = ((totalDelta / totalBuyValue) * 100).toFixed(2);
  if (entries.length > 0) {
    displayTotals(
      totalBuyValue,
      totalCurrValue,
      totalDelta,
      totalDeltaPerc,
      currency
    );
  } // if there are no entries
  else clearTotals();
}

function clearTotals() {
  let totalsArea = document.getElementById("totals-container");
  totalsArea.innerHTML = "";
}
