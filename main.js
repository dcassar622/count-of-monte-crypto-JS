import { setupAuth } from "./AuthManager.js";
import { setupAutoComplete, getCoinList } from "./components/AutoComplete.js";

window.addEventListener("DOMContentLoaded", () => {
  // initialise auth manager
  const auth = firebase.auth();
  setupAuth(auth);
  //getCoinList();
  setupAutoComplete();
});
