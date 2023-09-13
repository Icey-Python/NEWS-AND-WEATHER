const news_url = "https://news-feed-ke.vercel.app/news"

// DOM Elements
const newsArticles = document.getElementById('news-articles');
const topNewsArticles = document.querySelector('.side-bar');
const weatherInfo = document.getElementById('weather-info');
const categoryLinks = document.querySelectorAll('.category');

// Get News Articles
function getNews(category) {
	$.ajax({
		url: news_url,
	}).done(function(response) {
    console.log(response)
		let articles = response.data;
		let output = '';

		articles.forEach(function(article) {
      content = ""
      (article.content).forEach((paragraph)=>{
        content += paragraph
      })
            output +=`<article>`
            output += `
					<h3>${article.title}</h3>
					<img src='${article.image}'/>
					<h6>${article.author}</h6>
          <h6>${article.image_description}</h6>
					<p>${content}</p>
				</article>
			`;

		});
		newsArticles.innerHTML = output;
	}).fail(function(error) {
		console.log(error);
	});
}

// Get Weather Info
// function getWeather(city) {
// 	$.ajax({
// 		url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`,
// 		dataType: 'jsonp'
// 	}).done(function(response) {
// 		let temp = Math.round(response.main.temp - 273.15);
// 		let humidity = response.main.humidity;
// 		let windSpeed = response.wind.speed;
// 		let output = `
// 			<p>Temperature: ${temp}&deg;C</p>
// 			<p>Humidity: ${humidity}%</p>
// 			<p>Wind Speed: ${windSpeed} m/s</p>
// 		`;
// 		weatherInfo.innerHTML = output;
// 	}).fail(function(error) {
// 		console.log(error);
// 	});
// }

// Event Listeners
// categoryLinks.forEach(function(link) {
// 	link.addEventListener('click', function(e) {
// 		e.preventDefault();
// 		let category = link.dataset.category;
// 		getNews(category);
// 	});
// });

// Get News Articles for top headlines 
// function getTopHeadlines() {
// 	$.ajax({
// 		url: TOP_NEWS_URL
// 	}).done(function(response) {
// 		let articles = response.news;
// 		let output = '';

// 		articles.forEach(function(article) {
//             output +=`<article>`
//             if(article.image !== "" && article.image !== null){
//                 console.log(article.image)
//                 output += `<img src='${article.image}'/>`
//             }
//             output += `
// 					<h3>${article.title}</h3>
// 					<p>${article.text}</p>
// 					<a href="${article.url}" target="_blank">Read More</a>
// 				</article>
// 			`;

// 		});
// 		topNewsArticles.innerHTML += output;
// 	}).fail(function(error) {
// 		console.log(error);
// 	});
// }

// // Get Weather Info
// function getWeather(city) {
// 	$.ajax({
// 		url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`,
// 		dataType: 'jsonp'
// 	}).done(function(response) {
// 		let temp = Math.round(response.main.temp - 273.15);
// 		let humidity = response.main.humidity;
// 		let windSpeed = response.wind.speed;
// 		let output = `
// 			<p>Temperature: ${temp}&deg;C</p>
// 			<p>Humidity: ${humidity}%</p>
// 			<p>Wind Speed: ${windSpeed} m/s</p>
// 		`;
// 		weatherInfo.innerHTML = output;
// 	}).fail(function(error) {
// 		console.log(error);
// 	});
// }

// // Event Listeners
// categoryLinks.forEach(function(link) {
// 	link.addEventListener('click', function(e) {
// 		e.preventDefault();
// 		let category = link.dataset.category;
// 		getNews(category);
// 	});
// });


// Default News and Weather
getNews();
// getWeather('New York');
// getTopHeadlines()
