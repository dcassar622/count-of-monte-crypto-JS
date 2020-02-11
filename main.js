import { displayEntries } from "./components/Display.js";
import {
  getEntryData,
  clearForm,
  updatePortfolio,
  updateEntries
} from "./components/DataManager.js";

let addEntryBtn = document.getElementById("add-entry-btn");
let formContainer = document.getElementById("form-container");
let formHidden = true;

let submitformBtn = document.getElementById("submit-form-btn");

let refreshBtn = document.getElementById("refresh-btn");

let entriesSection = document.getElementById("entries-container");
let entries = [];
let currency = "USD";

setupDemo();
function setupDemo() {
  let demoEntry1 = {
    id: 1,
    coin: "BTC",
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

addEntryBtn.addEventListener("click", () => {
  if (formHidden === true) {
    formContainer.className = "visible";
    formHidden = false;
  } else if (formHidden === false) {
    formContainer.className = "invisible";
    formHidden = true;
  }
});

submitformBtn.addEventListener("click", async event => {
  event.preventDefault();

  formContainer.className = "invisible";

  let newEntry = await getEntryData(currency);
  entries.push(newEntry);
  displayEntries(entries, entriesSection, currency);
  clearForm();
});

/* ----- UPDATE PORTFOLIO ----- */
refreshBtn.addEventListener("click", async () => {
  updatePortfolio(entries, entriesSection, currency);
  console.log(entries);
});

window.addEventListener("click", () => {
  if ((event.target.className = "entry-del-btn")) {
    for (var i = 0; i < entries.length; i++) {
      if (event.target.parentNode.id === entries[i].id) {
        entries.splice(i, 1);
      }
    }
  }
  displayEntries(entries, entriesSection, currency);
});

refreshBtn.addEventListener("click", () => {
  displayEntries(entries, entriesSection, currency);
});
