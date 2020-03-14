import { displayEntries } from "./EntriesDisplay.js";
import { calcTotal } from "./PortfolioManager.js";

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

export function getUserCurrency() {
  const currencySelectForm = document.getElementById("user-currency-select");
  let chosenCurrency =
    currencySelectForm.options[currencySelectForm.selectedIndex].value;
  return chosenCurrency;
}

export async function updateCurrency(
  prevCurrency,
  newCurrency,
  entries,
  entriesSection
) {
  const apiKey = "95dc8ec4575cdd938d14";

  // get conversion rate from currency API
  let data = await fetch(
    `https://free.currconv.com/api/v7/convert?q=${prevCurrency}_${newCurrency}&compact=ultra&apiKey=${apiKey}`
  );
  let dataJSON = await data.json();

  let conversionRate = dataJSON[`${prevCurrency}_${newCurrency}`];
  console.log(conversionRate);

  // convert all relevant entry values to new currency
  entries.forEach(entry => {
    entry.buyPrice = Math.round(entry.buyPrice * conversionRate);
    entry.buyTotalValue = Math.round(entry.buyTotalValue * conversionRate);
    entry.currPrice = Math.round(entry.currPrice * conversionRate);
    entry.currTotalValue = Math.round(entry.currTotalValue * conversionRate);
    entry.delta = Math.round(entry.delta * conversionRate);
  });

  displayEntries(entries);
  calcTotal(entries, newCurrency);
}
