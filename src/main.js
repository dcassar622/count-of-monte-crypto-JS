import { setupAuth } from "./database/AuthManager.js";
import { setupAutoComplete } from "./components/AutoComplete.js";

window.addEventListener("DOMContentLoaded", () => {
  // initialise auth manager
  const auth = firebase.auth();
  // setup database authorisation manager
  setupAuth(auth);
  // set up 'New Entry' autocomplete menu for user
  setupAutoComplete();
});
