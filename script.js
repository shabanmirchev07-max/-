document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openLogin = document.getElementById("openLogin");
  const closePopup = document.getElementById("closePopup");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const showRegister = document.getElementById("showRegister");
  const showLogin = document.getElementById("showLogin");
  const newsContainer = document.getElementById("newsContainer");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  // Примерен масив с новини
  let news = [
    {title:"Правителството обяви нови мерки", text:"Министър-председателят обяви нов пакет от мерки за малкия бизнес.", img:"1366x768.jpg"},
    {title:"Български учени създадоха лекарство", text:"Институтът по микробиология съобщи за пробив в разработката.", img:"images/news2.jpg"},
    {title:"Футболен мач завърши с изненадващ резултат", text:"Дербито между Левски и ЦСКА предложи драматичен обрат.", img:"images/news1.jpg"}
  ];

  function renderNews(filteredNews = null) {
    newsContainer.innerHTML = "";
    let displayNews = filteredNews || news;
    displayNews.forEach(item => {
      const article = document.createElement("div");
      article.classList.add("news-article");
      article.innerHTML = `
        <h3>${item.title}</h3>
        <img src="${item.img}" alt="${item.title}">
        <p>${item.text}</p>
        <div class="share-buttons">
          <button class="share-facebook" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(window.location.href), '_blank')">Facebook</button>
          <button class="share-twitter" onclick="window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent('${item.title} '+window.location.href), '_blank')">Twitter</button>
        </div>
      `;
      newsContainer.appendChild(article);
    });
  }

  renderNews();

  // Автоматично обновяване (пример)
  setInterval(() => {
    // Можеш да добавиш нови елементи или да взимаш от API
    renderNews();
  }, 15000); // всеки 15 сек

  // Търсачка
  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const query = searchInput.value.toLowerCase();
    const filtered = news.filter(n => n.title.toLowerCase().includes(query) || n.text.toLowerCase().includes(query));
    renderNews(filtered);
  });

  // Popup логика
  openLogin.addEventListener("click", () => {
    popup.style.display = "flex";
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
  });
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
    loginForm.classList.remove("active");
    registerForm.classList.remove("active");
  });
  showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("active");
    registerForm.classList.add("active");
  });
  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
  });
});
fetch('https://api.rss2json.com/v1/api.json?rss_url=https://btvnovinite.bg/rss.xml')
  .then(res => res.json())
  .then(data => {
    data.items.forEach(item => {
      // render item.title, item.link, item.pubDate, item.thumbnail
    });
  });
