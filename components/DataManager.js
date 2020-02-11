import { displayEntries } from "./Display.js";

let formCoin = document.getElementById("coin");
let formAmount = document.getElementById("amount");
let formBuyPrice = document.getElementById("buyPrice");

export async function getEntryData(currency) {
  let idNum = Math.round(Date.now() + Math.random());

  let id = idNum.toString();
  let coin = formCoin.value;
  let amount = formAmount.value;
  let buyPrice = formBuyPrice.value;

  let currPriceData = await getCurrPrice(coin, currency);
  let currPriceJSON = await currPriceData.json();
  let currPrice = currPriceJSON[currency];

  let buyTotalValue = Math.round(amount * buyPrice);
  let currTotalValue = Math.round(amount * currPrice);

  let delta = Math.round(currTotalValue - buyTotalValue);
  let deltaFraction = delta / buyTotalValue;
  let deltaPerc = deltaFraction * 100;

  let newEntry = {
    id: id,
    coin: coin,
    amount: amount,
    buyPrice: buyPrice,
    buyTotalValue: buyTotalValue,
    currPrice: currPrice,
    currTotalValue: currTotalValue,
    delta: delta,
    deltaPerc: deltaPerc
  };

  return newEntry;
}

export async function updatePortfolio(entries, entriesSection, currency) {
  for (var i = 0; i < entries.length; i++) {
    let currPriceData = await getCurrPrice(entries[i].coin, currency);
    let currPriceJSON = await currPriceData.json();
    let currPrice = currPriceJSON[currency];

    let currTotalValue = Math.round(entries[i].amount * entries[i].currPrice);

    let delta = Math.round(
      entries[i].currTotalValue - entries[i].buyTotalValue
    );
    let deltaFraction = entries[i].delta / entries[i].buyTotalValue;
    let deltaPerc = deltaFraction * 100;

    entries[i].currPrice = currPrice;
    entries[i].currTotalValue = currTotalValue;
    entries[i].delta = delta;
    entries[i].deltaPerc = deltaPerc;
  }

  displayEntries(entries, entriesSection, currency);
  updateEntries(entries);
}

export function updateEntries(entries) {
  console.log(entries);
  return entries;
}

async function getCurrPrice(coin, currency) {
  let currPrice = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=${currency}`
  );
  return currPrice;
}

export function getCurrencySymbol(currency) {
  let currencySymbol = "";
  switch (currency) {
    case "USD":
      currencySymbol = "$";
      break;
    case "GBP":
      currencySymbol = "£";
      break;
    case "EUR":
      currencySymbol = "€";
      break;
  }
  return currencySymbol;
}

export function clearForm() {
  formCoin.value = "";
  formAmount.value = "";
  formBuyPrice.value = "";
}
