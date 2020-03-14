export const setupDataOptions = (user, User) => {
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
