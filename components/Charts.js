import { getCurrencySymbol } from "./CurrencyManager.js";

let chart = "";
let coinChartContainer = document.getElementById("coin-chart-container");
let entriesSection = document.getElementById("entries-section");
let marketCapSection = document.getElementById("market-cap-section");

export function setupCoinCharts(currency, user) {
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

export async function setupVolumeChart(currency) {
  let currencySymbol = getCurrencySymbol(currency);

  let volData = await fetch(
    `https://min-api.cryptocompare.com/data/exchange/histoday?tsym=${currency}&limit=200`
  );
  let volJSON = await volData.json();
  let volume = volJSON.Data;

  let volumeAmount = [];
  volume.map(function(item, index) {
    volumeAmount[index] = (item.volume / 1000000000).toFixed(2);
  });

  let volumeTime = [];
  volume.map(function(item, index) {
    let day = new Date(item.time);
    volumeTime[index] = day.getUTCDate();
  });

  let ctx = document.getElementById("vol-chart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: volumeTime,
      datasets: [
        {
          label: `Volume / Billion ${currencySymbol} ${currency}`,
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
              drawOnChartArea: true,
              color: "white"
            },
            display: true,
            scaleLabel: {
              display: true,
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
    `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin}&tsym=${currency}&limit=100`
  );
  let coinJSON = await data.json();
  let coinData = await coinJSON.Data.Data;

  let coinPrices = [];
  coinData.map(function(item, index) {
    coinPrices[index] = item.open;
  });

  let priceTime = [];
  coinData.map(function(item, index) {
    let day = new Date(item.time);
    priceTime[index] = day.toLocaleDateString();
  });

  let currencySymbol = getCurrencySymbol(currency);

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
              drawOnChartArea: true,
              color: "#C0C0C0"
            },
            display: true,
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

export function removeCoinChart() {
  coinChartContainer.style.backgroundColor = "";
  chart.destroy();
}
