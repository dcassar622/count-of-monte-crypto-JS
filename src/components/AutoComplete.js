let coinList = [];

export const setupAutoComplete = () => {
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

export async function getCoinList() {
  let data = await fetch("https://min-api.cryptocompare.com/data/all/coinlist");
  let coinsData = await data.json();
  let coins = coinsData.Data;
  coinList = Object.values(coins);
  console.log(coinList);
}
