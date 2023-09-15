const apiKey = '8QK6bvSZbM2nlcrmGzMFmm8dtTuUeQfN'

//news url
const news_url = "https://news-feed-ke.vercel.app/news"

//image proxy
const proxy = "https://news-feed-ke.vercel.app/proxy-image?url"
// DOM Elements
const newsArticles = document.getElementById('news-articles');
const header_tag = document.querySelector('header')

// Get News Articles
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
				</article>
			`;

    });
    newsArticles.innerHTML = output;
  }).fail(function(error) {
    console.log(error);
  });
}

async function getWeather() {

  return new Promise((resolve, reject) => {

    navigator.geolocation.getCurrentPosition(async position => {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lon}`;

      try {
        const response = await fetch(url);
        const locationData = await response.json();
        const locationKey = locationData.Key;

        const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;
        
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        resolve(weatherData[0]);
      } catch(error) {
        reject(error);
      }

    });

  });
  
}

// Usage:

getWeather()
  .then(data => {
    const weatherData = data;
    // Select elements
    const weather_tag = document.querySelector('#weather');
    const tempElement = document.querySelector('#temp');
    const weatherIconElement = document.querySelector('#weather-icon');
    const descriptionElement = document.querySelector('#weather-description');

    // Update elements
    tempElement.innerText = weatherData.Temperature.Metric.Value; 

    const iconCode = weatherData.WeatherIcon;
    weatherIconElement.src = `https://developer.accuweather.com/sites/default/files/${iconCode}-s.png`;
    console.log(weatherIconElement.src)
    descriptionElement.innerText = weatherData.WeatherText;

    // Styling
    if(iconCode < 10) {
      // Day time icon
      weather_tag.style.backgroundColor = '#cee4ae'; 
      weather_tag.style.color="#333"
      header_tag.style.background = "#cee4ae"
      header_tag.style.color="#ddd"
    } else {
      // Night time icon
      weather_tag.style.backgroundColor = '#08425d';
      weather_tag.style.color="#ddd"

      header_tag.style.background= "#08425d"
      header_tag.style.color="#ddd"
    }
  })
  .catch(error => {
    console.error(error);
  });

getNews();




