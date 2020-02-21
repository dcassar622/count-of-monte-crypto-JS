let newsFeedArea = document.getElementById("news-area");

export function displayNewsFeed(items) {
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
