// Add CORS proxy url
const corsProxy = 'https://cors-anywhere.herokuapp.com/'; 
const news_url = corsProxy  + "https://news-feed-ke.vercel.app/news"

// DOM Elements
const newsArticles = document.getElementById('news-articles');
const topNewsArticles = document.querySelector('.side-bar');
const weatherInfo = document.getElementById('weather-info');
const categoryLinks = document.querySelectorAll('.category');

// Get News Articles
function getNews() {
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
getNews();

