import { completeEntries, calcTotal } from "../components/EntriesManager.js";
import { displayEntries } from "../components/EntriesDisplay.js";
import { setupUI } from "./UI.js";
import { setupDataOptions } from "./CRUD.js";

export class User {
  constructor(user, username, currency, order) {
    this.user = user;
    this.username = username;
    this.currency = currency;
    this.order = order;
  }

  /* CREATE USER INTERFACE */
  renderUI() {
    setupUI(this.user, this.currency, this.username);
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
    let entries = await completeEntries(entriesDB, this.currency);

    // set the default currency on the currency selector menu
    const currencySelector = document.getElementById("currency-selector");
    currencySelector.value = this.currency;

    // display the completed entries + totals
    displayEntries(entries, this.currency);
    calcTotal(entries, this.currency);
  }

  /* SETUP EVENT LISTENERS FOR CRUD OPERATIONS */
  createDataOptions() {
    setupDataOptions(this.user, this);
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
