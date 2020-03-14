/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/AutoComplete.js":
/*!****************************************!*\
  !*** ./src/components/AutoComplete.js ***!
  \****************************************/
/*! exports provided: setupAutoComplete, getCoinList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupAutoComplete", function() { return setupAutoComplete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCoinList", function() { return getCoinList; });
let coinList = [];

const setupAutoComplete = () => {
  new autoComplete({
    data: {
      // Data src [Array, Function, Async] | (REQUIRED)
      src: async () => {
        // Fetch External Data Source
        let data = await fetch(
          "https://min-api.cryptocompare.com/data/all/coinlist"
        );
        // Format data into JSON
        let coinsData = await data.json();
        // Return Fetched data
        let coins = coinsData.Data;
        coinList = Object.values(coins);
        return coinList;
      },
      key: ["CoinName", "Name"],
      cache: false
    },
    query: {
      // Query Interceptor               | (Optional)
      manipulate: query => {
        return query.replace("Name", "CoinName");
      }
    },
    sort: (a, b) => {
      // Sort rendered results ascendingly | (Optional)
      if (a.match < b.match) return -1;
      if (a.match > b.match) return 1;
      return 0;
    },
    placeHolder: "Coins...", // Place Holder text                 | (Optional)
    selector: "#coin", // Input field selector              | (Optional)
    threshold: 1, // Min. Chars length to start Engine | (Optional)
    debounce: 300, // Post duration for engine to start | (Optional)
    searchEngine: "strict", // Search Engine type/mode           | (Optional)
    resultsList: {
      // Rendered results list object      | (Optional)
      render: true,
      container: source => {
        source.setAttribute("Name", "CoinName");
      },
      destination: document.querySelector("#autocomplete-results"),
      position: "afterbegin",
      element: "ul"
    },
    maxResults: 5, // Max. number of rendered results | (Optional)
    highlight: true, // Highlight matching results      | (Optional)
    resultItem: {
      // Rendered result item            | (Optional)
      content: (data, source) => {
        source.innerHTML = data.match;
      },
      element: "li"
    },
    noResults: () => {
      // Action script on noResults      | (Optional)
      const result = document.createElement("li");
      result.setAttribute("class", "no_result");
      result.setAttribute("tabindex", "1");
      result.innerHTML = "No Results";
      document.querySelector("#autocomplete-results").appendChild(result);
    },
    onSelection: feedback => {
      // Action script onSelection event | (Optional)
      console.log(feedback.selection.value);
      document.querySelector(
        "#coin"
      ).value = `${feedback.selection.value.Name} (${feedback.selection.value.CoinName})`;
    }
  });
};

async function getCoinList() {
  let data = await fetch("https://min-api.cryptocompare.com/data/all/coinlist");
  let coinsData = await data.json();
  let coins = coinsData.Data;
  coinList = Object.values(coins);
  console.log(coinList);
}


/***/ }),

/***/ "./src/components/CRUD.js":
/*!********************************!*\
  !*** ./src/components/CRUD.js ***!
  \********************************/
/*! exports provided: setupDataOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupDataOptions", function() { return setupDataOptions; });
const setupDataOptions = (user, User) => {
  /* ADD NEW ENTRY */
  const entryForm = document.getElementById("entry-form");
  entryForm.addEventListener("submit", async event => {
    event.preventDefault();

    //calculate values from form
    let idNum = Math.round(Date.now() + Math.random());
    let id = idNum.toString();

    // calculate today's date (DD/MM/YYYY)
    let today = new Date();
    let date = `${today.getDate()}/${today.getMonth() +
      1}/${today.getFullYear()}`;

    let coinNameAll = entryForm["coin"].value;
    // get coin symbol (first three characters before space)
    let coinSymbol = coinNameAll.substr(0, coinNameAll.indexOf(" "));
    // get full coin name (characters after space)
    let coinName = coinNameAll
      .substr(coinNameAll.indexOf(" ") + 1)
      // remove brackets
      .slice(1, -1);
    console.log(coinSymbol);
    console.log(coinName);

    let amount = entryForm["amount"].value;
    let buyPrice = entryForm["buy-price"].value;

    // add new entry to database based on form values
    db.collection("users")
      .doc(user.uid)
      .collection("entries")
      .doc(id)
      .set({
        id: id,
        date: date,
        coin: coinSymbol,
        coinName: coinName,
        amount: amount,
        buyPrice: buyPrice
      })
      .then(() => {
        entryForm.reset();
      });

    $("#modal-entry").modal("hide");
  });

  /* DELETE ENTRY */
  const entriesSection = document.getElementById("entries-section");
  entriesSection.addEventListener("click", event => {
    console.log(event.target.className);
    if (event.target.className === "entry-del-btn fas fa-window-close") {
      if (confirm("You are about to delete this entry. Proceed?")) {
        db.collection("users")
          .doc(user.uid)
          .collection("entries")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              if (event.target.parentNode.id === doc.id) {
                db.collection("users")
                  .doc(user.uid)
                  .collection("entries")
                  .doc(doc.id)
                  .delete();
              }
            });
          });
      }
    }
  });

  /* UPDATE ENTRIES */
  const updateBtn = document.getElementById("update-btn");
  updateBtn.addEventListener("click", () => {
    User.renderEntries();
  });

  /* UPDATE CURRENCY */
  const currencySelector = document.getElementById("currency-selector");
  currencySelector.addEventListener("change", event => {
    let newCurrency = event.target.value;
    User.updateCurrency(newCurrency);
  });

  /* CHANGE ENTRIES ORDER */
  const orderSelector = document.getElementById("sort-order-selector");
  orderSelector.addEventListener("change", event => {
    // get user's order selection
    let sortBy = event.target.value;

    // write preference to user's file in the DB and update UI
    User.setOrder(sortBy);
    User.renderEntries();
  });
};


/***/ }),

/***/ "./src/components/Charts.js":
/*!**********************************!*\
  !*** ./src/components/Charts.js ***!
  \**********************************/
/*! exports provided: setupCoinCharts, setupVolumeChart, removeCoinChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupCoinCharts", function() { return setupCoinCharts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupVolumeChart", function() { return setupVolumeChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeCoinChart", function() { return removeCoinChart; });
/* harmony import */ var _CurrencyManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CurrencyManager.js */ "./src/components/CurrencyManager.js");


let chart = "";
let coinChartContainer = document.getElementById("coin-chart-container");
let entriesSection = document.getElementById("entries-section");
let marketCapSection = document.getElementById("market-cap-section");

function setupCoinCharts(currency, user) {
  let chosenEntry = "";
  entriesSection.addEventListener("click", event => {
    if (
      event.target.className === "show-chart-btn" ||
      event.target.className === "entry-coin"
    ) {
      if (event.target.className === "show-chart-btn")
        chosenEntry = event.target.parentNode.id;
      else if (event.target.className === "entry-coin")
        chosenEntry = event.target.parentNode.parentNode.id;

      db.collection("users")
        .doc(user.uid)
        .collection("entries")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (chosenEntry === doc.id) {
              let chosenCoin = doc.data().coin;
              setupCoinChart(chosenCoin, currency);
            }
          });
        });
    }
  });

  marketCapSection.addEventListener("click", event => {
    if (event.target.className === "table-coin-name") {
      setupCoinChart(event.target.innerHTML, currency);
    }
  });
}

async function setupVolumeChart(currency) {
  let currencySymbol = Object(_CurrencyManager_js__WEBPACK_IMPORTED_MODULE_0__["getCurrencySymbol"])(currency);

  let volData = await fetch(
    `https://min-api.cryptocompare.com/data/exchange/histohour?tsym=${currency}&limit=168`
  );
  let volJSON = await volData.json();
  let volume = volJSON.Data;

  let volumeAmount = [];
  volume.map(function(item, index) {
    volumeAmount[index] = (item.volume / 1000000000).toFixed(2);
  });

  let volumeTime = [];
  volume.map(function(item, index) {
    let ms = item.time;
    let time = new Date(ms);
    let hour = time.getDay();
    volumeTime[index] = hour;
  });

  let ctx = document.getElementById("vol-chart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: volumeTime,
      datasets: [
        {
          label: `Crypto Market Vol/B --- ${currencySymbol}${currency} (7 days) `,
          data: volumeAmount,
          backgroundColor: "rgba(50, 200, 132, 0.2)",
          borderColor: "white",
          pointBackgroundColor: "#C0C0C0",
          borderWidth: 1,
          fill: true
        }
      ]
    },
    options: {
      hover: {
        mode: "nearest",
        intersect: true
      },
      legend: {
        labels: {
          fontColor: "white",
          fontSize: 18
        }
      },
      elements: {
        point: {
          radius: 0
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
              color: "white"
            },
            display: false,
            scaleLabel: {
              display: false,
              labelString: ""
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              drawOnChartArea: true,
              color: "#white"
            },
            ticks: {
              beginAtZero: false
              //reverse: true
            }
          }
        ]
      }
    }
  });
}

async function setupCoinChart(coin, currency) {
  let data = await fetch(
    `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${coin}&tsym=${currency}&limit=168`
  );
  let coinJSON = await data.json();
  let coinData = await coinJSON.Data.Data;

  let coinPrices = [];
  coinData.map(function(item, index) {
    coinPrices[index] = item.open;
  });

  let priceTime = [];
  coinData.map(function(item, index) {
    let time = new Date(item.time);
    priceTime[index] = time.getHours();
  });

  let currencySymbol = Object(_CurrencyManager_js__WEBPACK_IMPORTED_MODULE_0__["getCurrencySymbol"])(currency);

  let coinChart = document.getElementById("coin-chart").getContext("2d");
  chart = new Chart(coinChart, {
    type: "line",
    data: {
      labels: priceTime,
      datasets: [
        {
          label: `${coin} / ${currencySymbol} ${currency}`,
          data: coinPrices,
          //backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: "white",
          pointBackgroundColor: "#C0C0C0",
          borderWidth: 2,
          fill: false
        }
      ]
    },
    options: {
      hover: {
        mode: "nearest",
        intersect: true
      },
      legend: {
        labels: {
          fontColor: "white",
          fontSize: 18
        }
      },
      elements: {
        point: {
          radius: 0
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
              color: "#C0C0C0"
            },
            display: false,
            scaleLabel: {
              display: false,
              labelString: ""
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              drawOnChartArea: true,
              color: "#C0C0C0"
            },
            ticks: {
              beginAtZero: false
              //reverse: true
            }
          }
        ]
      }
    }
  });
}

function removeCoinChart() {
  coinChartContainer.style.backgroundColor = "";
  chart.destroy();
}


/***/ }),

/***/ "./src/components/CurrencyManager.js":
/*!*******************************************!*\
  !*** ./src/components/CurrencyManager.js ***!
  \*******************************************/
/*! exports provided: getCurrencySymbol, getUserCurrency, updateCurrency */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrencySymbol", function() { return getCurrencySymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserCurrency", function() { return getUserCurrency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCurrency", function() { return updateCurrency; });
/* harmony import */ var _EntriesDisplay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntriesDisplay.js */ "./src/components/EntriesDisplay.js");
/* harmony import */ var _PortfolioManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PortfolioManager.js */ "./src/components/PortfolioManager.js");



function getCurrencySymbol(currency) {
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

function getUserCurrency() {
  const currencySelectForm = document.getElementById("user-currency-select");
  let chosenCurrency =
    currencySelectForm.options[currencySelectForm.selectedIndex].value;
  return chosenCurrency;
}

async function updateCurrency(
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

  Object(_EntriesDisplay_js__WEBPACK_IMPORTED_MODULE_0__["displayEntries"])(entries);
  Object(_PortfolioManager_js__WEBPACK_IMPORTED_MODULE_1__["calcTotal"])(entries, newCurrency);
}


/***/ }),

/***/ "./src/components/EntriesDisplay.js":
/*!******************************************!*\
  !*** ./src/components/EntriesDisplay.js ***!
  \******************************************/
/*! exports provided: displayEntries, displayTotals, clearTotals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayEntries", function() { return displayEntries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayTotals", function() { return displayTotals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearTotals", function() { return clearTotals; });
/* harmony import */ var _CurrencyManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CurrencyManager.js */ "./src/components/CurrencyManager.js");


const entriesHeader = document.getElementById("entries-header-container");
const entriesSection = document.getElementById("entries-container");

function displayEntries(entries, currency) {
  if (entries.length) {
    // display entries
    let currencySymbol = Object(_CurrencyManager_js__WEBPACK_IMPORTED_MODULE_0__["getCurrencySymbol"])(currency);
    entriesSection.innerHTML = "";

    entries.forEach(entry => {
      let entryContainer = document.createElement("div");
      entryContainer.id = entry.id;
      entryContainer.className = "entry-container";

      let entryDate = document.createElement("p");
      entryDate.className = "entry-date";
      entryDate.innerHTML = entry.date;

      let entryCoin = document.createElement("a");
      entryCoin.className = "entry-coin";
      entryCoin.setAttribute("data-toggle", "modal");
      entryCoin.setAttribute("href", "#coin-chart-container");
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

      let entryDelBtn = document.createElement("i");
      entryDelBtn.className = `entry-del-btn fas fa-window-close`;

      let showChartBtn = document.createElement("button");
      showChartBtn.className = "show-chart-btn";
      showChartBtn.setAttribute("data-toggle", "modal");
      showChartBtn.setAttribute("data-target", "#coin-chart-container");
      showChartBtn.innerHTML = "Price Chart";

      entryContainer.appendChild(entryDate);
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

function displayTotals(buy, curr, delta, deltaPerc, currency) {
  let currencySymbol = Object(_CurrencyManager_js__WEBPACK_IMPORTED_MODULE_0__["getCurrencySymbol"])(currency);
  let totalsArea = document.getElementById("totals-container");
  totalsArea.innerHTML = "";

  let totalsTitle = document.createElement("p");
  totalsTitle.className = "totals-title grid-cell";
  totalsTitle.innerHTML = "Total";

  let totalsBuyValue = document.createElement("p");
  totalsBuyValue.className = "totals-buy-value grid-cell";
  totalsBuyValue.innerHTML = `${currencySymbol}${buy}<br><span class='small'>(buy value)<span>`;

  let totalsCurrValue = document.createElement("p");
  totalsCurrValue.className = "totals-curr-value grid-cell";
  totalsCurrValue.innerHTML = `${currencySymbol}${curr}<br><span class='small'>(current value)<span>`;

  let totalsDelta = document.createElement("p");
  if (delta >= 0) {
    totalsDelta.className = "totals-delta grid-cell profit";
  } else {
    totalsDelta.className = "totals-delta grid-cell loss";
  }
  totalsDelta.innerHTML = `${currencySymbol}${delta}<br><span class='small'>(P/L)<span>`;

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

function clearTotals() {
  let totalsArea = document.getElementById("totals-container");
  totalsArea.innerHTML = "";
}


/***/ }),

/***/ "./src/components/EntriesManager.js":
/*!******************************************!*\
  !*** ./src/components/EntriesManager.js ***!
  \******************************************/
/*! exports provided: completeEntries, calcTotal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "completeEntries", function() { return completeEntries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcTotal", function() { return calcTotal; });
/* harmony import */ var _EntriesDisplay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntriesDisplay.js */ "./src/components/EntriesDisplay.js");


const completeEntries = async (dbEntries, currency) => {
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
function calcTotal(entries, currency) {
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
    Object(_EntriesDisplay_js__WEBPACK_IMPORTED_MODULE_0__["displayTotals"])(
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


/***/ }),

/***/ "./src/components/MarketCapData.js":
/*!*****************************************!*\
  !*** ./src/components/MarketCapData.js ***!
  \*****************************************/
/*! exports provided: setupMarketCapData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupMarketCapData", function() { return setupMarketCapData; });
/* harmony import */ var _MarketCapDataDisplay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MarketCapDataDisplay.js */ "./src/components/MarketCapDataDisplay.js");


async function setupMarketCapData(currency) {
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
  Object(_MarketCapDataDisplay_js__WEBPACK_IMPORTED_MODULE_0__["displayData"])(filteredCoinData, currency);
}


/***/ }),

