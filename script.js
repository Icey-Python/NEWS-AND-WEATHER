//news url
const news_url = "https://news-feed-ke.vercel.app/news"

//image proxy
const proxy = "https://news-feed-ke.vercel.app/proxy-image?url="
// DOM Elements
const newsArticles = document.getElementById('news-articles');

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
					<img src=${proxy+article.image}/>
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
getNews();

