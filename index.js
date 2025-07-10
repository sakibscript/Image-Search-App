const key = "IO7AhyzaLZH8BbFVwCINVYfPT7Drv2jHIT6SYnbVMLM";

const formElement = document.querySelector("form");
const searchBtn = document.querySelector(".search-btn");
const searchInputElement = document.querySelector("#search-input");
const searchResult = document.querySelector(".search-results");
const showMoreBtn = document.querySelector(".show-more-btn");

let inputData = "";
let page = 1;

const searchImages = async () => {
  inputData = searchInputElement.value;
  const URL = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`;
  const response = await fetch(URL);
  const data = await response.json();

  if (page === 1) {
    searchResult.innerHTML = "";
  }
  const results = data.results;
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("result-card");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResult.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMoreBtn.style.display = "block";
  }
};

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  searchImages();
});
