const apiKeys = [
  '8QK6bvSZbM2nlcrmGzMFmm8dtTuUeQfN',
  'KhCNpgn7z5JbL4jelukvixPwizkz3lhn',
  're2m7iao2QV7LpiLE4cr1FdVsBzz1tYl',
  't8gLK625LY0u4XGRa96LedUtvCe2JknJ'
]
// News URL
const news_url = "https://news-feed-ke.vercel.app/news"

// Image proxy
const proxy = "https://news-feed-ke.vercel.app/proxy-image?url"

// DOM Elements
const newsArticles = document.getElementById('news-articles');
const header_tag = document.querySelector('header')
const load_more = document.querySelector('.button')
const loader = document.querySelector('.loader')
const category_tab = document.querySelector('.category-holder')

let weatherUrl = `https://news-feed-ke.vercel.app/proxy_weather`
let current_page = 0
let page_count = 0

load_more.addEventListener('click',()=>{
  current_page = (current_page + 1)%page_count
  getNews()
})
function getCategory(category){
  loader.classList.remove('hidden')
  if (category == "Life & Style"){
    category = "Life%20%26%20Style"
  }
  $.ajax({
    url:`https://news-feed-ke.vercel.app/news/category/${category}`
  }).done((data)=>{
    loader.classList.add('hidden')
    let output = '';
    data.content.forEach((article)=>{
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

    })
    newsArticles.innerHTML = output
  })
}
// Get News Articles
function getNews() {
  $.ajax({
    url: `${news_url}?page=${current_page}`,
  }).done(function(response) {
    loader.classList.add('hidden')
    newsArticles.classList.remove('hidden')
    load_more.classList.remove('hidden')
    $.ajax({
      url: `${news_url}/categories`
    }).done((data)=>{
      let category_chips = ''
      data.forEach((category)=>{
        console.log(category)
        category_chips +=`
        <button class="category" onclick=getCategory('${encodeURIComponent(category)}')>
					<span class="lable">${category}</span>
        </button>
        `
      })
      category_tab.innerHTML = category_chips
    })
    let articles = response.content;
    page_count = response.page_count + 1
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
    newsArticles.innerHTML += output;
  }).fail(function(error) {
    console.log(error);
  });
}

// ...

let apiKeyIndex = 0; // Start with the first key

// Inside your `getWeather` function, add the key rotation logic and geolocation permission check
async function getWeather() {
  return new Promise(async (resolve, reject) => {
    // Check geolocation permission status
    navigator.permissions.query({ name: 'geolocation' })
      .then(permissionStatus => {
        if (permissionStatus.state === 'granted') {
          // Geolocation permission is granted, proceed with location retrieval
          navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
              // Get the current API key
              const currentApiKey = apiKeys[apiKeyIndex];
              const location_url = `https://news-feed-ke.vercel.app/proxy_location/${currentApiKey}`;
              const url = `${location_url}?q=${lat},${lon}`;

              const response = await fetch(url);
              const locationData = await response.json();

              if (locationData && locationData.Key) {
                // Build the weather URL with the current API key and locationKey
                const weatherUrl = `https://news-feed-ke.vercel.app/proxy_weather/${locationData.Key}?api_key=${currentApiKey}`;

                const weatherResponse = await fetch(weatherUrl);
                const weatherData = await weatherResponse.json();

                resolve(weatherData);
              } else {
                // If locationData doesn't contain a valid Key, reject with an error
                apiKeyIndex = (apiKeyIndex + 1) % apiKeys.length; // Rotate to the next key
                console.log('Switching to the next API key:', apiKeys[apiKeyIndex]);
                getWeather().then(resolve).catch(reject); // Retry with the new key
              }
            } catch (error) {
              console.log('Error', error);

              // If the error indicates a rate limit or authentication issue, switch to the next API key
              if (error.status === 401 || error.status === 429) {
                apiKeyIndex = (apiKeyIndex + 1) % apiKeys.length; // Rotate to the next key
                console.log('Switching to the next API key:', apiKeys[apiKeyIndex]);
                getWeather().then(resolve).catch(reject); // Retry with the new key
              } else {
                reject(error);
              }
            }
          });
        } else if (permissionStatus.state === 'prompt') {
          // Geolocation permission is prompt (not granted or denied yet)
          console.log('Geolocation permission prompt.');
          navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
              // Get the current API key
              const currentApiKey = apiKeys[apiKeyIndex];
              const location_url = `https://news-feed-ke.vercel.app/proxy_location/${currentApiKey}`;
              const url = `${location_url}?q=${lat},${lon}`;

              const response = await fetch(url);
              const locationData = await response.json();

              if (locationData && locationData.Key) {
                // Build the weather URL with the current API key and locationKey
                const weatherUrl = `https://news-feed-ke.vercel.app/proxy_weather/${locationData.Key}?api_key=${currentApiKey}`;

                const weatherResponse = await fetch(weatherUrl);
                const weatherData = await weatherResponse.json();

                resolve(weatherData);
              } else {
                // If locationData doesn't contain a valid Key, reject with an error
                apiKeyIndex = (apiKeyIndex + 1) % apiKeys.length; // Rotate to the next key
                console.log('Switching to the next API key:', apiKeys[apiKeyIndex]);
                getWeather().then(resolve).catch(reject); // Retry with the new key
              }
            } catch (error) {
              console.log('Error', error);

              // If the error indicates a rate limit or authentication issue, switch to the next API key
              if (error.status === 401 || error.status === 429) {
                apiKeyIndex = (apiKeyIndex + 1) % apiKeys.length; // Rotate to the next key
                console.log('Switching to the next API key:', apiKeys[apiKeyIndex]);
                getWeather().then(resolve).catch(reject); // Retry with the new key
              } else {
                reject(error);
              }
            }
          });
          // You can request permission using navigator.geolocation.getCurrentPosition() here
        } else {
          // Geolocation permission is denied
          console.log('Geolocation permission denied.');
          // You may want to inform the user or provide an alternative experience
        }
      })
      .catch(error => {
        console.error('Error checking geolocation permission:', error);
        reject(error);
      });
  });
}


// Usage:
getWeather()
.then(data => {
    console.log(data);
    // Select elements
    const weather_tag = document.querySelector('#weather');
    const tempElement = document.querySelector('#temp');
    const weatherIconElement = document.querySelector('#weather-icon');
    const descriptionElement = document.querySelector('#weather-description');
    
    // Check if data is valid before updating the elements
    if (data) {
      const weatherData = data[0];
      // Update elements
      tempElement.innerText = weatherData.Temperature.Metric.Value; 

      let iconCode = weatherData.WeatherIcon;
      if(iconCode < 10){
        iconCode = "0"+iconCode.toString()
      }
      weatherIconElement.src = `https://developer.accuweather.com/sites/default/files/${iconCode}-s.png`;
      console.log(weatherIconElement.src)
      descriptionElement.innerText = weatherData.WeatherText;

      // Styling
      if(iconCode < 10) {
        // Day time icon
        weather_tag.style.backgroundColor = '#cee4ae'; 
        weather_tag.style.color="#333"
        header_tag.style.background = "#cee4ae"
        header_tag.style.color="#333"
      } else {
        // Night time icon
        weather_tag.style.backgroundColor = '#08425d';
        weather_tag.style.color="#ddd"

        header_tag.style.background= "#08425d"
        header_tag.style.color="#ddd"
      }
    }
  })
  .catch(error => {
    console.error(error);
  });

getNews();