/***/ "./src/components/MarketCapDataDisplay.js":
/*!************************************************!*\
  !*** ./src/components/MarketCapDataDisplay.js ***!
  \************************************************/
/*! exports provided: displayData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayData", function() { return displayData; });
/* harmony import */ var _CurrencyManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CurrencyManager.js */ "./src/components/CurrencyManager.js");


// show data related to top 10 trading crypto coins
function displayData(coinData, currency) {
  let marketCapSection = document.getElementById("market-cap-section");
  let currencySymbol = Object(_CurrencyManager_js__WEBPACK_IMPORTED_MODULE_0__["getCurrencySymbol"])(currency);

  coinData.forEach(item => {
    let tableRow = document.createElement("div");
    tableRow.className = "table-row";

    let coinName = document.createElement("a");
    coinName.className = "table-coin-name";
    coinName.setAttribute("data-toggle", "modal");
    coinName.setAttribute("href", "#coin-chart-container");
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
    coinVolume.innerHTML = `${currencySymbol} ${item.volume} B`;

    let coinMarketCap = document.createElement("p");
    coinMarketCap.className = "table-coin-market-cap grid-cell";
    coinMarketCap.innerHTML = `${currencySymbol} ${item.marketCap} B`;

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


/***/ }),

/***/ "./src/components/NewsFeedData.js":
/*!****************************************!*\
  !*** ./src/components/NewsFeedData.js ***!
  \****************************************/
/*! exports provided: setupNewsFeed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupNewsFeed", function() { return setupNewsFeed; });
/* harmony import */ var _NewsFeedDisplay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewsFeedDisplay.js */ "./src/components/NewsFeedDisplay.js");


async function setupNewsFeed() {
  let dataAPI = await fetch(
    "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
  );
  let dataJSON = await dataAPI.json();
  let newsFeedItems = dataJSON.Data;

  Object(_NewsFeedDisplay_js__WEBPACK_IMPORTED_MODULE_0__["displayNewsFeed"])(newsFeedItems);
}


/***/ }),

/***/ "./src/components/NewsFeedDisplay.js":
/*!*******************************************!*\
  !*** ./src/components/NewsFeedDisplay.js ***!
  \*******************************************/
/*! exports provided: displayNewsFeed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayNewsFeed", function() { return displayNewsFeed; });
let newsFeedArea = document.getElementById("news-area");

function displayNewsFeed(items) {
  // news items
  items.forEach(item => {
    let newsItemDiv = document.createElement("div");
    newsItemDiv.className = "news-item-div";

    let title = document.createElement("h4");
    title.className = "news-title";
    title.innerHTML = item.title;

    let image = document.createElement("img");
    image.className = "news-image";
    image.src = item.imageurl;

    let body = document.createElement("p");
    body.className = "news-body";
    body.innerHTML = item.body;

    let url = document.createElement("a");
    url.className = "news-url";
    url.innerHTML = item.url;
    url.href = item.url;
    url.target = "_blank";

    newsItemDiv.appendChild(title);
    newsItemDiv.appendChild(image);
    newsItemDiv.appendChild(body);
    newsItemDiv.appendChild(url);

    newsFeedArea.appendChild(newsItemDiv);
  });
}


/***/ }),

/***/ "./src/components/PortfolioManager.js":
/*!********************************************!*\
  !*** ./src/components/PortfolioManager.js ***!
  \********************************************/
/*! exports provided: updatePortfolio, updateEntries, getCurrPrice, calcTotal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePortfolio", function() { return updatePortfolio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntries", function() { return updateEntries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrPrice", function() { return getCurrPrice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcTotal", function() { return calcTotal; });
/* harmony import */ var _EntriesDisplay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntriesDisplay.js */ "./src/components/EntriesDisplay.js");


async function updatePortfolio(entries, entriesSection, currency) {
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
  Object(_EntriesDisplay_js__WEBPACK_IMPORTED_MODULE_0__["displayEntries"])(entries);
  updateEntries(entries);
}

function updateEntries(entries) {
  return entries;
}

async function getCurrPrice(coin) {
  console.log(coin);
  let currPrice = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=USD`
  );
  return currPrice;
}

function calcTotal(entries) {
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
    Object(_EntriesDisplay_js__WEBPACK_IMPORTED_MODULE_0__["displayTotals"])(totalBuyValue, totalCurrValue, totalDelta, totalDeltaPerc);
  } else Object(_EntriesDisplay_js__WEBPACK_IMPORTED_MODULE_0__["clearTotals"])();
}


/***/ }),

/***/ "./src/components/UI.js":
/*!******************************!*\
  !*** ./src/components/UI.js ***!
  \******************************/
/*! exports provided: setupUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupUI", function() { return setupUI; });
/* harmony import */ var _Charts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Charts.js */ "./src/components/Charts.js");
/* harmony import */ var _MarketCapData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MarketCapData.js */ "./src/components/MarketCapData.js");
/* harmony import */ var _components_NewsFeedData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/NewsFeedData.js */ "./src/components/NewsFeedData.js");




const loggedInLinks = document.querySelectorAll(".logged-in");
const loggedOutLinks = document.querySelectorAll(".logged-out");

let loginMessage = document.getElementById("login-message-section");
const entriesSection = document.getElementById("entries-section");
const volChartSection = document.getElementById("vol-chart-section");
const marketCapSection = document.getElementById("market-cap-section");

const setupUI = (user, currency, username) => {
  // toggle nav links depending on whether user is logged in or not
  if (user) {
    loginMessage.className = "invisible";

    loggedInLinks.forEach(link => {
      link.style.display = "block";
    });
    loggedOutLinks.forEach(link => {
      link.style.display = "none";
    });

    let usernameArea = document.getElementById("welcome-message");
    let date = new Date();
    let hour = date.getHours();
    let greeting = "";

    if (hour < 12) greeting = "Good Morning";
    else if (hour > 12 && hour < 18) greeting = "Good Afternoon";
    else if (hour > 18) greeting = "Good Evening";

    usernameArea.innerHTML = `${greeting}, ${username}`;

    Object(_Charts_js__WEBPACK_IMPORTED_MODULE_0__["setupVolumeChart"])(currency);
    Object(_Charts_js__WEBPACK_IMPORTED_MODULE_0__["setupCoinCharts"])(currency, user);
    Object(_components_NewsFeedData_js__WEBPACK_IMPORTED_MODULE_2__["setupNewsFeed"])();
    Object(_MarketCapData_js__WEBPACK_IMPORTED_MODULE_1__["setupMarketCapData"])(currency);
  } else {
    // if user logged out
    loggedInLinks.forEach(link => {
      link.style.display = "none";
    });
    loggedOutLinks.forEach(link => {
      link.style.display = "block";
    });

    // clear data areas
    entriesSection.innerHTML = "";
    volChartSection.innerHTML = "";
    marketCapSection.innerHTML = "";
  }
};


/***/ }),

/***/ "./src/components/User.js":
/*!********************************!*\
  !*** ./src/components/User.js ***!
  \********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony import */ var _components_EntriesManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/EntriesManager.js */ "./src/components/EntriesManager.js");
/* harmony import */ var _components_EntriesDisplay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/EntriesDisplay.js */ "./src/components/EntriesDisplay.js");
/* harmony import */ var _UI_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI.js */ "./src/components/UI.js");
/* harmony import */ var _CRUD_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CRUD.js */ "./src/components/CRUD.js");





class User {
  constructor(user, username, currency, order) {
    this.user = user;
    this.username = username;
    this.currency = currency;
    this.order = order;
  }

  /* CREATE USER INTERFACE */
  renderUI() {
    Object(_UI_js__WEBPACK_IMPORTED_MODULE_2__["setupUI"])(this.user, this.currency, this.username);
  }

  /* DISPLAY CURRENT PORTFOLIO */
  async renderEntries() {
    // get user's current entries from database
    let snapshot = "";

    // if ordered by date
    if (this.order === "date") {
      snapshot = await db
        .collection("users")
        .doc(this.user.uid)
        .collection("entries")
        .get();
    }
    // if ordered by coin
    else if (this.order === "coin") {
      snapshot = await db
        .collection("users")
        .doc(this.user.uid)
        .collection("entries")
        .orderBy("coin")
        .get();
    }

    // parse the data from the current snapshot
    let entriesDB = snapshot.docs.map(doc => doc.data());

    // calculate the dynamic price/delta values for each entry
    let entries = await Object(_components_EntriesManager_js__WEBPACK_IMPORTED_MODULE_0__["completeEntries"])(entriesDB, this.currency);

    // set the default currency on the currency selector menu
    const currencySelector = document.getElementById("currency-selector");
    currencySelector.value = this.currency;

    // display the completed entries + totals
    Object(_components_EntriesDisplay_js__WEBPACK_IMPORTED_MODULE_1__["displayEntries"])(entries, this.currency);
    Object(_components_EntriesManager_js__WEBPACK_IMPORTED_MODULE_0__["calcTotal"])(entries, this.currency);
  }

  /* SETUP EVENT LISTENERS FOR CRUD OPERATIONS */
  createDataOptions() {
    Object(_CRUD_js__WEBPACK_IMPORTED_MODULE_3__["setupDataOptions"])(this.user, this);
  }

  /* UPDATE AND DISPLAY NEW CHOSEN CURRENCY */
  async updateCurrency(newCurrency) {
    // update user's default currency in database

    db.collection("users")
      .doc(this.user.uid)
      .update({
        currency: newCurrency
      });

    // set prev and curr currencies and get conversion rate from currency API
    let prevCurrency = this.currency;
    this.currency = newCurrency;

    const apiKey = "95dc8ec4575cdd938d14";
    let data = await fetch(
      `https://free.currconv.com/api/v7/convert?q=${prevCurrency}_${newCurrency}&compact=ultra&apiKey=${apiKey}`
    );
    let dataJSON = await data.json();

    let conversionRate = dataJSON[`${prevCurrency}_${newCurrency}`];

    let snapshot = await db
      .collection("users")
      .doc(this.user.uid)
      .collection("entries")
      .get();

    snapshot.docs.forEach(doc => {
      let buyPrice = doc.data().buyPrice;
      let newBuyPrice = Math.round(buyPrice * conversionRate);

      doc.ref.update({
        buyPrice: newBuyPrice
      });
    });
    this.renderEntries();
    this.renderUI();
  }

  setOrder(order) {
    db.collection("users")
      .doc(this.user.uid)
      .update({
        order: order
      });

    this.order = order;
  }
}


/***/ }),

/***/ "./src/database/AuthManager.js":
/*!*************************************!*\
  !*** ./src/database/AuthManager.js ***!
  \*************************************/
/*! exports provided: setupAuth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupAuth", function() { return setupAuth; });
/* harmony import */ var _components_UI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/UI.js */ "./src/components/UI.js");
/* harmony import */ var _components_User_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/User.js */ "./src/components/User.js");
/* harmony import */ var _DBListener_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DBListener.js */ "./src/database/DBListener.js");




const setupAuth = auth => {
  /* ----- login/logout state change ----- */
  auth.onAuthStateChanged(user => {
    if (user) {
      // get user's username and currency of choice
      db.collection("users")
        .doc(user.uid)
        .get()
        .then(snapshot => {
          let data = snapshot.data();
          let username = data.username;
          let currency = data.currency;
          let order = data.order;

          //setup portfolio greeting
          const portfolioHeader = document.getElementById("entries-title");
          portfolioHeader.innerHTML = `
           <h3>
              <i class="fas fa-wallet"></i>&nbsp;&nbsp;${username}'s Portfolio 
           </h3>
          `;

          // setup new user based on the retreived information
          const currUser = new _components_User_js__WEBPACK_IMPORTED_MODULE_1__["User"](user, username, currency, order);

          // set up user 'crud' options for user
          currUser.createDataOptions();

          // set up DB listener, to monitor changes in the user's database
          Object(_DBListener_js__WEBPACK_IMPORTED_MODULE_2__["setupDBListener"])(currUser, user);

          // set up app UI, including charts, data tables and news feed
          currUser.renderUI(user);

          // get user's entries from db and display them on screen
          currUser.renderEntries();
        });
    } else {
      Object(_components_UI_js__WEBPACK_IMPORTED_MODULE_0__["setupUI"])();
    }
  });

  /* ----- signup ----- */
  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", event => {
    event.preventDefault();

    // get new user details
    let username = signupForm["signup-username"].value;
    let email = signupForm["signup-email"].value;
    let password = signupForm["signup-password"].value;
    let currency = signupForm["signup-currency"].value;

    // create new user and also create user file in 'users' collection with username, using users unique ID to link the two
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userData => {
        return db
          .collection("users")
          .doc(userData.user.uid)
          .set({
            username: username,
            currency: currency,
            order: "date"
          });
      })
      .then(signupForm.reset());

    $("#modal-signup").modal("hide");
  });

  /* ----- login ----- */
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", event => {
    event.preventDefault();

    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;

    auth.signInWithEmailAndPassword(email, password).then(userData => {
      console.log("logged in", userData.user.uid);
      loginForm.reset();
    });

    $("#modal-login").modal("hide");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });

  /* ----- logout ----- */
  const logout = document.getElementById("logout");
  logout.addEventListener("click", event => {
    event.preventDefault();
    auth.signOut().then(() => {
      Object(_components_UI_js__WEBPACK_IMPORTED_MODULE_0__["setupUI"])();
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });
};


/***/ }),

/***/ "./src/database/DBListener.js":
/*!************************************!*\
  !*** ./src/database/DBListener.js ***!
  \************************************/
/*! exports provided: setupDBListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupDBListener", function() { return setupDBListener; });
function setupDBListener(User, userDB) {
  //realtime database listener
  db.collection("users")
    .doc(userDB.uid)
    .collection("entries")
    .onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        User.renderEntries();
      });
    });
}


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _database_AuthManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./database/AuthManager.js */ "./src/database/AuthManager.js");
/* harmony import */ var _components_AutoComplete_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/AutoComplete.js */ "./src/components/AutoComplete.js");



