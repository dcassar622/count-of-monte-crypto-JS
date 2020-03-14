import { setupVolumeChart, setupCoinCharts } from "./Charts.js";
import { setupMarketCapData } from "./MarketCapData.js";
import { setupNewsFeed } from "../components/NewsFeedData.js";

const loggedInLinks = document.querySelectorAll(".logged-in");
const loggedOutLinks = document.querySelectorAll(".logged-out");

let loginMessage = document.getElementById("login-message-section");
const entriesSection = document.getElementById("entries-section");
const volChartSection = document.getElementById("vol-chart-section");
const marketCapSection = document.getElementById("market-cap-section");

export const setupUI = (user, currency, username) => {
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

    setupVolumeChart(currency);
    setupCoinCharts(currency, user);
    setupNewsFeed();
    setupMarketCapData(currency);
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
