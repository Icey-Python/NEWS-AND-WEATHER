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

var article_data
function getCategory(category){
  loader.classList.remove('hidden')
 
  $.ajax({
    url:`https://news-feed-ke.vercel.app/news/category/${category}`
  }).done((data)=>{
    loader.classList.add('hidden')
    let output = '';
    data.content.forEach((article,idx)=>{
      output += `<article id=${idx}>`
      output += `
        <h2 class='bounded' >${article.title}</h2>
        <img src='${proxy}=${article.image_url}'/>
        <h6>${article.author}| ${article.category}</h6>
        <h4><em>${article.image_description}</em></h4> 
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
    article_data = articles
    page_count = response.page_count + 1
    let output = '';

    articles.forEach((article,idx)=>{
      output += `<article id=${idx}>`
      output += `
        <h2 class='bounded' >${article.title}</h2>
        <img src='${proxy}=${article.image_url}'/>
        <h6>${article.author}| ${article.category}</h6>
        <h4><em>${article.image_description}</em></h4>
        <em class='date'>${article.date}</em>
        <button onclick=show_news_in_popup(${idx})>
    <span>read</span>
    <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
        <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
    </svg>
</button>
      </article>
    `;

    });
    newsArticles.innerHTML += output;
  }).fail(function(error) {
    console.log(error);
  });
}


function show_news_in_popup(id){
  let popup =document.querySelector('.popup')
  popup.addEventListener('dblclick',hide_popup)
  popup.addEventListener('click',hide_popup)
  let popup_inner = document.querySelector('.popup-inner')
  let working_article = article_data[id]
  popup_inner.innerHTML = `
  <img src='${working_article.image_url}'/>
  <h2>${working_article.title}</h2>
  <p>${working_article.content}</p>
  `
  popup.classList.toggle('show-popup')
}

function hide_popup(){
  let popup =document.querySelector('.popup')
  popup.classList.toggle('show-popup')
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


