import { setupUI } from "./components/UI.js";
import { User } from "./components/User.js";

export const setupAuth = auth => {
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

          // setup new user based on the retreived information
          const currUser = new User(user, username, currency);

          //set up user 'crud' options for user
          currUser.createDataOptions();

          // set up app UI, including charts and data tables
          currUser.renderUI(user);

          // get user's entries from db and display them on screen
          currUser.renderEntries();
        });
    } else {
      setupUI();
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
            currency: currency
          });
      })
      .then(signupForm.reset());
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
  });

  /* ----- logout ----- */
  const logout = document.getElementById("logout");
  logout.addEventListener("click", event => {
    event.preventDefault();
    auth.signOut();
    console.log("logged out");
  });
};
