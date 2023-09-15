<<<<<<< HEAD
// API Keys
const WEATHER_API_KEY = '07706cca23f9b49c22de37b86c29ba34';

const TOP_NEWS_KEY = "5d57189fe0e64026978a8c1d31a3bd30"

// URLs
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${WEATHER_API_KEY}`;
const TOP_NEWS_URL = `https://api.worldnewsapi.com/search-news?api-key=${TOP_NEWS_KEY}`
=======
//news url
const news_url = "https://news-feed-ke.vercel.app/news"
>>>>>>> 4666f50d23a01ec53aa18de0eb3e8859065e8b21

//image proxy
const proxy = "https://news-feed-ke.vercel.app/proxy-image?url"
// DOM Elements
const newsArticles = document.getElementById('news-articles');

// Get News Articles
<<<<<<< HEAD
function getNews(category) {
	$.ajax({
		url: `https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=${category}&page_size=30`,
		headers:{
			"x-api-key": 'UrD_SLL4k43b-X1oT5IMh3MgSsrkcl5PLSki-4Fb07Q',
		}
	}).done(function(response) {
		let articles = response.data;
		let output = '';

		articles.forEach(function(article) {
            output +=`<article>`
            output += `
					<h3>${article.title}</h3>
					<p>${article.excerpt}</p>
					<img src='${article.media}'/>
					<h6>${article.author}</h6>
					<p>${article.summary}</p>
					<a href="${article.link}" target="_blank">Read More</a>
=======
function getNews() {
  $.ajax({
    url: news_url,
  }).done(function(response) {
    let articles = response;
    let output = '';

    articles.forEach(function(article) {
      output += `<article>`
      output += `
					<h2 class='bounded' >${article.title}</h2>
					<img src='${proxy}=${article.image_url}'/>
					<h6>${article.author}| ${article.category}</h6>
          <h4><em>${article.image_description}</em></h4>
					<p>${article.content}</p>
          <em class='date'>${article.date}</em>
>>>>>>> 4666f50d23a01ec53aa18de0eb3e8859065e8b21
				</article>
			`;

    });
    newsArticles.innerHTML = output;
  }).fail(function(error) {
    console.log(error);
  });
}
getNews();

<<<<<<< HEAD
// Get Weather Info
function getWeather(city) {
	$.ajax({
		url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`,
		dataType: 'jsonp'
	}).done(function(response) {
		let temp = Math.round(response.main.temp - 273.15);
		let humidity = response.main.humidity;
		let windSpeed = response.wind.speed;
		let output = `
			<p>Temperature: ${temp}&deg;C</p>
			<p>Humidity: ${humidity}%</p>
			<p>Wind Speed: ${windSpeed} m/s</p>
		`;
		weatherInfo.innerHTML = output;
	}).fail(function(error) {
		console.log(error);
	});
}

// Event Listeners
categoryLinks.forEach(function(link) {
	link.addEventListener('click', function(e) {
		e.preventDefault();
		let category = link.dataset.category;
		getNews(category);
	});
});

// Get News Articles for top headlines 
function getTopHeadlines() {
	$.ajax({
		url: TOP_NEWS_URL
	}).done(function(response) {
		let articles = response.news;
		let output = '';

		articles.forEach(function(article) {
            output +=`<article>`
            if(article.image !== "" && article.image !== null){
                console.log(article.image)
                output += `<img src='${article.image}'/>`
            }
            output += `
					<h3>${article.title}</h3>
					<p>${article.text}</p>
					<a href="${article.url}" target="_blank">Read More</a>
				</article>
			`;

		});
		topNewsArticles.innerHTML += output;
	}).fail(function(error) {
		console.log(error);
	});
}

// Get Weather Info
function getWeather(city) {
	$.ajax({
		url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`,
		dataType: 'jsonp'
	}).done(function(response) {
		let temp = Math.round(response.main.temp - 273.15);
		let humidity = response.main.humidity;
		let windSpeed = response.wind.speed;
		let output = `
			<p>Temperature: ${temp}&deg;C</p>
			<p>Humidity: ${humidity}%</p>
			<p>Wind Speed: ${windSpeed} m/s</p>
		`;
		weatherInfo.innerHTML = output;
	}).fail(function(error) {
		console.log(error);
	});
}

// Event Listeners
categoryLinks.forEach(function(link) {
	link.addEventListener('click', function(e) {
		e.preventDefault();
		let category = link.dataset.category;
		getNews(category);
	});
});


// Default News and Weather
getNews('world');
getWeather('New York');
getTopHeadlines()
=======
>>>>>>> 4666f50d23a01ec53aa18de0eb3e8859065e8b21
