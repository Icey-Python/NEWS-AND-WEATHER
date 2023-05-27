// API Keys
const NEWS_API_KEY = 'UrD_SLL4k43b-X1oT5IMh3MgSsrkcl5PLSki-4Fb07Q';
const WEATHER_API_KEY = '07706cca23f9b49c22de37b86c29ba34';

const TOP_NEWS_KEY = "5d57189fe0e64026978a8c1d31a3bd30"

// URLs
const NEWS_API_URL = `https://api.newscatcherapi.com/v2/latest_headlines?countries=US`;
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${WEATHER_API_KEY}`;
const TOP_NEWS_URL = `https://api.worldnewsapi.com/search-news?api-key=${TOP_NEWS_KEY}`

// DOM Elements
const newsArticles = document.getElementById('news-articles');
const topNewsArticles = document.querySelector('.side-bar');
const weatherInfo = document.getElementById('weather-info');
const categoryLinks = document.querySelectorAll('.category');

// Get News Articles
function getNews(category) {
	$.ajax({
		url: NEWS_API_URL +`&topic=${category}`,
		headers:{
			'x-api-key': `${NEWS_API_KEY}`
		}
	}).done(function(response) {
		let articles = response.articles;
		let output = '';

		articles.forEach(function(article) {
            output +=`<article>`
            output += `<img src='${article.media}'/>`
            output += `
					<h3>${article.title}</h3>
					<h6>${article.author}</h6>
					<p>${article.excerpt}</p>
					<a href="${article.link}" target="_blank">Read More</a>
				</article>
			`;

		});
		newsArticles.innerHTML = output;
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
