import { displayEntries } from "./components/PortfolioDisplay.js";
import { setupEventListeners } from "./components/EventListeners.js";
import { updatePortfolio, calcTotal } from "./components/PortfolioManager.js";
import {
  getUserCurrency,
  updateCurrency
} from "./components/CurrencyManager.js";
import {
  clearForm,
  getEntryData,
  getAllCoins,
  setupCoinInput
} from "./components/FormManager.js";
import {
  setupVolumeChart,
  setupCoinChart,
  removeCoinChart
} from "./components/Charts.js";

let overlay = document.getElementById("overlay");
overlay.className = "invisible";

const addEntryBtn = document.getElementById("add-entry-btn");
const formContainer = document.getElementById("form-container");
let formHidden = true;
let coinChartHidden = true;

const submitformBtn = document.getElementById("submit-form-btn");
let coinSearchResults = document.getElementById("autocomplete-results");
const currencySelectForm = document.getElementById("user-currency-select");
const refreshBtn = document.getElementById("refresh-btn");

const entriesSection = document.getElementById("entries-container");
let amountAndBuy = document.getElementById("amount-and-buy");
let submitBtn = document.getElementById("submit-form-btn");

let entries = [];
/*let currency = getUserCurrency();
let prevCurrency = currency;*/

getAllCoins();

//setupDemo();
//calcTotal(entries, currency);
function setupDemo() {
  let demoEntry1 = {
    id: 1,
    coin: "BTC",
    coinName: "Bitcoin",
    amount: 0.5,
    buyPrice: 6000,
    buyTotalValue: 3000,
    currPrice: 9000,
    currTotalValue: 4500,
    delta: 1500,
    deltaPerc: 50
  };
  let demoEntry2 = {
    id: 2,
    coin: "ETH",
    coinName: "Ethereum",
    amount: 25,
    buyPrice: 200,
    buyTotalValue: 500,
    currPrice: 150,
    currTotalValue: 350,
    delta: -150,
    deltaPerc: -30
  };

  entries.push(demoEntry1);
  entries.push(demoEntry2);
  displayEntries(entries, entriesSection, currency);
}

/* ----- OPEN/SUBMIT FORM ----- 

addEntryBtn.addEventListener("click", () => {
  clearForm();
  if (formHidden === true) {
    coinSearchResults.className = "invisible";
    overlay.className = "visible";
    formContainer.className = "visible";
    amountAndBuy.className = "visible";
    submitBtn.className = "visible";
    addEntryBtn.innerHTML = "Close Form";
    setupCoinInput();
    formHidden = false;
  } else if (formHidden === false) {
    overlay.className = "invisible";
    formContainer.className = "invisible";
    addEntryBtn.innerHTML = "Add Entry";
    amountAndBuy.className = "invisible";
    submitBtn.className = "invisible";
    formHidden = true;
  }
});

submitformBtn.addEventListener("click", async event => {
  event.preventDefault();
  overlay.className = "invisible";
  formContainer.className = "invisible";
  amountAndBuy.className = "invisible";
  submitBtn.className = "invisible";

  let newEntry = await getEntryData(currency);
  entries.push(newEntry);
  console.log(newEntry);
  displayEntries(entries, entriesSection, currency);
  calcTotal(entries, currency);
  addEntryBtn.innerHTML = "Add Entry";
  document.getElementById("entry-form").reset();
  //clearForm();
});

/* ----- CHANGE CURRENCY ----- 

currencySelectForm.addEventListener("click", () => {
  prevCurrency = currency;
});

currencySelectForm.addEventListener("change", () => {
  currency = getUserCurrency();
  updateCurrency(prevCurrency, currency, entries, entriesSection);
  calcTotal(entries, currency);
  displayEntries(entries, entriesSection, currency);
});

/* ----- UPDATE PORTFOLIO ----- 
refreshBtn.addEventListener("click", async () => {
  updatePortfolio(entries, entriesSection, currency);
  calcTotal(entries, currency);
});

entriesSection.addEventListener("click", event => {
  let entryDivId = event.target.parentNode.id;
  if (event.target.className == "entry-del-btn") {
    for (var i = 0; i < entries.length; i++) {
      if (entryDivId === entries[i].id) {
        entries.splice(i, 1);
      }
    }
    displayEntries(entries, entriesSection, currency);
    calcTotal(entries, currency);
  }
});

/* ----- SHOW/HIDE COIN CHART ----- 

entriesSection.addEventListener("click", event => {
  let entryDivId = event.target.parentNode.id;
  if (event.target.className == "show-chart-btn") {
    if (coinChartHidden === true) {
      overlay.className = "visible";
      for (var i = 0; i < entries.length; i++) {
        if (entryDivId == entries[i].id) {
          let coin = entries[i].coin;
          setupCoinChart(coin, currency);
        }
        coinChartHidden = false;
      }
    } else if (coinChartHidden === false) {
      overlay.className = "invisible";
      removeCoinChart();
      coinChartHidden = true;
    }
  }
});

window.addEventListener("click", event => {
  if (
    event.target.className !== "show-chart-btn" &&
    coinChartHidden === false
  ) {
    overlay.className = "invisible";
    removeCoinChart();
    coinChartHidden = true;
  }
});

*/
