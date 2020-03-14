import { getCurrPrice } from "./PortfolioManager.js";

let formCoin = document.getElementById("coin");
let coinResults = document.getElementById("autocomplete-results");
let formAmount = document.getElementById("amount");
let formBuyPrice = document.getElementById("buy-price");

let amountAndBuy = document.getElementById("amount-and-buy");
let submitBtn = document.getElementById("submit-form-btn");

let coinName = "";

let coinsArray = [];

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
  let deltaPerc = Math.round(deltaFraction * 100);

  let newEntry = {
    id: id,
    coin: coin,
    coinName: coinName,
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

export async function getAllCoins() {
  let data = await fetch("https://min-api.cryptocompare.com/data/all/coinlist");
  let coinsData = await data.json();
  let coins = coinsData.Data;
  coinsArray = Object.values(coins);
}

export function setupCoinInput() {
  formCoin.addEventListener("input", () => {
    coinResults.className = "visible";
    amountAndBuy.className = "invisible";
    submitBtn.className = "invisible";
    searchCoins(formCoin.value);
  });
}

function searchCoins(searchText) {
  let matches = coinsArray.filter(coin => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return coin.CoinName.match(regex) || coin.Symbol.match(regex);
  });

  if (searchText.length === 0) {
    coinResults.innerHTML = "";
    matches = [];
    coinResults.className = "invisible";
  }

  coinResults.addEventListener("click", event => {
    amountAndBuy.className = "visible";
    submitBtn.className = "visible";
    coinResults.className = "invisible";
    matches.forEach(match => {
      if (event.target.id == match.Symbol) {
        coinName = match.CoinName;
        formCoin.value = `${match.Symbol}`;
      }
    });
  });

  let chosenMatch = 0;
  formCoin.addEventListener("keydown", event => {
    formCoin.focus();
    if (chosenMatch >= 0) {
      switch (event.which) {
        case 40:
          chosenMatch++;
          matches[chosenMatch].className = "selected";
          console.log(event.which);
          break;
        case 38:
          chosenMatch--;
          matches[chosenMatch].className = "selected";
          console.log(event.which);
          break;
        case 13:
          chosenMatch;
          break;
      }
    }
  });

  showMatches(matches);
}

function showMatches(matches) {
  if (matches.length > 0) {
    const matchesHtml = matches
      .map(
        match => `
    <div class='autocomplete-div'>
      <h4 class='autocomplete-entry' id=${match.Symbol}>${match.CoinName} (${match.Symbol}) </h4>
    </div>`
      )
      .join("");

    coinResults.innerHTML = matchesHtml;
  }
}

export function clearForm() {
  formCoin.value = "";
  coinResults.innerHTML = "";
  formAmount.value = "";
  formBuyPrice.value = "";
}
