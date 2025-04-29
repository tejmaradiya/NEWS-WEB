// const API_KEY = "39a2a00fe046403f86b8c9fe74b53cf3";
// const url = "https://newsapi.org/v2/everything?q=";

// window.addEventListener("load", () => fetchNews("India"));

// function reload() {
//     window.location.reload();
// }

// async function fetchNews(query) {
//     const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
//     const data = await res.json();
//     bindData(data.articles);
// }

// function bindData(articles) {
//     const cardsContainer = document.getElementById("cards-container");
//     const newsCardTemplate = document.getElementById("template-news-card");

//     cardsContainer.innerHTML = "";

//     articles.forEach((article) => {
//         if (!article.urlToImage) return;
//         const cardClone = newsCardTemplate.content.cloneNode(true);
//         fillDataInCard(cardClone, article);
//         cardsContainer.appendChild(cardClone);
//     });
// }

// function fillDataInCard(cardClone, article) {
//     const newsImg = cardClone.querySelector("#news-img");
//     const newsTitle = cardClone.querySelector("#news-title");
//     const newsSource = cardClone.querySelector("#news-source");
//     const newsDesc = cardClone.querySelector("#news-desc");

//     newsImg.src = article.urlToImage;
//     newsTitle.innerHTML = article.title;
//     newsDesc.innerHTML = article.description;

//     const date = new Date(article.publishedAt).toLocaleString("en-US", {
//         timeZone: "Asia/Jakarta",
//     });

//     newsSource.innerHTML = `${article.source.name} · ${date}`;

//     cardClone.firstElementChild.addEventListener("click", () => {
//         window.open(article.url, "_blank");
//     });
// }

// let curSelectedNav = null;

// function onNavItemClick(id) {
//     fetchNews(id);
//     const navItem = document.getElementById(id);
//     curSelectedNav ?.classList.remove("active");
//     curSelectedNav = navItem;
//     curSelectedNav.classList.add("active");
// }

// const searchButton = document.getElementById("search-button");
// const searchText = document.getElementById("search-text");

// searchButton.addEventListener("click", () => {
//     const query = searchText.value;
//     if (!query) return;
//     fetchNews(query);
//     curSelectedNav ?.classList.remove("active");
//     curSelectedNav = null;
// });



const API_KEY = '39a2a00fe046403f86b8c9fe74b53cf3';
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}
async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        
        // Check if the API call was successful
        if (!res.ok) {
            console.error("Failed to fetch data from News API:", res.status, res.statusText);
            return;
        }

        const data = await res.json();
        
        // Log the entire data response to inspect it
        console.log("API Response:", data);

        // Check if the articles array exists and is not empty
        if (data && Array.isArray(data.articles) && data.articles.length > 0) {
            bindData(data.articles);
        } else {
            console.error("No articles found in the API response.");
        }
    } catch (error) {
        // Log any errors that occur during the fetch process
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";  // Clear previous cards

    // Log articles to see if they are properly fetched
    console.log("Fetched articles:", articles);

    // Check if articles is an array and not empty
    if (!Array.isArray(articles) || articles.length === 0) {
        console.error("No valid articles found.");
        return;  // Early exit if articles are invalid
    }

    articles.forEach((article) => {
        if (!article.urlToImage) return;  // Skip articles without images
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}



function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage; // Set the image
    newsTitle.innerHTML = article.title; // Set the title
    newsDesc.innerHTML = article.description; // Set the description

    // Format the date to show in specific timezone
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    // Open article in new tab when clicked
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    if (curSelectedNav) {
        curSelectedNav.classList.remove("active");
    }
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

// Search functionality
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    if (curSelectedNav) {
        curSelectedNav.classList.remove("active");
    }
    curSelectedNav = null;
});
