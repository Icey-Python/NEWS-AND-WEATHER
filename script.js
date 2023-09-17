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

            // Build the weather URL with the current API key and locationKey
            const weatherUrl = `https://news-feed-ke.vercel.app/proxy_weather?q=${lat},${lon}`;

            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();
            resolve(weatherData);
          });
        } else if (permissionStatus.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Build the weather URL with the current API key and locationKey
            const weatherUrl = `https://news-feed-ke.vercel.app/proxy_weather?q=${lat},${lon}`;

            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            resolve(weatherData);
          });
        } else {
          // Geolocation permission is denied
          console.error('Geolocation permission denied.');
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
    // Select elements
    const weather_tag = document.querySelector('#weather');
    const tempElement = document.querySelector('#temp');
    const weatherIconElement = document.querySelector('#weather-icon');
    const descriptionElement = document.querySelector('#weather-description');
    
    // Check if data is valid before updating the elements
    if (data) {
      const weatherData = data.weather;
      // Update elements
      tempElement.innerText = weatherData.temp; 

     
      weatherIconElement.src = weatherData.icon;
      
      descriptionElement.innerText = weatherData.text;

      // Styling
      if(weatherData.is_day) {
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