window.addEventListener("DOMContentLoaded", () => {
  // initialise auth manager
  const auth = firebase.auth();
  // setup database authorisation manager
  Object(_database_AuthManager_js__WEBPACK_IMPORTED_MODULE_0__["setupAuth"])(auth);
  // set up 'New Entry' autocomplete menu for user
  Object(_components_AutoComplete_js__WEBPACK_IMPORTED_MODULE_1__["setupAutoComplete"])();
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXV0b0NvbXBsZXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NSVUQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2hhcnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0N1cnJlbmN5TWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FbnRyaWVzRGlzcGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FbnRyaWVzTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9NYXJrZXRDYXBEYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL01hcmtldENhcERhdGFEaXNwbGF5LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL05ld3NGZWVkRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9OZXdzRmVlZERpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUG9ydGZvbGlvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9VSS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Vc2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9kYXRhYmFzZS9BdXRoTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0YWJhc2UvREJMaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGlFQUFPO0FBQ2IsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQzdHQTtBQUFBO0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7OztBQ1hBO0FBQUE7QUFBQTtBQUFzRDtBQUNXOztBQUVqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMEVBQVM7QUFDWDtBQUNBLEVBQUUscUZBQWlCO0FBQ25CLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsImxldCBjb2luTGlzdCA9IFtdO1xuXG5leHBvcnQgY29uc3Qgc2V0dXBBdXRvQ29tcGxldGUgPSAoKSA9PiB7XG4gIG5ldyBhdXRvQ29tcGxldGUoe1xuICAgIGRhdGE6IHtcbiAgICAgIC8vIERhdGEgc3JjIFtBcnJheSwgRnVuY3Rpb24sIEFzeW5jXSB8IChSRVFVSVJFRClcbiAgICAgIHNyYzogYXN5bmMgKCkgPT4ge1xuICAgICAgICAvLyBGZXRjaCBFeHRlcm5hbCBEYXRhIFNvdXJjZVxuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoKFxuICAgICAgICAgIFwiaHR0cHM6Ly9taW4tYXBpLmNyeXB0b2NvbXBhcmUuY29tL2RhdGEvYWxsL2NvaW5saXN0XCJcbiAgICAgICAgKTtcbiAgICAgICAgLy8gRm9ybWF0IGRhdGEgaW50byBKU09OXG4gICAgICAgIGxldCBjb2luc0RhdGEgPSBhd2FpdCBkYXRhLmpzb24oKTtcbiAgICAgICAgLy8gUmV0dXJuIEZldGNoZWQgZGF0YVxuICAgICAgICBsZXQgY29pbnMgPSBjb2luc0RhdGEuRGF0YTtcbiAgICAgICAgY29pbkxpc3QgPSBPYmplY3QudmFsdWVzKGNvaW5zKTtcbiAgICAgICAgcmV0dXJuIGNvaW5MaXN0O1xuICAgICAgfSxcbiAgICAgIGtleTogW1wiQ29pbk5hbWVcIiwgXCJOYW1lXCJdLFxuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgfSxcbiAgICBxdWVyeToge1xuICAgICAgLy8gUXVlcnkgSW50ZXJjZXB0b3IgICAgICAgICAgICAgICB8IChPcHRpb25hbClcbiAgICAgIG1hbmlwdWxhdGU6IHF1ZXJ5ID0+IHtcbiAgICAgICAgcmV0dXJuIHF1ZXJ5LnJlcGxhY2UoXCJOYW1lXCIsIFwiQ29pbk5hbWVcIik7XG4gICAgICB9XG4gICAgfSxcbiAgICBzb3J0OiAoYSwgYikgPT4ge1xuICAgICAgLy8gU29ydCByZW5kZXJlZCByZXN1bHRzIGFzY2VuZGluZ2x5IHwgKE9wdGlvbmFsKVxuICAgICAgaWYgKGEubWF0Y2ggPCBiLm1hdGNoKSByZXR1cm4gLTE7XG4gICAgICBpZiAoYS5tYXRjaCA+IGIubWF0Y2gpIHJldHVybiAxO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSxcbiAgICBwbGFjZUhvbGRlcjogXCJDb2lucy4uLlwiLCAvLyBQbGFjZSBIb2xkZXIgdGV4dCAgICAgICAgICAgICAgICAgfCAoT3B0aW9uYWwpXG4gICAgc2VsZWN0b3I6IFwiI2NvaW5cIiwgLy8gSW5wdXQgZmllbGQgc2VsZWN0b3IgICAgICAgICAgICAgIHwgKE9wdGlvbmFsKVxuICAgIHRocmVzaG9sZDogMSwgLy8gTWluLiBDaGFycyBsZW5ndGggdG8gc3RhcnQgRW5naW5lIHwgKE9wdGlvbmFsKVxuICAgIGRlYm91bmNlOiAzMDAsIC8vIFBvc3QgZHVyYXRpb24gZm9yIGVuZ2luZSB0byBzdGFydCB8IChPcHRpb25hbClcbiAgICBzZWFyY2hFbmdpbmU6IFwic3RyaWN0XCIsIC8vIFNlYXJjaCBFbmdpbmUgdHlwZS9tb2RlICAgICAgICAgICB8IChPcHRpb25hbClcbiAgICByZXN1bHRzTGlzdDoge1xuICAgICAgLy8gUmVuZGVyZWQgcmVzdWx0cyBsaXN0IG9iamVjdCAgICAgIHwgKE9wdGlvbmFsKVxuICAgICAgcmVuZGVyOiB0cnVlLFxuICAgICAgY29udGFpbmVyOiBzb3VyY2UgPT4ge1xuICAgICAgICBzb3VyY2Uuc2V0QXR0cmlidXRlKFwiTmFtZVwiLCBcIkNvaW5OYW1lXCIpO1xuICAgICAgfSxcbiAgICAgIGRlc3RpbmF0aW9uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F1dG9jb21wbGV0ZS1yZXN1bHRzXCIpLFxuICAgICAgcG9zaXRpb246IFwiYWZ0ZXJiZWdpblwiLFxuICAgICAgZWxlbWVudDogXCJ1bFwiXG4gICAgfSxcbiAgICBtYXhSZXN1bHRzOiA1LCAvLyBNYXguIG51bWJlciBvZiByZW5kZXJlZCByZXN1bHRzIHwgKE9wdGlvbmFsKVxuICAgIGhpZ2hsaWdodDogdHJ1ZSwgLy8gSGlnaGxpZ2h0IG1hdGNoaW5nIHJlc3VsdHMgICAgICB8IChPcHRpb25hbClcbiAgICByZXN1bHRJdGVtOiB7XG4gICAgICAvLyBSZW5kZXJlZCByZXN1bHQgaXRlbSAgICAgICAgICAgIHwgKE9wdGlvbmFsKVxuICAgICAgY29udGVudDogKGRhdGEsIHNvdXJjZSkgPT4ge1xuICAgICAgICBzb3VyY2UuaW5uZXJIVE1MID0gZGF0YS5tYXRjaDtcbiAgICAgIH0sXG4gICAgICBlbGVtZW50OiBcImxpXCJcbiAgICB9LFxuICAgIG5vUmVzdWx0czogKCkgPT4ge1xuICAgICAgLy8gQWN0aW9uIHNjcmlwdCBvbiBub1Jlc3VsdHMgICAgICB8IChPcHRpb25hbClcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIHJlc3VsdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm5vX3Jlc3VsdFwiKTtcbiAgICAgIHJlc3VsdC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIjFcIik7XG4gICAgICByZXN1bHQuaW5uZXJIVE1MID0gXCJObyBSZXN1bHRzXCI7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F1dG9jb21wbGV0ZS1yZXN1bHRzXCIpLmFwcGVuZENoaWxkKHJlc3VsdCk7XG4gICAgfSxcbiAgICBvblNlbGVjdGlvbjogZmVlZGJhY2sgPT4ge1xuICAgICAgLy8gQWN0aW9uIHNjcmlwdCBvblNlbGVjdGlvbiBldmVudCB8IChPcHRpb25hbClcbiAgICAgIGNvbnNvbGUubG9nKGZlZWRiYWNrLnNlbGVjdGlvbi52YWx1ZSk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIiNjb2luXCJcbiAgICAgICkudmFsdWUgPSBgJHtmZWVkYmFjay5zZWxlY3Rpb24udmFsdWUuTmFtZX0gKCR7ZmVlZGJhY2suc2VsZWN0aW9uLnZhbHVlLkNvaW5OYW1lfSlgO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29pbkxpc3QoKSB7XG4gIGxldCBkYXRhID0gYXdhaXQgZmV0Y2goXCJodHRwczovL21pbi1hcGkuY3J5cHRvY29tcGFyZS5jb20vZGF0YS9hbGwvY29pbmxpc3RcIik7XG4gIGxldCBjb2luc0RhdGEgPSBhd2FpdCBkYXRhLmpzb24oKTtcbiAgbGV0IGNvaW5zID0gY29pbnNEYXRhLkRhdGE7XG4gIGNvaW5MaXN0ID0gT2JqZWN0LnZhbHVlcyhjb2lucyk7XG4gIGNvbnNvbGUubG9nKGNvaW5MaXN0KTtcbn1cbiIsImV4cG9ydCBjb25zdCBzZXR1cERhdGFPcHRpb25zID0gKHVzZXIsIFVzZXIpID0+IHtcbiAgLyogQUREIE5FVyBFTlRSWSAqL1xuICBjb25zdCBlbnRyeUZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVudHJ5LWZvcm1cIik7XG4gIGVudHJ5Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGFzeW5jIGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy9jYWxjdWxhdGUgdmFsdWVzIGZyb20gZm9ybVxuICAgIGxldCBpZE51bSA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCkpO1xuICAgIGxldCBpZCA9IGlkTnVtLnRvU3RyaW5nKCk7XG5cbiAgICAvLyBjYWxjdWxhdGUgdG9kYXkncyBkYXRlIChERC9NTS9ZWVlZKVxuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IGRhdGUgPSBgJHt0b2RheS5nZXREYXRlKCl9LyR7dG9kYXkuZ2V0TW9udGgoKSArXG4gICAgICAxfS8ke3RvZGF5LmdldEZ1bGxZZWFyKCl9YDtcblxuICAgIGxldCBjb2luTmFtZUFsbCA9IGVudHJ5Rm9ybVtcImNvaW5cIl0udmFsdWU7XG4gICAgLy8gZ2V0IGNvaW4gc3ltYm9sIChmaXJzdCB0aHJlZSBjaGFyYWN0ZXJzIGJlZm9yZSBzcGFjZSlcbiAgICBsZXQgY29pblN5bWJvbCA9IGNvaW5OYW1lQWxsLnN1YnN0cigwLCBjb2luTmFtZUFsbC5pbmRleE9mKFwiIFwiKSk7XG4gICAgLy8gZ2V0IGZ1bGwgY29pbiBuYW1lIChjaGFyYWN0ZXJzIGFmdGVyIHNwYWNlKVxuICAgIGxldCBjb2luTmFtZSA9IGNvaW5OYW1lQWxsXG4gICAgICAuc3Vic3RyKGNvaW5OYW1lQWxsLmluZGV4T2YoXCIgXCIpICsgMSlcbiAgICAgIC8vIHJlbW92ZSBicmFja2V0c1xuICAgICAgLnNsaWNlKDEsIC0xKTtcbiAgICBjb25zb2xlLmxvZyhjb2luU3ltYm9sKTtcbiAgICBjb25zb2xlLmxvZyhjb2luTmFtZSk7XG5cbiAgICBsZXQgYW1vdW50ID0gZW50cnlGb3JtW1wiYW1vdW50XCJdLnZhbHVlO1xuICAgIGxldCBidXlQcmljZSA9IGVudHJ5Rm9ybVtcImJ1eS1wcmljZVwiXS52YWx1ZTtcblxuICAgIC8vIGFkZCBuZXcgZW50cnkgdG8gZGF0YWJhc2UgYmFzZWQgb24gZm9ybSB2YWx1ZXNcbiAgICBkYi5jb2xsZWN0aW9uKFwidXNlcnNcIilcbiAgICAgIC5kb2ModXNlci51aWQpXG4gICAgICAuY29sbGVjdGlvbihcImVudHJpZXNcIilcbiAgICAgIC5kb2MoaWQpXG4gICAgICAuc2V0KHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICBkYXRlOiBkYXRlLFxuICAgICAgICBjb2luOiBjb2luU3ltYm9sLFxuICAgICAgICBjb2luTmFtZTogY29pbk5hbWUsXG4gICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICBidXlQcmljZTogYnV5UHJpY2VcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGVudHJ5Rm9ybS5yZXNldCgpO1xuICAgICAgfSk7XG5cbiAgICAkKFwiI21vZGFsLWVudHJ5XCIpLm1vZGFsKFwiaGlkZVwiKTtcbiAgfSk7XG5cbiAgLyogREVMRVRFIEVOVFJZICovXG4gIGNvbnN0IGVudHJpZXNTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbnRyaWVzLXNlY3Rpb25cIik7XG4gIGVudHJpZXNTZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSk7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IFwiZW50cnktZGVsLWJ0biBmYXMgZmEtd2luZG93LWNsb3NlXCIpIHtcbiAgICAgIGlmIChjb25maXJtKFwiWW91IGFyZSBhYm91dCB0byBkZWxldGUgdGhpcyBlbnRyeS4gUHJvY2VlZD9cIikpIHtcbiAgICAgICAgZGIuY29sbGVjdGlvbihcInVzZXJzXCIpXG4gICAgICAgICAgLmRvYyh1c2VyLnVpZClcbiAgICAgICAgICAuY29sbGVjdGlvbihcImVudHJpZXNcIilcbiAgICAgICAgICAuZ2V0KClcbiAgICAgICAgICAudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICBzbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XG4gICAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQucGFyZW50Tm9kZS5pZCA9PT0gZG9jLmlkKSB7XG4gICAgICAgICAgICAgICAgZGIuY29sbGVjdGlvbihcInVzZXJzXCIpXG4gICAgICAgICAgICAgICAgICAuZG9jKHVzZXIudWlkKVxuICAgICAgICAgICAgICAgICAgLmNvbGxlY3Rpb24oXCJlbnRyaWVzXCIpXG4gICAgICAgICAgICAgICAgICAuZG9jKGRvYy5pZClcbiAgICAgICAgICAgICAgICAgIC5kZWxldGUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvKiBVUERBVEUgRU5UUklFUyAqL1xuICBjb25zdCB1cGRhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwZGF0ZS1idG5cIik7XG4gIHVwZGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIFVzZXIucmVuZGVyRW50cmllcygpO1xuICB9KTtcblxuICAvKiBVUERBVEUgQ1VSUkVOQ1kgKi9cbiAgY29uc3QgY3VycmVuY3lTZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVuY3ktc2VsZWN0b3JcIik7XG4gIGN1cnJlbmN5U2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBldmVudCA9PiB7XG4gICAgbGV0IG5ld0N1cnJlbmN5ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIFVzZXIudXBkYXRlQ3VycmVuY3kobmV3Q3VycmVuY3kpO1xuICB9KTtcblxuICAvKiBDSEFOR0UgRU5UUklFUyBPUkRFUiAqL1xuICBjb25zdCBvcmRlclNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb3J0LW9yZGVyLXNlbGVjdG9yXCIpO1xuICBvcmRlclNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZXZlbnQgPT4ge1xuICAgIC8vIGdldCB1c2VyJ3Mgb3JkZXIgc2VsZWN0aW9uXG4gICAgbGV0IHNvcnRCeSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcblxuICAgIC8vIHdyaXRlIHByZWZlcmVuY2UgdG8gdXNlcidzIGZpbGUgaW4gdGhlIERCIGFuZCB1cGRhdGUgVUlcbiAgICBVc2VyLnNldE9yZGVyKHNvcnRCeSk7XG4gICAgVXNlci5yZW5kZXJFbnRyaWVzKCk7XG4gIH0pO1xufTtcbiIsImltcG9ydCB7IGdldEN1cnJlbmN5U3ltYm9sIH0gZnJvbSBcIi4vQ3VycmVuY3lNYW5hZ2VyLmpzXCI7XG5cbmxldCBjaGFydCA9IFwiXCI7XG5sZXQgY29pbkNoYXJ0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2luLWNoYXJ0LWNvbnRhaW5lclwiKTtcbmxldCBlbnRyaWVzU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW50cmllcy1zZWN0aW9uXCIpO1xubGV0IG1hcmtldENhcFNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcmtldC1jYXAtc2VjdGlvblwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwQ29pbkNoYXJ0cyhjdXJyZW5jeSwgdXNlcikge1xuICBsZXQgY2hvc2VuRW50cnkgPSBcIlwiO1xuICBlbnRyaWVzU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuICAgIGlmIChcbiAgICAgIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IFwic2hvdy1jaGFydC1idG5cIiB8fFxuICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJlbnRyeS1jb2luXCJcbiAgICApIHtcbiAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSBcInNob3ctY2hhcnQtYnRuXCIpXG4gICAgICAgIGNob3NlbkVudHJ5ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuaWQ7XG4gICAgICBlbHNlIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSBcImVudHJ5LWNvaW5cIilcbiAgICAgICAgY2hvc2VuRW50cnkgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmlkO1xuXG4gICAgICBkYi5jb2xsZWN0aW9uKFwidXNlcnNcIilcbiAgICAgICAgLmRvYyh1c2VyLnVpZClcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJlbnRyaWVzXCIpXG4gICAgICAgIC5nZXQoKVxuICAgICAgICAudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgc25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xuICAgICAgICAgICAgaWYgKGNob3NlbkVudHJ5ID09PSBkb2MuaWQpIHtcbiAgICAgICAgICAgICAgbGV0IGNob3NlbkNvaW4gPSBkb2MuZGF0YSgpLmNvaW47XG4gICAgICAgICAgICAgIHNldHVwQ29pbkNoYXJ0KGNob3NlbkNvaW4sIGN1cnJlbmN5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBtYXJrZXRDYXBTZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IFwidGFibGUtY29pbi1uYW1lXCIpIHtcbiAgICAgIHNldHVwQ29pbkNoYXJ0KGV2ZW50LnRhcmdldC5pbm5lckhUTUwsIGN1cnJlbmN5KTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0dXBWb2x1bWVDaGFydChjdXJyZW5jeSkge1xuICBsZXQgY3VycmVuY3lTeW1ib2wgPSBnZXRDdXJyZW5jeVN5bWJvbChjdXJyZW5jeSk7XG5cbiAgbGV0IHZvbERhdGEgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9taW4tYXBpLmNyeXB0b2NvbXBhcmUuY29tL2RhdGEvZXhjaGFuZ2UvaGlzdG9ob3VyP3RzeW09JHtjdXJyZW5jeX0mbGltaXQ9MTY4YFxuICApO1xuICBsZXQgdm9sSlNPTiA9IGF3YWl0IHZvbERhdGEuanNvbigpO1xuICBsZXQgdm9sdW1lID0gdm9sSlNPTi5EYXRhO1xuXG4gIGxldCB2b2x1bWVBbW91bnQgPSBbXTtcbiAgdm9sdW1lLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCkge1xuICAgIHZvbHVtZUFtb3VudFtpbmRleF0gPSAoaXRlbS52b2x1bWUgLyAxMDAwMDAwMDAwKS50b0ZpeGVkKDIpO1xuICB9KTtcblxuICBsZXQgdm9sdW1lVGltZSA9IFtdO1xuICB2b2x1bWUubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XG4gICAgbGV0IG1zID0gaXRlbS50aW1lO1xuICAgIGxldCB0aW1lID0gbmV3IERhdGUobXMpO1xuICAgIGxldCBob3VyID0gdGltZS5nZXREYXkoKTtcbiAgICB2b2x1bWVUaW1lW2luZGV4XSA9IGhvdXI7XG4gIH0pO1xuXG4gIGxldCBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZvbC1jaGFydFwiKS5nZXRDb250ZXh0KFwiMmRcIik7XG4gIG5ldyBDaGFydChjdHgsIHtcbiAgICB0eXBlOiBcImxpbmVcIixcbiAgICBkYXRhOiB7XG4gICAgICBsYWJlbHM6IHZvbHVtZVRpbWUsXG4gICAgICBkYXRhc2V0czogW1xuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6IGBDcnlwdG8gTWFya2V0IFZvbC9CIC0tLSAke2N1cnJlbmN5U3ltYm9sfSR7Y3VycmVuY3l9ICg3IGRheXMpIGAsXG4gICAgICAgICAgZGF0YTogdm9sdW1lQW1vdW50LFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDUwLCAyMDAsIDEzMiwgMC4yKVwiLFxuICAgICAgICAgIGJvcmRlckNvbG9yOiBcIndoaXRlXCIsXG4gICAgICAgICAgcG9pbnRCYWNrZ3JvdW5kQ29sb3I6IFwiI0MwQzBDMFwiLFxuICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxuICAgICAgICAgIGZpbGw6IHRydWVcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAgb3B0aW9uczoge1xuICAgICAgaG92ZXI6IHtcbiAgICAgICAgbW9kZTogXCJuZWFyZXN0XCIsXG4gICAgICAgIGludGVyc2VjdDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGxlZ2VuZDoge1xuICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICBmb250Q29sb3I6IFwid2hpdGVcIixcbiAgICAgICAgICBmb250U2l6ZTogMThcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIHBvaW50OiB7XG4gICAgICAgICAgcmFkaXVzOiAwXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzY2FsZXM6IHtcbiAgICAgICAgeEF4ZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBncmlkTGluZXM6IHtcbiAgICAgICAgICAgICAgZHJhd09uQ2hhcnRBcmVhOiBmYWxzZSxcbiAgICAgICAgICAgICAgY29sb3I6IFwid2hpdGVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpc3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgc2NhbGVMYWJlbDoge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgbGFiZWxTdHJpbmc6IFwiXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHlBeGVzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZ3JpZExpbmVzOiB7XG4gICAgICAgICAgICAgIGRyYXdPbkNoYXJ0QXJlYTogdHJ1ZSxcbiAgICAgICAgICAgICAgY29sb3I6IFwiI3doaXRlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICBiZWdpbkF0WmVybzogZmFsc2VcbiAgICAgICAgICAgICAgLy9yZXZlcnNlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2V0dXBDb2luQ2hhcnQoY29pbiwgY3VycmVuY3kpIHtcbiAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9taW4tYXBpLmNyeXB0b2NvbXBhcmUuY29tL2RhdGEvdjIvaGlzdG9ob3VyP2ZzeW09JHtjb2lufSZ0c3ltPSR7Y3VycmVuY3l9JmxpbWl0PTE2OGBcbiAgKTtcbiAgbGV0IGNvaW5KU09OID0gYXdhaXQgZGF0YS5qc29uKCk7XG4gIGxldCBjb2luRGF0YSA9IGF3YWl0IGNvaW5KU09OLkRhdGEuRGF0YTtcblxuICBsZXQgY29pblByaWNlcyA9IFtdO1xuICBjb2luRGF0YS5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcbiAgICBjb2luUHJpY2VzW2luZGV4XSA9IGl0ZW0ub3BlbjtcbiAgfSk7XG5cbiAgbGV0IHByaWNlVGltZSA9IFtdO1xuICBjb2luRGF0YS5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKGl0ZW0udGltZSk7XG4gICAgcHJpY2VUaW1lW2luZGV4XSA9IHRpbWUuZ2V0SG91cnMoKTtcbiAgfSk7XG5cbiAgbGV0IGN1cnJlbmN5U3ltYm9sID0gZ2V0Q3VycmVuY3lTeW1ib2woY3VycmVuY3kpO1xuXG4gIGxldCBjb2luQ2hhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvaW4tY2hhcnRcIikuZ2V0Q29udGV4dChcIjJkXCIpO1xuICBjaGFydCA9IG5ldyBDaGFydChjb2luQ2hhcnQsIHtcbiAgICB0eXBlOiBcImxpbmVcIixcbiAgICBkYXRhOiB7XG4gICAgICBsYWJlbHM6IHByaWNlVGltZSxcbiAgICAgIGRhdGFzZXRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogYCR7Y29pbn0gLyAke2N1cnJlbmN5U3ltYm9sfSAke2N1cnJlbmN5fWAsXG4gICAgICAgICAgZGF0YTogY29pblByaWNlcyxcbiAgICAgICAgICAvL2JhY2tncm91bmRDb2xvcjogW1wicmdiYSgyNTUsIDk5LCAxMzIsIDAuMilcIl0sXG4gICAgICAgICAgYm9yZGVyQ29sb3I6IFwid2hpdGVcIixcbiAgICAgICAgICBwb2ludEJhY2tncm91bmRDb2xvcjogXCIjQzBDMEMwXCIsXG4gICAgICAgICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgICAgICAgZmlsbDogZmFsc2VcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAgb3B0aW9uczoge1xuICAgICAgaG92ZXI6IHtcbiAgICAgICAgbW9kZTogXCJuZWFyZXN0XCIsXG4gICAgICAgIGludGVyc2VjdDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGxlZ2VuZDoge1xuICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICBmb250Q29sb3I6IFwid2hpdGVcIixcbiAgICAgICAgICBmb250U2l6ZTogMThcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIHBvaW50OiB7XG4gICAgICAgICAgcmFkaXVzOiAwXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzY2FsZXM6IHtcbiAgICAgICAgeEF4ZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBncmlkTGluZXM6IHtcbiAgICAgICAgICAgICAgZHJhd09uQ2hhcnRBcmVhOiBmYWxzZSxcbiAgICAgICAgICAgICAgY29sb3I6IFwiI0MwQzBDMFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGlzcGxheTogZmFsc2UsXG4gICAgICAgICAgICBzY2FsZUxhYmVsOiB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgICBsYWJlbFN0cmluZzogXCJcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgeUF4ZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBncmlkTGluZXM6IHtcbiAgICAgICAgICAgICAgZHJhd09uQ2hhcnRBcmVhOiB0cnVlLFxuICAgICAgICAgICAgICBjb2xvcjogXCIjQzBDMEMwXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICBiZWdpbkF0WmVybzogZmFsc2VcbiAgICAgICAgICAgICAgLy9yZXZlcnNlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNvaW5DaGFydCgpIHtcbiAgY29pbkNoYXJ0Q29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XG4gIGNoYXJ0LmRlc3Ryb3koKTtcbn1cbiIsImltcG9ydCB7IGRpc3BsYXlFbnRyaWVzIH0gZnJvbSBcIi4vRW50cmllc0Rpc3BsYXkuanNcIjtcbmltcG9ydCB7IGNhbGNUb3RhbCB9IGZyb20gXCIuL1BvcnRmb2xpb01hbmFnZXIuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbmN5U3ltYm9sKGN1cnJlbmN5KSB7XG4gIGxldCBjdXJyZW5jeVN5bWJvbCA9IFwiXCI7XG4gIHN3aXRjaCAoY3VycmVuY3kpIHtcbiAgICBjYXNlIFwiVVNEXCI6XG4gICAgICBjdXJyZW5jeVN5bWJvbCA9IFwiJFwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkdCUFwiOlxuICAgICAgY3VycmVuY3lTeW1ib2wgPSBcIsKjXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiRVVSXCI6XG4gICAgICBjdXJyZW5jeVN5bWJvbCA9IFwi4oKsXCI7XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gY3VycmVuY3lTeW1ib2w7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyQ3VycmVuY3koKSB7XG4gIGNvbnN0IGN1cnJlbmN5U2VsZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlci1jdXJyZW5jeS1zZWxlY3RcIik7XG4gIGxldCBjaG9zZW5DdXJyZW5jeSA9XG4gICAgY3VycmVuY3lTZWxlY3RGb3JtLm9wdGlvbnNbY3VycmVuY3lTZWxlY3RGb3JtLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICByZXR1cm4gY2hvc2VuQ3VycmVuY3k7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVDdXJyZW5jeShcbiAgcHJldkN1cnJlbmN5LFxuICBuZXdDdXJyZW5jeSxcbiAgZW50cmllcyxcbiAgZW50cmllc1NlY3Rpb25cbikge1xuICBjb25zdCBhcGlLZXkgPSBcIjk1ZGM4ZWM0NTc1Y2RkOTM4ZDE0XCI7XG5cbiAgLy8gZ2V0IGNvbnZlcnNpb24gcmF0ZSBmcm9tIGN1cnJlbmN5IEFQSVxuICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL2ZyZWUuY3VycmNvbnYuY29tL2FwaS92Ny9jb252ZXJ0P3E9JHtwcmV2Q3VycmVuY3l9XyR7bmV3Q3VycmVuY3l9JmNvbXBhY3Q9dWx0cmEmYXBpS2V5PSR7YXBpS2V5fWBcbiAgKTtcbiAgbGV0IGRhdGFKU09OID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgbGV0IGNvbnZlcnNpb25SYXRlID0gZGF0YUpTT05bYCR7cHJldkN1cnJlbmN5fV8ke25ld0N1cnJlbmN5fWBdO1xuICBjb25zb2xlLmxvZyhjb252ZXJzaW9uUmF0ZSk7XG5cbiAgLy8gY29udmVydCBhbGwgcmVsZXZhbnQgZW50cnkgdmFsdWVzIHRvIG5ldyBjdXJyZW5jeVxuICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgIGVudHJ5LmJ1eVByaWNlID0gTWF0aC5yb3VuZChlbnRyeS5idXlQcmljZSAqIGNvbnZlcnNpb25SYXRlKTtcbiAgICBlbnRyeS5idXlUb3RhbFZhbHVlID0gTWF0aC5yb3VuZChlbnRyeS5idXlUb3RhbFZhbHVlICogY29udmVyc2lvblJhdGUpO1xuICAgIGVudHJ5LmN1cnJQcmljZSA9IE1hdGgucm91bmQoZW50cnkuY3VyclByaWNlICogY29udmVyc2lvblJhdGUpO1xuICAgIGVudHJ5LmN1cnJUb3RhbFZhbHVlID0gTWF0aC5yb3VuZChlbnRyeS5jdXJyVG90YWxWYWx1ZSAqIGNvbnZlcnNpb25SYXRlKTtcbiAgICBlbnRyeS5kZWx0YSA9IE1hdGgucm91bmQoZW50cnkuZGVsdGEgKiBjb252ZXJzaW9uUmF0ZSk7XG4gIH0pO1xuXG4gIGRpc3BsYXlFbnRyaWVzKGVudHJpZXMpO1xuICBjYWxjVG90YWwoZW50cmllcywgbmV3Q3VycmVuY3kpO1xufVxuIiwiaW1wb3J0IHsgZ2V0Q3VycmVuY3lTeW1ib2wgfSBmcm9tIFwiLi9DdXJyZW5jeU1hbmFnZXIuanNcIjtcblxuY29uc3QgZW50cmllc0hlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW50cmllcy1oZWFkZXItY29udGFpbmVyXCIpO1xuY29uc3QgZW50cmllc1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVudHJpZXMtY29udGFpbmVyXCIpO1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheUVudHJpZXMoZW50cmllcywgY3VycmVuY3kpIHtcbiAgaWYgKGVudHJpZXMubGVuZ3RoKSB7XG4gICAgLy8gZGlzcGxheSBlbnRyaWVzXG4gICAgbGV0IGN1cnJlbmN5U3ltYm9sID0gZ2V0Q3VycmVuY3lTeW1ib2woY3VycmVuY3kpO1xuICAgIGVudHJpZXNTZWN0aW9uLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgbGV0IGVudHJ5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGVudHJ5Q29udGFpbmVyLmlkID0gZW50cnkuaWQ7XG4gICAgICBlbnRyeUNvbnRhaW5lci5jbGFzc05hbWUgPSBcImVudHJ5LWNvbnRhaW5lclwiO1xuXG4gICAgICBsZXQgZW50cnlEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBlbnRyeURhdGUuY2xhc3NOYW1lID0gXCJlbnRyeS1kYXRlXCI7XG4gICAgICBlbnRyeURhdGUuaW5uZXJIVE1MID0gZW50cnkuZGF0ZTtcblxuICAgICAgbGV0IGVudHJ5Q29pbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgZW50cnlDb2luLmNsYXNzTmFtZSA9IFwiZW50cnktY29pblwiO1xuICAgICAgZW50cnlDb2luLnNldEF0dHJpYnV0ZShcImRhdGEtdG9nZ2xlXCIsIFwibW9kYWxcIik7XG4gICAgICBlbnRyeUNvaW4uc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBcIiNjb2luLWNoYXJ0LWNvbnRhaW5lclwiKTtcbiAgICAgIGVudHJ5Q29pbi5pbm5lckhUTUwgPSBlbnRyeS5jb2luO1xuXG4gICAgICBsZXQgZW50cnlDb2luTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgZW50cnlDb2luTmFtZS5jbGFzc05hbWUgPSBcImVudHJ5LWNvaW4tbmFtZVwiO1xuICAgICAgZW50cnlDb2luTmFtZS5pbm5lckhUTUwgPSBlbnRyeS5jb2luTmFtZTtcblxuICAgICAgbGV0IGVudHJ5Q29pbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBlbnRyeUNvaW5EaXYuY2xhc3NOYW1lID0gXCJlbnRyeS1jb2luLWRpdiBncmlkLWNlbGxcIjtcbiAgICAgIGVudHJ5Q29pbkRpdi5hcHBlbmRDaGlsZChlbnRyeUNvaW4pO1xuICAgICAgZW50cnlDb2luRGl2LmFwcGVuZENoaWxkKGVudHJ5Q29pbk5hbWUpO1xuXG4gICAgICBsZXQgZW50cnlBbW91bnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIGVudHJ5QW1vdW50LmNsYXNzTmFtZSA9IFwiZW50cnktYW1vdW50IGdyaWQtY2VsbFwiO1xuICAgICAgZW50cnlBbW91bnQuaW5uZXJIVE1MID0gZW50cnkuYW1vdW50O1xuXG4gICAgICBsZXQgZW50cnlCdXlQcmljZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgZW50cnlCdXlQcmljZS5jbGFzc05hbWUgPSBcImVudHJ5LWJ1eS1wcmljZVwiO1xuICAgICAgZW50cnlCdXlQcmljZS5pbm5lckhUTUwgPSBgJHtjdXJyZW5jeVN5bWJvbH0ke2VudHJ5LmJ1eVByaWNlfWA7XG5cbiAgICAgIGxldCBlbnRyeUJ1eVRvdGFsVmFsdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIGVudHJ5QnV5VG90YWxWYWx1ZS5jbGFzc05hbWUgPSBcImVudHJ5LWJ1eS10b3RhbC12YWx1ZVwiO1xuICAgICAgZW50cnlCdXlUb3RhbFZhbHVlLmlubmVySFRNTCA9IGAke2N1cnJlbmN5U3ltYm9sfSR7ZW50cnkuYnV5VG90YWxWYWx1ZX1gO1xuXG4gICAgICBsZXQgZW50cnlCdXlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZW50cnlCdXlEaXYuY2xhc3NOYW1lID0gXCJlbnRyeS1idXktZGl2IGdyaWQtY2VsbFwiO1xuICAgICAgZW50cnlCdXlEaXYuYXBwZW5kQ2hpbGQoZW50cnlCdXlQcmljZSk7XG4gICAgICBlbnRyeUJ1eURpdi5hcHBlbmRDaGlsZChlbnRyeUJ1eVRvdGFsVmFsdWUpO1xuXG4gICAgICBsZXQgZW50cnlDdXJyUHJpY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIGVudHJ5Q3VyclByaWNlLmNsYXNzTmFtZSA9IFwiZW50cnktY3Vyci1wcmljZVwiO1xuICAgICAgZW50cnlDdXJyUHJpY2UuaW5uZXJIVE1MID0gYCR7Y3VycmVuY3lTeW1ib2x9JHtlbnRyeS5jdXJyUHJpY2V9YDtcblxuICAgICAgbGV0IGVudHJ5Q3VyclRvdGFsVmFsdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIGVudHJ5Q3VyclRvdGFsVmFsdWUuY2xhc3NOYW1lID0gXCJlbnRyeS1jdXJyLXRvdGFsLXZhbHVlXCI7XG4gICAgICBlbnRyeUN1cnJUb3RhbFZhbHVlLmlubmVySFRNTCA9IGAke2N1cnJlbmN5U3ltYm9sfSR7ZW50cnkuY3VyclRvdGFsVmFsdWV9YDtcblxuICAgICAgbGV0IGVudHJ5Q3VyckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBlbnRyeUN1cnJEaXYuY2xhc3NOYW1lID0gXCJlbnRyeS1jdXJyLWRpdiBncmlkLWNlbGxcIjtcbiAgICAgIGVudHJ5Q3VyckRpdi5hcHBlbmRDaGlsZChlbnRyeUN1cnJQcmljZSk7XG4gICAgICBlbnRyeUN1cnJEaXYuYXBwZW5kQ2hpbGQoZW50cnlDdXJyVG90YWxWYWx1ZSk7XG5cbiAgICAgIGxldCBlbnRyeURlbHRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgICAgIGlmIChlbnRyeS5kZWx0YSA+PSAwKSB7XG4gICAgICAgIGVudHJ5RGVsdGEuY2xhc3NOYW1lID0gXCJlbnRyeS1kZWx0YSBwcm9maXQgZ3JpZC1jZWxsXCI7XG4gICAgICAgIGVudHJ5RGVsdGEuaW5uZXJIVE1MID0gYCR7Y3VycmVuY3lTeW1ib2x9JHtlbnRyeS5kZWx0YX1gO1xuICAgICAgfSBlbHNlIGlmIChlbnRyeS5kZWx0YSA8IDApIHtcbiAgICAgICAgZW50cnlEZWx0YS5jbGFzc05hbWUgPSBcImVudHJ5LWRlbHRhIGxvc3MgZ3JpZC1jZWxsXCI7XG4gICAgICAgIGVudHJ5RGVsdGEuaW5uZXJIVE1MID0gYC0ke2N1cnJlbmN5U3ltYm9sfSR7TWF0aC5hYnMoZW50cnkuZGVsdGEpfWA7XG4gICAgICB9XG5cbiAgICAgIGxldCBlbnRyeURlbHRhUGVyYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgaWYgKGVudHJ5LmRlbHRhUGVyYyA+PSAwKSB7XG4gICAgICAgIGVudHJ5RGVsdGFQZXJjLmNsYXNzTmFtZSA9IFwiZW50cnktZGVsdGEtcGVyYyBwcm9maXQgZ3JpZC1jZWxsXCI7XG4gICAgICAgIGVudHJ5RGVsdGFQZXJjLmlubmVySFRNTCA9IGAke2VudHJ5LmRlbHRhUGVyY30lICYjeDIxOTFgO1xuICAgICAgfSBlbHNlIGlmIChlbnRyeS5kZWx0YVBlcmMgPCAwKSB7XG4gICAgICAgIGVudHJ5RGVsdGFQZXJjLmNsYXNzTmFtZSA9IFwiZW50cnktZGVsdGEtcGVyYyBsb3NzIGdyaWQtY2VsbFwiO1xuICAgICAgICBlbnRyeURlbHRhUGVyYy5pbm5lckhUTUwgPSBgJHtlbnRyeS5kZWx0YVBlcmN9JSAmI3gyMTkzYDtcbiAgICAgIH1cblxuICAgICAgbGV0IGVudHJ5RGVsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgICBlbnRyeURlbEJ0bi5jbGFzc05hbWUgPSBgZW50cnktZGVsLWJ0biBmYXMgZmEtd2luZG93LWNsb3NlYDtcblxuICAgICAgbGV0IHNob3dDaGFydEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBzaG93Q2hhcnRCdG4uY2xhc3NOYW1lID0gXCJzaG93LWNoYXJ0LWJ0blwiO1xuICAgICAgc2hvd0NoYXJ0QnRuLnNldEF0dHJpYnV0ZShcImRhdGEtdG9nZ2xlXCIsIFwibW9kYWxcIik7XG4gICAgICBzaG93Q2hhcnRCdG4uc2V0QXR0cmlidXRlKFwiZGF0YS10YXJnZXRcIiwgXCIjY29pbi1jaGFydC1jb250YWluZXJcIik7XG4gICAgICBzaG93Q2hhcnRCdG4uaW5uZXJIVE1MID0gXCJQcmljZSBDaGFydFwiO1xuXG4gICAgICBlbnRyeUNvbnRhaW5lci5hcHBlbmRDaGlsZChlbnRyeURhdGUpO1xuICAgICAgZW50cnlDb250YWluZXIuYXBwZW5kQ2hpbGQoZW50cnlDb2luRGl2KTtcbiAgICAgIGVudHJ5Q29udGFpbmVyLmFwcGVuZENoaWxkKGVudHJ5QW1vdW50KTtcbiAgICAgIGVudHJ5Q29udGFpbmVyLmFwcGVuZENoaWxkKGVudHJ5QnV5RGl2KTtcbiAgICAgIGVudHJ5Q29udGFpbmVyLmFwcGVuZENoaWxkKGVudHJ5Q3VyckRpdik7XG4gICAgICBlbnRyeUNvbnRhaW5lci5hcHBlbmRDaGlsZChlbnRyeURlbHRhKTtcbiAgICAgIGVudHJ5Q29udGFpbmVyLmFwcGVuZENoaWxkKGVudHJ5RGVsdGFQZXJjKTtcbiAgICAgIGVudHJ5Q29udGFpbmVyLmFwcGVuZENoaWxkKHNob3dDaGFydEJ0bik7XG4gICAgICBlbnRyeUNvbnRhaW5lci5hcHBlbmRDaGlsZChlbnRyeURlbEJ0bik7XG5cbiAgICAgIGVudHJpZXNTZWN0aW9uLmFwcGVuZENoaWxkKGVudHJ5Q29udGFpbmVyKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcImVtcHR5IGVudHJpZXNcIik7XG4gICAgZW50cmllc1NlY3Rpb24uaW5uZXJIVE1MID0gYFxuICAgICAgPGgzPllvdXIgUG9ydGZvbGlvIElzIEVtcHR5ISBBZGQgYXQgbGVhc3Qgb25lIGNvaW4gdG8gc3RhcnQgYnVpbGRpbmcgeW91ciBlbXBpcmUgOik8L2gzPlxuICAgIGA7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlUb3RhbHMoYnV5LCBjdXJyLCBkZWx0YSwgZGVsdGFQZXJjLCBjdXJyZW5jeSkge1xuICBsZXQgY3VycmVuY3lTeW1ib2wgPSBnZXRDdXJyZW5jeVN5bWJvbChjdXJyZW5jeSk7XG4gIGxldCB0b3RhbHNBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbHMtY29udGFpbmVyXCIpO1xuICB0b3RhbHNBcmVhLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgbGV0IHRvdGFsc1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIHRvdGFsc1RpdGxlLmNsYXNzTmFtZSA9IFwidG90YWxzLXRpdGxlIGdyaWQtY2VsbFwiO1xuICB0b3RhbHNUaXRsZS5pbm5lckhUTUwgPSBcIlRvdGFsXCI7XG5cbiAgbGV0IHRvdGFsc0J1eVZhbHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIHRvdGFsc0J1eVZhbHVlLmNsYXNzTmFtZSA9IFwidG90YWxzLWJ1eS12YWx1ZSBncmlkLWNlbGxcIjtcbiAgdG90YWxzQnV5VmFsdWUuaW5uZXJIVE1MID0gYCR7Y3VycmVuY3lTeW1ib2x9JHtidXl9PGJyPjxzcGFuIGNsYXNzPSdzbWFsbCc+KGJ1eSB2YWx1ZSk8c3Bhbj5gO1xuXG4gIGxldCB0b3RhbHNDdXJyVmFsdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgdG90YWxzQ3VyclZhbHVlLmNsYXNzTmFtZSA9IFwidG90YWxzLWN1cnItdmFsdWUgZ3JpZC1jZWxsXCI7XG4gIHRvdGFsc0N1cnJWYWx1ZS5pbm5lckhUTUwgPSBgJHtjdXJyZW5jeVN5bWJvbH0ke2N1cnJ9PGJyPjxzcGFuIGNsYXNzPSdzbWFsbCc+KGN1cnJlbnQgdmFsdWUpPHNwYW4+YDtcblxuICBsZXQgdG90YWxzRGVsdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgaWYgKGRlbHRhID49IDApIHtcbiAgICB0b3RhbHNEZWx0YS5jbGFzc05hbWUgPSBcInRvdGFscy1kZWx0YSBncmlkLWNlbGwgcHJvZml0XCI7XG4gIH0gZWxzZSB7XG4gICAgdG90YWxzRGVsdGEuY2xhc3NOYW1lID0gXCJ0b3RhbHMtZGVsdGEgZ3JpZC1jZWxsIGxvc3NcIjtcbiAgfVxuICB0b3RhbHNEZWx0YS5pbm5lckhUTUwgPSBgJHtjdXJyZW5jeVN5bWJvbH0ke2RlbHRhfTxicj48c3BhbiBjbGFzcz0nc21hbGwnPihQL0wpPHNwYW4+YDtcblxuICBsZXQgdG90YWxzRGVsdGFQZXJjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGlmIChkZWx0YVBlcmMgPj0gMCkge1xuICAgIHRvdGFsc0RlbHRhUGVyYy5jbGFzc05hbWUgPSBcInRvdGFscy1kZWx0YS1wZXJjIGdyaWQtY2VsbCBwcm9maXRcIjtcbiAgICB0b3RhbHNEZWx0YVBlcmMuaW5uZXJIVE1MID0gYCR7ZGVsdGFQZXJjfSUgJiN4MjE5MWA7XG4gIH0gZWxzZSB7XG4gICAgdG90YWxzRGVsdGFQZXJjLmNsYXNzTmFtZSA9IFwidG90YWxzLWRlbHRhLXBlcmMgZ3JpZC1jZWxsIGxvc3NcIjtcbiAgICB0b3RhbHNEZWx0YVBlcmMuaW5uZXJIVE1MID0gYCR7ZGVsdGFQZXJjfSUgJiN4MjE5M2A7XG4gIH1cblxuICB0b3RhbHNBcmVhLmFwcGVuZENoaWxkKHRvdGFsc1RpdGxlKTtcbiAgdG90YWxzQXJlYS5hcHBlbmRDaGlsZCh0b3RhbHNCdXlWYWx1ZSk7XG4gIHRvdGFsc0FyZWEuYXBwZW5kQ2hpbGQodG90YWxzQ3VyclZhbHVlKTtcbiAgdG90YWxzQXJlYS5hcHBlbmRDaGlsZCh0b3RhbHNEZWx0YSk7XG4gIHRvdGFsc0FyZWEuYXBwZW5kQ2hpbGQodG90YWxzRGVsdGFQZXJjKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyVG90YWxzKCkge1xuICBsZXQgdG90YWxzQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG90YWxzLWNvbnRhaW5lclwiKTtcbiAgdG90YWxzQXJlYS5pbm5lckhUTUwgPSBcIlwiO1xufVxuIiwiaW1wb3J0IHsgZGlzcGxheVRvdGFscyB9IGZyb20gXCIuL0VudHJpZXNEaXNwbGF5LmpzXCI7XG5cbmV4cG9ydCBjb25zdCBjb21wbGV0ZUVudHJpZXMgPSBhc3luYyAoZGJFbnRyaWVzLCBjdXJyZW5jeSkgPT4ge1xuICAvLyBjcmVhdGUgYXJyYXkgd2hpY2ggd2lsbCBiZSByZXR1cm5lZCBhcyBhIGNvbXBsZXRlZCBzZXQgb2YgZW50cmllcyBsYXRlclxuICBsZXQgZW50cmllcyA9IFtdO1xuXG4gIC8vIHRha2UgaW4gaGFyZHdpcmVkIGRiIGluZm8gYW5kIGZpbGwgb3V0IGEgZnVsbCBlbnRyeSBiYXNlZCBvbiBkeW5hbWljIGNhbGN1bGF0aW9uc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRiRW50cmllcy5sZW5ndGg7IGkrKykge1xuICAgIC8vIHRoZSB0b3RhbCB2YWx1ZSBvZiBjb2luIGFtb3VudCBib3VnaHQgb3JpZ2luYWxseVxuICAgIGxldCBidXlUb3RhbFZhbHVlID0gKGRiRW50cmllc1tpXS5idXlQcmljZSAqIGRiRW50cmllc1tpXS5hbW91bnQpLnRvRml4ZWQoXG4gICAgICAyXG4gICAgKTtcblxuICAgIC8vIHRoZSBjdXJyZW50IGNvaW4gcHJpY2UgYW5kIHRvdGFsIHZhbHVlXG4gICAgbGV0IGN1cnJQcmljZURhdGEgPSBhd2FpdCBnZXRDdXJyUHJpY2UoZGJFbnRyaWVzW2ldLmNvaW4sIGN1cnJlbmN5KTtcbiAgICBsZXQgY3VyclByaWNlSlNPTiA9IGF3YWl0IGN1cnJQcmljZURhdGEuanNvbigpO1xuICAgIGxldCBjdXJyUHJpY2UgPSBjdXJyUHJpY2VKU09OW2N1cnJlbmN5XS50b0ZpeGVkKDIpO1xuICAgIGxldCBjdXJyVG90YWxWYWx1ZSA9IChkYkVudHJpZXNbaV0uYW1vdW50ICogY3VyclByaWNlKS50b0ZpeGVkKDIpO1xuXG4gICAgLy8gdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgb3JpZ2luYWwgYnV5IGFuZCBjdXJyZW50IHZsYXVlc1xuICAgIGxldCBkZWx0YSA9IChjdXJyVG90YWxWYWx1ZSAtIGJ1eVRvdGFsVmFsdWUpLnRvRml4ZWQoMik7XG4gICAgbGV0IGRlbHRhRnJhY3Rpb24gPSBkZWx0YSAvIGJ1eVRvdGFsVmFsdWU7XG4gICAgbGV0IGRlbHRhUGVyYyA9IChkZWx0YUZyYWN0aW9uICogMTAwKS50b0ZpeGVkKDIpO1xuXG4gICAgLyogLS0tLS0gQ1JFQVRFIE5FVyBDT01QTEVURUQgRU5UUlkgLS0tLS0gKi9cbiAgICBsZXQgbmV3RW50cnkgPSB7XG4gICAgICAvLyBzdGF0aWMgdmFsdWVzXG4gICAgICBpZDogZGJFbnRyaWVzW2ldLmlkLFxuICAgICAgZGF0ZTogZGJFbnRyaWVzW2ldLmRhdGUsXG4gICAgICBjb2luOiBkYkVudHJpZXNbaV0uY29pbixcbiAgICAgIGNvaW5OYW1lOiBkYkVudHJpZXNbaV0uY29pbk5hbWUsXG4gICAgICBhbW91bnQ6IGRiRW50cmllc1tpXS5hbW91bnQsXG4gICAgICBidXlQcmljZTogZGJFbnRyaWVzW2ldLmJ1eVByaWNlLFxuICAgICAgLy8gZHluYW1pYyB2YWx1ZXNcbiAgICAgIGJ1eVRvdGFsVmFsdWU6IGJ1eVRvdGFsVmFsdWUsXG4gICAgICBjdXJyUHJpY2U6IGN1cnJQcmljZSxcbiAgICAgIGN1cnJUb3RhbFZhbHVlOiBjdXJyVG90YWxWYWx1ZSxcbiAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgIGRlbHRhUGVyYzogZGVsdGFQZXJjXG4gICAgfTtcblxuICAgIC8vIGFkZCBlbnRyeSB0byBjb21wbGV0ZWQgZW50cmllcyBhcnJheVxuICAgIGVudHJpZXMucHVzaChuZXdFbnRyeSk7XG4gIH1cbiAgcmV0dXJuIGVudHJpZXM7XG59O1xuXG4vLyBnZXRzIHRoZSBjdXJyZW50IHByaWNlIGZvciByZXF1ZXN0ZWQgY29pbiBmcm9tIENyeXB0b2NvbXBhcmUgQVBJXG5hc3luYyBmdW5jdGlvbiBnZXRDdXJyUHJpY2UoY29pbiwgY3VycmVuY3kpIHtcbiAgbGV0IGN1cnJQcmljZSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL21pbi1hcGkuY3J5cHRvY29tcGFyZS5jb20vZGF0YS9wcmljZT9mc3ltPSR7Y29pbn0mdHN5bXM9JHtjdXJyZW5jeX1gXG4gICk7XG4gIHJldHVybiBjdXJyUHJpY2U7XG59XG5cbi8qIC0tLS0tIENhbGN1bGF0ZSB0b3RhbHMgZnJvbSBhbGwgZW50cmllcyBhbmQgZGlzcGxheSB0aGVtIC0tLS0tICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY1RvdGFsKGVudHJpZXMsIGN1cnJlbmN5KSB7XG4gIGxldCB0b3RhbEJ1eVZhbHVlID0gMDtcbiAgbGV0IHRvdGFsQ3VyclZhbHVlID0gMDtcbiAgbGV0IHRvdGFsRGVsdGEgPSAwO1xuICBsZXQgdG90YWxEZWx0YVBlcmMgPSAwO1xuXG4gIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgdG90YWxCdXlWYWx1ZSArPSBwYXJzZUZsb2F0KGVudHJ5LmJ1eVRvdGFsVmFsdWUpO1xuICAgIHRvdGFsQ3VyclZhbHVlICs9IHBhcnNlRmxvYXQoZW50cnkuY3VyclRvdGFsVmFsdWUpO1xuICB9KTtcblxuICB0b3RhbEJ1eVZhbHVlID0gdG90YWxCdXlWYWx1ZS50b0ZpeGVkKDIpO1xuICB0b3RhbEN1cnJWYWx1ZSA9IHRvdGFsQ3VyclZhbHVlLnRvRml4ZWQoMik7XG5cbiAgdG90YWxEZWx0YSA9ICh0b3RhbEN1cnJWYWx1ZSAtIHRvdGFsQnV5VmFsdWUpLnRvRml4ZWQoMik7XG4gIHRvdGFsRGVsdGFQZXJjID0gKCh0b3RhbERlbHRhIC8gdG90YWxCdXlWYWx1ZSkgKiAxMDApLnRvRml4ZWQoMik7XG4gIGlmIChlbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgICBkaXNwbGF5VG90YWxzKFxuICAgICAgdG90YWxCdXlWYWx1ZSxcbiAgICAgIHRvdGFsQ3VyclZhbHVlLFxuICAgICAgdG90YWxEZWx0YSxcbiAgICAgIHRvdGFsRGVsdGFQZXJjLFxuICAgICAgY3VycmVuY3lcbiAgICApO1xuICB9IC8vIGlmIHRoZXJlIGFyZSBubyBlbnRyaWVzXG4gIGVsc2UgY2xlYXJUb3RhbHMoKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJUb3RhbHMoKSB7XG4gIGxldCB0b3RhbHNBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbHMtY29udGFpbmVyXCIpO1xuICB0b3RhbHNBcmVhLmlubmVySFRNTCA9IFwiXCI7XG59XG4iLCJpbXBvcnQgeyBkaXNwbGF5RGF0YSB9IGZyb20gXCIuL01hcmtldENhcERhdGFEaXNwbGF5LmpzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXR1cE1hcmtldENhcERhdGEoY3VycmVuY3kpIHtcbiAgLy8gZ2V0IHRvcCAxMCBjb2lucyBieSB0cmFkZSB2b2x1bWUgZnJvbSBDcnlwdG9jb21wYXJlIEFQSVxuICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL21pbi1hcGkuY3J5cHRvY29tcGFyZS5jb20vZGF0YS90b3AvbWt0Y2FwZnVsbD9saW1pdD0xMCZ0c3ltPSR7Y3VycmVuY3l9YFxuICApO1xuICBsZXQgZGF0YUpTT04gPSBhd2FpdCBkYXRhLmpzb24oKTtcbiAgbGV0IGNvaW5EYXRhID0gZGF0YUpTT04uRGF0YTtcblxuICBsZXQgZmlsdGVyZWRDb2luRGF0YSA9IFtdO1xuXG4gIC8vIGZpbHRlciByZWxldmFudCBjb2luIGluZm9ybWF0aW9uIHRvIGJlIHNob3duIG9uIHNjcmVlblxuICBjb2luRGF0YS5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcbiAgICBmaWx0ZXJlZENvaW5EYXRhW2luZGV4XSA9IHtcbiAgICAgIG5hbWU6IGl0ZW0uQ29pbkluZm8uTmFtZSxcbiAgICAgIGZ1bGxOYW1lOiBpdGVtLkNvaW5JbmZvLkZ1bGxOYW1lLFxuICAgICAgcHJpY2U6IGl0ZW0uUkFXW2N1cnJlbmN5XS5QUklDRS50b0ZpeGVkKDIpLFxuICAgICAgdm9sdW1lOiAoaXRlbS5SQVdbY3VycmVuY3ldLlRPVEFMVk9MVU1FMjRIVE8gLyAxMDAwMDAwMDAwKS50b0ZpeGVkKDMpLFxuICAgICAgbWFya2V0Q2FwOiAoaXRlbS5SQVdbY3VycmVuY3ldLk1LVENBUCAvIDEwMDAwMDAwMDApLnRvRml4ZWQoMyksXG4gICAgICBkZWx0YVBlcmM6IGl0ZW0uUkFXW2N1cnJlbmN5XS5DSEFOR0VQQ1QyNEhPVVIudG9GaXhlZCgyKVxuICAgIH07XG4gIH0pO1xuICBkaXNwbGF5RGF0YShmaWx0ZXJlZENvaW5EYXRhLCBjdXJyZW5jeSk7XG59XG4iLCJpbXBvcnQgeyBnZXRDdXJyZW5jeVN5bWJvbCB9IGZyb20gXCIuL0N1cnJlbmN5TWFuYWdlci5qc1wiO1xuXG4vLyBzaG93IGRhdGEgcmVsYXRlZCB0byB0b3AgMTAgdHJhZGluZyBjcnlwdG8gY29pbnNcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5RGF0YShjb2luRGF0YSwgY3VycmVuY3kpIHtcbiAgbGV0IG1hcmtldENhcFNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcmtldC1jYXAtc2VjdGlvblwiKTtcbiAgbGV0IGN1cnJlbmN5U3ltYm9sID0gZ2V0Q3VycmVuY3lTeW1ib2woY3VycmVuY3kpO1xuXG4gIGNvaW5EYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgbGV0IHRhYmxlUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YWJsZVJvdy5jbGFzc05hbWUgPSBcInRhYmxlLXJvd1wiO1xuXG4gICAgbGV0IGNvaW5OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgY29pbk5hbWUuY2xhc3NOYW1lID0gXCJ0YWJsZS1jb2luLW5hbWVcIjtcbiAgICBjb2luTmFtZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRvZ2dsZVwiLCBcIm1vZGFsXCIpO1xuICAgIGNvaW5OYW1lLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCIjY29pbi1jaGFydC1jb250YWluZXJcIik7XG4gICAgY29pbk5hbWUuaW5uZXJIVE1MID0gaXRlbS5uYW1lO1xuXG4gICAgbGV0IGNvaW5GdWxsTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGNvaW5GdWxsTmFtZS5jbGFzc05hbWUgPSBcInRhYmxlLWNvaW4tZnVsbC1uYW1lXCI7XG4gICAgY29pbkZ1bGxOYW1lLmlubmVySFRNTCA9IGAoJHtpdGVtLmZ1bGxOYW1lfSlgO1xuXG4gICAgbGV0IGNvaW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvaW5EaXYuY2xhc3NOYW1lID0gXCJjb2luLWRpdiBncmlkLWNlbGxcIjtcbiAgICBjb2luRGl2LmFwcGVuZENoaWxkKGNvaW5OYW1lKTtcbiAgICBjb2luRGl2LmFwcGVuZENoaWxkKGNvaW5GdWxsTmFtZSk7XG5cbiAgICBsZXQgY29pblByaWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgY29pblByaWNlLmNsYXNzTmFtZSA9IFwidGFibGUtY29pbi1wcmljZSBncmlkLWNlbGxcIjtcbiAgICBjb2luUHJpY2UuaW5uZXJIVE1MID0gYCR7Y3VycmVuY3lTeW1ib2x9ICR7aXRlbS5wcmljZX1gO1xuXG4gICAgbGV0IGNvaW5Wb2x1bWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBjb2luVm9sdW1lLmNsYXNzTmFtZSA9IFwidGFibGUtY29pbi12b2x1bWUgZ3JpZC1jZWxsXCI7XG4gICAgY29pblZvbHVtZS5pbm5lckhUTUwgPSBgJHtjdXJyZW5jeVN5bWJvbH0gJHtpdGVtLnZvbHVtZX0gQmA7XG5cbiAgICBsZXQgY29pbk1hcmtldENhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGNvaW5NYXJrZXRDYXAuY2xhc3NOYW1lID0gXCJ0YWJsZS1jb2luLW1hcmtldC1jYXAgZ3JpZC1jZWxsXCI7XG4gICAgY29pbk1hcmtldENhcC5pbm5lckhUTUwgPSBgJHtjdXJyZW5jeVN5bWJvbH0gJHtpdGVtLm1hcmtldENhcH0gQmA7XG5cbiAgICBsZXQgY29pbkRlbHRhUGVyYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGlmIChpdGVtLmRlbHRhUGVyYyA+PSAwKSB7XG4gICAgICBjb2luRGVsdGFQZXJjLmNsYXNzTmFtZSA9IFwidGFibGUtY29pbi1kZWx0YS1wZXJjIGdyaWQtY2VsbCBwcm9maXRcIjtcbiAgICAgIGNvaW5EZWx0YVBlcmMuaW5uZXJIVE1MID0gYCR7aXRlbS5kZWx0YVBlcmN9JWA7XG4gICAgfSBlbHNlIGlmIChpdGVtLmRlbHRhUGVyYyA8IDApIHtcbiAgICAgIGNvaW5EZWx0YVBlcmMuY2xhc3NOYW1lID0gXCJ0YWJsZS1jb2luLWRlbHRhLXBlcmMgZ3JpZC1jZWxsIGxvc3NcIjtcbiAgICAgIGNvaW5EZWx0YVBlcmMuaW5uZXJIVE1MID0gYC0ke01hdGguYWJzKGl0ZW0uZGVsdGFQZXJjKX0lYDtcbiAgICB9XG5cbiAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChjb2luRGl2KTtcbiAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChjb2luUHJpY2UpO1xuICAgIHRhYmxlUm93LmFwcGVuZENoaWxkKGNvaW5Wb2x1bWUpO1xuICAgIHRhYmxlUm93LmFwcGVuZENoaWxkKGNvaW5NYXJrZXRDYXApO1xuICAgIHRhYmxlUm93LmFwcGVuZENoaWxkKGNvaW5EZWx0YVBlcmMpO1xuXG4gICAgbWFya2V0Q2FwU2VjdGlvbi5hcHBlbmRDaGlsZCh0YWJsZVJvdyk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgZGlzcGxheU5ld3NGZWVkIH0gZnJvbSBcIi4vTmV3c0ZlZWREaXNwbGF5LmpzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXR1cE5ld3NGZWVkKCkge1xuICBsZXQgZGF0YUFQSSA9IGF3YWl0IGZldGNoKFxuICAgIFwiaHR0cHM6Ly9taW4tYXBpLmNyeXB0b2NvbXBhcmUuY29tL2RhdGEvdjIvbmV3cy8/bGFuZz1FTlwiXG4gICk7XG4gIGxldCBkYXRhSlNPTiA9IGF3YWl0IGRhdGFBUEkuanNvbigpO1xuICBsZXQgbmV3c0ZlZWRJdGVtcyA9IGRhdGFKU09OLkRhdGE7XG5cbiAgZGlzcGxheU5ld3NGZWVkKG5ld3NGZWVkSXRlbXMpO1xufVxuIiwibGV0IG5ld3NGZWVkQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3cy1hcmVhXCIpO1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheU5ld3NGZWVkKGl0ZW1zKSB7XG4gIC8vIG5ld3MgaXRlbXNcbiAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICBsZXQgbmV3c0l0ZW1EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG5ld3NJdGVtRGl2LmNsYXNzTmFtZSA9IFwibmV3cy1pdGVtLWRpdlwiO1xuXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpO1xuICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwibmV3cy10aXRsZVwiO1xuICAgIHRpdGxlLmlubmVySFRNTCA9IGl0ZW0udGl0bGU7XG5cbiAgICBsZXQgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGltYWdlLmNsYXNzTmFtZSA9IFwibmV3cy1pbWFnZVwiO1xuICAgIGltYWdlLnNyYyA9IGl0ZW0uaW1hZ2V1cmw7XG5cbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGJvZHkuY2xhc3NOYW1lID0gXCJuZXdzLWJvZHlcIjtcbiAgICBib2R5LmlubmVySFRNTCA9IGl0ZW0uYm9keTtcblxuICAgIGxldCB1cmwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB1cmwuY2xhc3NOYW1lID0gXCJuZXdzLXVybFwiO1xuICAgIHVybC5pbm5lckhUTUwgPSBpdGVtLnVybDtcbiAgICB1cmwuaHJlZiA9IGl0ZW0udXJsO1xuICAgIHVybC50YXJnZXQgPSBcIl9ibGFua1wiO1xuXG4gICAgbmV3c0l0ZW1EaXYuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIG5ld3NJdGVtRGl2LmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICBuZXdzSXRlbURpdi5hcHBlbmRDaGlsZChib2R5KTtcbiAgICBuZXdzSXRlbURpdi5hcHBlbmRDaGlsZCh1cmwpO1xuXG4gICAgbmV3c0ZlZWRBcmVhLmFwcGVuZENoaWxkKG5ld3NJdGVtRGl2KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQge1xuICBkaXNwbGF5RW50cmllcyxcbiAgZGlzcGxheVRvdGFscyxcbiAgY2xlYXJUb3RhbHNcbn0gZnJvbSBcIi4vRW50cmllc0Rpc3BsYXkuanNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBvcnRmb2xpbyhlbnRyaWVzLCBlbnRyaWVzU2VjdGlvbiwgY3VycmVuY3kpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGN1cnJQcmljZURhdGEgPSBhd2FpdCBnZXRDdXJyUHJpY2UoZW50cmllc1tpXS5jb2luLCBjdXJyZW5jeSk7XG4gICAgbGV0IGN1cnJQcmljZUpTT04gPSBhd2FpdCBjdXJyUHJpY2VEYXRhLmpzb24oKTtcbiAgICBsZXQgY3VyclByaWNlID0gTWF0aC5yb3VuZChjdXJyUHJpY2VKU09OW2N1cnJlbmN5XSk7XG5cbiAgICBsZXQgY3VyclRvdGFsVmFsdWUgPSBNYXRoLnJvdW5kKGVudHJpZXNbaV0uYW1vdW50ICogZW50cmllc1tpXS5jdXJyUHJpY2UpO1xuXG4gICAgbGV0IGRlbHRhID0gTWF0aC5yb3VuZChcbiAgICAgIGVudHJpZXNbaV0uY3VyclRvdGFsVmFsdWUgLSBlbnRyaWVzW2ldLmJ1eVRvdGFsVmFsdWVcbiAgICApO1xuICAgIGxldCBkZWx0YUZyYWN0aW9uID0gZW50cmllc1tpXS5kZWx0YSAvIGVudHJpZXNbaV0uYnV5VG90YWxWYWx1ZTtcbiAgICBsZXQgZGVsdGFQZXJjID0gTWF0aC5yb3VuZChkZWx0YUZyYWN0aW9uICogMTAwKTtcblxuICAgIGVudHJpZXNbaV0uY3VyclByaWNlID0gY3VyclByaWNlO1xuICAgIGVudHJpZXNbaV0uY3VyclRvdGFsVmFsdWUgPSBjdXJyVG90YWxWYWx1ZTtcbiAgICBlbnRyaWVzW2ldLmRlbHRhID0gZGVsdGE7XG4gICAgZW50cmllc1tpXS5kZWx0YVBlcmMgPSBkZWx0YVBlcmM7XG4gIH1cbiAgZGlzcGxheUVudHJpZXMoZW50cmllcyk7XG4gIHVwZGF0ZUVudHJpZXMoZW50cmllcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVFbnRyaWVzKGVudHJpZXMpIHtcbiAgcmV0dXJuIGVudHJpZXM7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyUHJpY2UoY29pbikge1xuICBjb25zb2xlLmxvZyhjb2luKTtcbiAgbGV0IGN1cnJQcmljZSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL21pbi1hcGkuY3J5cHRvY29tcGFyZS5jb20vZGF0YS9wcmljZT9mc3ltPSR7Y29pbn0mdHN5bXM9VVNEYFxuICApO1xuICByZXR1cm4gY3VyclByaWNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY1RvdGFsKGVudHJpZXMpIHtcbiAgbGV0IHRvdGFsQnV5VmFsdWUgPSAwO1xuICBsZXQgdG90YWxDdXJyVmFsdWUgPSAwO1xuICBsZXQgdG90YWxEZWx0YSA9IDA7XG4gIGxldCB0b3RhbERlbHRhUGVyYyA9IDA7XG5cbiAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICB0b3RhbEJ1eVZhbHVlICs9IGVudHJ5LmJ1eVRvdGFsVmFsdWU7XG4gICAgdG90YWxDdXJyVmFsdWUgKz0gZW50cnkuY3VyclRvdGFsVmFsdWU7XG4gIH0pO1xuXG4gIHRvdGFsRGVsdGEgPSB0b3RhbEN1cnJWYWx1ZSAtIHRvdGFsQnV5VmFsdWU7XG4gIHRvdGFsRGVsdGFQZXJjID0gTWF0aC5yb3VuZCgodG90YWxEZWx0YSAvIHRvdGFsQnV5VmFsdWUpICogMTAwKTtcbiAgaWYgKGVudHJpZXMubGVuZ3RoID4gMCkge1xuICAgIGRpc3BsYXlUb3RhbHModG90YWxCdXlWYWx1ZSwgdG90YWxDdXJyVmFsdWUsIHRvdGFsRGVsdGEsIHRvdGFsRGVsdGFQZXJjKTtcbiAgfSBlbHNlIGNsZWFyVG90YWxzKCk7XG59XG4iLCJpbXBvcnQgeyBzZXR1cFZvbHVtZUNoYXJ0LCBzZXR1cENvaW5DaGFydHMgfSBmcm9tIFwiLi9DaGFydHMuanNcIjtcbmltcG9ydCB7IHNldHVwTWFya2V0Q2FwRGF0YSB9IGZyb20gXCIuL01hcmtldENhcERhdGEuanNcIjtcbmltcG9ydCB7IHNldHVwTmV3c0ZlZWQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9OZXdzRmVlZERhdGEuanNcIjtcblxuY29uc3QgbG9nZ2VkSW5MaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubG9nZ2VkLWluXCIpO1xuY29uc3QgbG9nZ2VkT3V0TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxvZ2dlZC1vdXRcIik7XG5cbmxldCBsb2dpbk1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luLW1lc3NhZ2Utc2VjdGlvblwiKTtcbmNvbnN0IGVudHJpZXNTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbnRyaWVzLXNlY3Rpb25cIik7XG5jb25zdCB2b2xDaGFydFNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZvbC1jaGFydC1zZWN0aW9uXCIpO1xuY29uc3QgbWFya2V0Q2FwU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFya2V0LWNhcC1zZWN0aW9uXCIpO1xuXG5leHBvcnQgY29uc3Qgc2V0dXBVSSA9ICh1c2VyLCBjdXJyZW5jeSwgdXNlcm5hbWUpID0+IHtcbiAgLy8gdG9nZ2xlIG5hdiBsaW5rcyBkZXBlbmRpbmcgb24gd2hldGhlciB1c2VyIGlzIGxvZ2dlZCBpbiBvciBub3RcbiAgaWYgKHVzZXIpIHtcbiAgICBsb2dpbk1lc3NhZ2UuY2xhc3NOYW1lID0gXCJpbnZpc2libGVcIjtcblxuICAgIGxvZ2dlZEluTGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgIGxpbmsuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9KTtcbiAgICBsb2dnZWRPdXRMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgbGluay5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSk7XG5cbiAgICBsZXQgdXNlcm5hbWVBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWxjb21lLW1lc3NhZ2VcIik7XG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCBob3VyID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGxldCBncmVldGluZyA9IFwiXCI7XG5cbiAgICBpZiAoaG91ciA8IDEyKSBncmVldGluZyA9IFwiR29vZCBNb3JuaW5nXCI7XG4gICAgZWxzZSBpZiAoaG91ciA+IDEyICYmIGhvdXIgPCAxOCkgZ3JlZXRpbmcgPSBcIkdvb2QgQWZ0ZXJub29uXCI7XG4gICAgZWxzZSBpZiAoaG91ciA+IDE4KSBncmVldGluZyA9IFwiR29vZCBFdmVuaW5nXCI7XG5cbiAgICB1c2VybmFtZUFyZWEuaW5uZXJIVE1MID0gYCR7Z3JlZXRpbmd9LCAke3VzZXJuYW1lfWA7XG5cbiAgICBzZXR1cFZvbHVtZUNoYXJ0KGN1cnJlbmN5KTtcbiAgICBzZXR1cENvaW5DaGFydHMoY3VycmVuY3ksIHVzZXIpO1xuICAgIHNldHVwTmV3c0ZlZWQoKTtcbiAgICBzZXR1cE1hcmtldENhcERhdGEoY3VycmVuY3kpO1xuICB9IGVsc2Uge1xuICAgIC8vIGlmIHVzZXIgbG9nZ2VkIG91dFxuICAgIGxvZ2dlZEluTGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgIGxpbmsuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0pO1xuICAgIGxvZ2dlZE91dExpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICBsaW5rLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfSk7XG5cbiAgICAvLyBjbGVhciBkYXRhIGFyZWFzXG4gICAgZW50cmllc1NlY3Rpb24uaW5uZXJIVE1MID0gXCJcIjtcbiAgICB2b2xDaGFydFNlY3Rpb24uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBtYXJrZXRDYXBTZWN0aW9uLmlubmVySFRNTCA9IFwiXCI7XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBjb21wbGV0ZUVudHJpZXMsIGNhbGNUb3RhbCB9IGZyb20gXCIuLi9jb21wb25lbnRzL0VudHJpZXNNYW5hZ2VyLmpzXCI7XG5pbXBvcnQgeyBkaXNwbGF5RW50cmllcyB9IGZyb20gXCIuLi9jb21wb25lbnRzL0VudHJpZXNEaXNwbGF5LmpzXCI7XG5pbXBvcnQgeyBzZXR1cFVJIH0gZnJvbSBcIi4vVUkuanNcIjtcbmltcG9ydCB7IHNldHVwRGF0YU9wdGlvbnMgfSBmcm9tIFwiLi9DUlVELmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VyIHtcbiAgY29uc3RydWN0b3IodXNlciwgdXNlcm5hbWUsIGN1cnJlbmN5LCBvcmRlcikge1xuICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgIHRoaXMuY3VycmVuY3kgPSBjdXJyZW5jeTtcbiAgICB0aGlzLm9yZGVyID0gb3JkZXI7XG4gIH1cblxuICAvKiBDUkVBVEUgVVNFUiBJTlRFUkZBQ0UgKi9cbiAgcmVuZGVyVUkoKSB7XG4gICAgc2V0dXBVSSh0aGlzLnVzZXIsIHRoaXMuY3VycmVuY3ksIHRoaXMudXNlcm5hbWUpO1xuICB9XG5cbiAgLyogRElTUExBWSBDVVJSRU5UIFBPUlRGT0xJTyAqL1xuICBhc3luYyByZW5kZXJFbnRyaWVzKCkge1xuICAgIC8vIGdldCB1c2VyJ3MgY3VycmVudCBlbnRyaWVzIGZyb20gZGF0YWJhc2VcbiAgICBsZXQgc25hcHNob3QgPSBcIlwiO1xuXG4gICAgLy8gaWYgb3JkZXJlZCBieSBkYXRlXG4gICAgaWYgKHRoaXMub3JkZXIgPT09IFwiZGF0ZVwiKSB7XG4gICAgICBzbmFwc2hvdCA9IGF3YWl0IGRiXG4gICAgICAgIC5jb2xsZWN0aW9uKFwidXNlcnNcIilcbiAgICAgICAgLmRvYyh0aGlzLnVzZXIudWlkKVxuICAgICAgICAuY29sbGVjdGlvbihcImVudHJpZXNcIilcbiAgICAgICAgLmdldCgpO1xuICAgIH1cbiAgICAvLyBpZiBvcmRlcmVkIGJ5IGNvaW5cbiAgICBlbHNlIGlmICh0aGlzLm9yZGVyID09PSBcImNvaW5cIikge1xuICAgICAgc25hcHNob3QgPSBhd2FpdCBkYlxuICAgICAgICAuY29sbGVjdGlvbihcInVzZXJzXCIpXG4gICAgICAgIC5kb2ModGhpcy51c2VyLnVpZClcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJlbnRyaWVzXCIpXG4gICAgICAgIC5vcmRlckJ5KFwiY29pblwiKVxuICAgICAgICAuZ2V0KCk7XG4gICAgfVxuXG4gICAgLy8gcGFyc2UgdGhlIGRhdGEgZnJvbSB0aGUgY3VycmVudCBzbmFwc2hvdFxuICAgIGxldCBlbnRyaWVzREIgPSBzbmFwc2hvdC5kb2NzLm1hcChkb2MgPT4gZG9jLmRhdGEoKSk7XG5cbiAgICAvLyBjYWxjdWxhdGUgdGhlIGR5bmFtaWMgcHJpY2UvZGVsdGEgdmFsdWVzIGZvciBlYWNoIGVudHJ5XG4gICAgbGV0IGVudHJpZXMgPSBhd2FpdCBjb21wbGV0ZUVudHJpZXMoZW50cmllc0RCLCB0aGlzLmN1cnJlbmN5KTtcblxuICAgIC8vIHNldCB0aGUgZGVmYXVsdCBjdXJyZW5jeSBvbiB0aGUgY3VycmVuY3kgc2VsZWN0b3IgbWVudVxuICAgIGNvbnN0IGN1cnJlbmN5U2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbmN5LXNlbGVjdG9yXCIpO1xuICAgIGN1cnJlbmN5U2VsZWN0b3IudmFsdWUgPSB0aGlzLmN1cnJlbmN5O1xuXG4gICAgLy8gZGlzcGxheSB0aGUgY29tcGxldGVkIGVudHJpZXMgKyB0b3RhbHNcbiAgICBkaXNwbGF5RW50cmllcyhlbnRyaWVzLCB0aGlzLmN1cnJlbmN5KTtcbiAgICBjYWxjVG90YWwoZW50cmllcywgdGhpcy5jdXJyZW5jeSk7XG4gIH1cblxuICAvKiBTRVRVUCBFVkVOVCBMSVNURU5FUlMgRk9SIENSVUQgT1BFUkFUSU9OUyAqL1xuICBjcmVhdGVEYXRhT3B0aW9ucygpIHtcbiAgICBzZXR1cERhdGFPcHRpb25zKHRoaXMudXNlciwgdGhpcyk7XG4gIH1cblxuICAvKiBVUERBVEUgQU5EIERJU1BMQVkgTkVXIENIT1NFTiBDVVJSRU5DWSAqL1xuICBhc3luYyB1cGRhdGVDdXJyZW5jeShuZXdDdXJyZW5jeSkge1xuICAgIC8vIHVwZGF0ZSB1c2VyJ3MgZGVmYXVsdCBjdXJyZW5jeSBpbiBkYXRhYmFzZVxuXG4gICAgZGIuY29sbGVjdGlvbihcInVzZXJzXCIpXG4gICAgICAuZG9jKHRoaXMudXNlci51aWQpXG4gICAgICAudXBkYXRlKHtcbiAgICAgICAgY3VycmVuY3k6IG5ld0N1cnJlbmN5XG4gICAgICB9KTtcblxuICAgIC8vIHNldCBwcmV2IGFuZCBjdXJyIGN1cnJlbmNpZXMgYW5kIGdldCBjb252ZXJzaW9uIHJhdGUgZnJvbSBjdXJyZW5jeSBBUElcbiAgICBsZXQgcHJldkN1cnJlbmN5ID0gdGhpcy5jdXJyZW5jeTtcbiAgICB0aGlzLmN1cnJlbmN5ID0gbmV3Q3VycmVuY3k7XG5cbiAgICBjb25zdCBhcGlLZXkgPSBcIjk1ZGM4ZWM0NTc1Y2RkOTM4ZDE0XCI7XG4gICAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2ZyZWUuY3VycmNvbnYuY29tL2FwaS92Ny9jb252ZXJ0P3E9JHtwcmV2Q3VycmVuY3l9XyR7bmV3Q3VycmVuY3l9JmNvbXBhY3Q9dWx0cmEmYXBpS2V5PSR7YXBpS2V5fWBcbiAgICApO1xuICAgIGxldCBkYXRhSlNPTiA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gICAgbGV0IGNvbnZlcnNpb25SYXRlID0gZGF0YUpTT05bYCR7cHJldkN1cnJlbmN5fV8ke25ld0N1cnJlbmN5fWBdO1xuXG4gICAgbGV0IHNuYXBzaG90ID0gYXdhaXQgZGJcbiAgICAgIC5jb2xsZWN0aW9uKFwidXNlcnNcIilcbiAgICAgIC5kb2ModGhpcy51c2VyLnVpZClcbiAgICAgIC5jb2xsZWN0aW9uKFwiZW50cmllc1wiKVxuICAgICAgLmdldCgpO1xuXG4gICAgc25hcHNob3QuZG9jcy5mb3JFYWNoKGRvYyA9PiB7XG4gICAgICBsZXQgYnV5UHJpY2UgPSBkb2MuZGF0YSgpLmJ1eVByaWNlO1xuICAgICAgbGV0IG5ld0J1eVByaWNlID0gTWF0aC5yb3VuZChidXlQcmljZSAqIGNvbnZlcnNpb25SYXRlKTtcblxuICAgICAgZG9jLnJlZi51cGRhdGUoe1xuICAgICAgICBidXlQcmljZTogbmV3QnV5UHJpY2VcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyRW50cmllcygpO1xuICAgIHRoaXMucmVuZGVyVUkoKTtcbiAgfVxuXG4gIHNldE9yZGVyKG9yZGVyKSB7XG4gICAgZGIuY29sbGVjdGlvbihcInVzZXJzXCIpXG4gICAgICAuZG9jKHRoaXMudXNlci51aWQpXG4gICAgICAudXBkYXRlKHtcbiAgICAgICAgb3JkZXI6IG9yZGVyXG4gICAgICB9KTtcblxuICAgIHRoaXMub3JkZXIgPSBvcmRlcjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgc2V0dXBVSSB9IGZyb20gXCIuLi9jb21wb25lbnRzL1VJLmpzXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlci5qc1wiO1xuaW1wb3J0IHsgc2V0dXBEQkxpc3RlbmVyIH0gZnJvbSBcIi4vREJMaXN0ZW5lci5qc1wiO1xuXG5leHBvcnQgY29uc3Qgc2V0dXBBdXRoID0gYXV0aCA9PiB7XG4gIC8qIC0tLS0tIGxvZ2luL2xvZ291dCBzdGF0ZSBjaGFuZ2UgLS0tLS0gKi9cbiAgYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZWQodXNlciA9PiB7XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIC8vIGdldCB1c2VyJ3MgdXNlcm5hbWUgYW5kIGN1cnJlbmN5IG9mIGNob2ljZVxuICAgICAgZGIuY29sbGVjdGlvbihcInVzZXJzXCIpXG4gICAgICAgIC5kb2ModXNlci51aWQpXG4gICAgICAgIC5nZXQoKVxuICAgICAgICAudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSBzbmFwc2hvdC5kYXRhKCk7XG4gICAgICAgICAgbGV0IHVzZXJuYW1lID0gZGF0YS51c2VybmFtZTtcbiAgICAgICAgICBsZXQgY3VycmVuY3kgPSBkYXRhLmN1cnJlbmN5O1xuICAgICAgICAgIGxldCBvcmRlciA9IGRhdGEub3JkZXI7XG5cbiAgICAgICAgICAvL3NldHVwIHBvcnRmb2xpbyBncmVldGluZ1xuICAgICAgICAgIGNvbnN0IHBvcnRmb2xpb0hlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW50cmllcy10aXRsZVwiKTtcbiAgICAgICAgICBwb3J0Zm9saW9IZWFkZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICA8aDM+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXdhbGxldFwiPjwvaT4mbmJzcDsmbmJzcDske3VzZXJuYW1lfSdzIFBvcnRmb2xpbyBcbiAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICBgO1xuXG4gICAgICAgICAgLy8gc2V0dXAgbmV3IHVzZXIgYmFzZWQgb24gdGhlIHJldHJlaXZlZCBpbmZvcm1hdGlvblxuICAgICAgICAgIGNvbnN0IGN1cnJVc2VyID0gbmV3IFVzZXIodXNlciwgdXNlcm5hbWUsIGN1cnJlbmN5LCBvcmRlcik7XG5cbiAgICAgICAgICAvLyBzZXQgdXAgdXNlciAnY3J1ZCcgb3B0aW9ucyBmb3IgdXNlclxuICAgICAgICAgIGN1cnJVc2VyLmNyZWF0ZURhdGFPcHRpb25zKCk7XG5cbiAgICAgICAgICAvLyBzZXQgdXAgREIgbGlzdGVuZXIsIHRvIG1vbml0b3IgY2hhbmdlcyBpbiB0aGUgdXNlcidzIGRhdGFiYXNlXG4gICAgICAgICAgc2V0dXBEQkxpc3RlbmVyKGN1cnJVc2VyLCB1c2VyKTtcblxuICAgICAgICAgIC8vIHNldCB1cCBhcHAgVUksIGluY2x1ZGluZyBjaGFydHMsIGRhdGEgdGFibGVzIGFuZCBuZXdzIGZlZWRcbiAgICAgICAgICBjdXJyVXNlci5yZW5kZXJVSSh1c2VyKTtcblxuICAgICAgICAgIC8vIGdldCB1c2VyJ3MgZW50cmllcyBmcm9tIGRiIGFuZCBkaXNwbGF5IHRoZW0gb24gc2NyZWVuXG4gICAgICAgICAgY3VyclVzZXIucmVuZGVyRW50cmllcygpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0dXBVSSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLyogLS0tLS0gc2lnbnVwIC0tLS0tICovXG4gIGNvbnN0IHNpZ251cEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ251cC1mb3JtXCIpO1xuXG4gIHNpZ251cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBldmVudCA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIGdldCBuZXcgdXNlciBkZXRhaWxzXG4gICAgbGV0IHVzZXJuYW1lID0gc2lnbnVwRm9ybVtcInNpZ251cC11c2VybmFtZVwiXS52YWx1ZTtcbiAgICBsZXQgZW1haWwgPSBzaWdudXBGb3JtW1wic2lnbnVwLWVtYWlsXCJdLnZhbHVlO1xuICAgIGxldCBwYXNzd29yZCA9IHNpZ251cEZvcm1bXCJzaWdudXAtcGFzc3dvcmRcIl0udmFsdWU7XG4gICAgbGV0IGN1cnJlbmN5ID0gc2lnbnVwRm9ybVtcInNpZ251cC1jdXJyZW5jeVwiXS52YWx1ZTtcblxuICAgIC8vIGNyZWF0ZSBuZXcgdXNlciBhbmQgYWxzbyBjcmVhdGUgdXNlciBmaWxlIGluICd1c2VycycgY29sbGVjdGlvbiB3aXRoIHVzZXJuYW1lLCB1c2luZyB1c2VycyB1bmlxdWUgSUQgdG8gbGluayB0aGUgdHdvXG4gICAgYXV0aFxuICAgICAgLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3dvcmQpXG4gICAgICAudGhlbih1c2VyRGF0YSA9PiB7XG4gICAgICAgIHJldHVybiBkYlxuICAgICAgICAgIC5jb2xsZWN0aW9uKFwidXNlcnNcIilcbiAgICAgICAgICAuZG9jKHVzZXJEYXRhLnVzZXIudWlkKVxuICAgICAgICAgIC5zZXQoe1xuICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgY3VycmVuY3k6IGN1cnJlbmN5LFxuICAgICAgICAgICAgb3JkZXI6IFwiZGF0ZVwiXG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2lnbnVwRm9ybS5yZXNldCgpKTtcblxuICAgICQoXCIjbW9kYWwtc2lnbnVwXCIpLm1vZGFsKFwiaGlkZVwiKTtcbiAgfSk7XG5cbiAgLyogLS0tLS0gbG9naW4gLS0tLS0gKi9cbiAgY29uc3QgbG9naW5Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbi1mb3JtXCIpO1xuXG4gIGxvZ2luRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgZW1haWwgPSBsb2dpbkZvcm1bXCJsb2dpbi1lbWFpbFwiXS52YWx1ZTtcbiAgICBjb25zdCBwYXNzd29yZCA9IGxvZ2luRm9ybVtcImxvZ2luLXBhc3N3b3JkXCJdLnZhbHVlO1xuXG4gICAgYXV0aC5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3dvcmQpLnRoZW4odXNlckRhdGEgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJsb2dnZWQgaW5cIiwgdXNlckRhdGEudXNlci51aWQpO1xuICAgICAgbG9naW5Gb3JtLnJlc2V0KCk7XG4gICAgfSk7XG5cbiAgICAkKFwiI21vZGFsLWxvZ2luXCIpLm1vZGFsKFwiaGlkZVwiKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0sIDEwMDApO1xuICB9KTtcblxuICAvKiAtLS0tLSBsb2dvdXQgLS0tLS0gKi9cbiAgY29uc3QgbG9nb3V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvdXRcIik7XG4gIGxvZ291dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgYXV0aC5zaWduT3V0KCkudGhlbigoKSA9PiB7XG4gICAgICBzZXR1cFVJKCk7XG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9LCAxMDAwKTtcbiAgfSk7XG59O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIHNldHVwREJMaXN0ZW5lcihVc2VyLCB1c2VyREIpIHtcbiAgLy9yZWFsdGltZSBkYXRhYmFzZSBsaXN0ZW5lclxuICBkYi5jb2xsZWN0aW9uKFwidXNlcnNcIilcbiAgICAuZG9jKHVzZXJEQi51aWQpXG4gICAgLmNvbGxlY3Rpb24oXCJlbnRyaWVzXCIpXG4gICAgLm9uU25hcHNob3Qoc25hcHNob3QgPT4ge1xuICAgICAgbGV0IGNoYW5nZXMgPSBzbmFwc2hvdC5kb2NDaGFuZ2VzKCk7XG4gICAgICBjaGFuZ2VzLmZvckVhY2goY2hhbmdlID0+IHtcbiAgICAgICAgVXNlci5yZW5kZXJFbnRyaWVzKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IHNldHVwQXV0aCB9IGZyb20gXCIuL2RhdGFiYXNlL0F1dGhNYW5hZ2VyLmpzXCI7XG5pbXBvcnQgeyBzZXR1cEF1dG9Db21wbGV0ZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvQXV0b0NvbXBsZXRlLmpzXCI7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIC8vIGluaXRpYWxpc2UgYXV0aCBtYW5hZ2VyXG4gIGNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG4gIC8vIHNldHVwIGRhdGFiYXNlIGF1dGhvcmlzYXRpb24gbWFuYWdlclxuICBzZXR1cEF1dGgoYXV0aCk7XG4gIC8vIHNldCB1cCAnTmV3IEVudHJ5JyBhdXRvY29tcGxldGUgbWVudSBmb3IgdXNlclxuICBzZXR1cEF1dG9Db21wbGV0ZSgpO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9