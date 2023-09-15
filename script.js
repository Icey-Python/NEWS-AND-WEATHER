const apiKey = '8QK6bvSZbM2nlcrmGzMFmm8dtTuUeQfN'

// News URL
const news_url = "https://news-feed-ke.vercel.app/news"

// Image proxy
const proxy = "https://news-feed-ke.vercel.app/proxy-image?url"

// DOM Elements
const newsArticles = document.getElementById('news-articles');
const header_tag = document.querySelector('header')
const location_url = `https://news-feed-ke.vercel.app/proxy_location/${apiKey}`
let weatherUrl = `https://news-feed-ke.vercel.app/proxy_weather`

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

      const url = `${location_url}?q=${lat},${lon}`;

      try {
        const response = await fetch(url);
        const locationData = await response.json();
        const locationKey = locationData.Key;

        weatherUrl = `${weatherUrl}/${locationKey}?api_key=${apiKey}`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        console.log(weatherData);

        resolve(weatherData[0]);
      } catch(error) {
        console.log('Error', weatherUrl)
        reject(error);
      }

    });

  });
  
}

// Usage:

getWeather()
  .then(data => {
    console.log(data)
    // Select elements
    const weather_tag = document.querySelector('#weather');
    const tempElement = document.querySelector('#temp');
    const weatherIconElement = document.querySelector('#weather-icon');
    const descriptionElement = document.querySelector('#weather-description');

    // Update elements
    tempElement.innerText = data.Temperature.Metric.Value; 

    const iconCode = data.WeatherIcon;
    weatherIconElement.src = `https://developer.accuweather.com/sites/default/files/${iconCode}-s.png`;
    console.log(weatherIconElement.src)
    descriptionElement.innerText = data.WeatherText;

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
