const routes = {
  "/": {
    title: "首頁",
    file: "pages/home.html"
  },
  "/home": {
    title: "首頁",
    file: "pages/home.html"
  },
  "/alishan": {
    title: "阿里山行程",
    file: "pages/alishan.html"
  },
  "/tainan": {
    title: "台南行程",
    file: "pages/tainan.html"
  },
  "/japan": {
    title: "日本行程",
    file: "pages/japan.html"
  }
};

const app = document.getElementById("app");

function getCurrentRoute() {
  const hash = window.location.hash.replace("#", "");

  if (!hash || hash === "/") {
    return "/";
  }

  return hash;
}

function renderLayout(contentHtml, pageTitle) {
  app.innerHTML = `
    <div class="app-shell">

      <header class="app-header">
        <div>
          <h1>BerYa Trip</h1>
          <p>${pageTitle}</p>
        </div>
      </header>

      <nav class="app-nav">
        <a href="#/home" data-route="/home">首頁</a>
        <a href="#/alishan" data-route="/alishan">阿里山</a>
        <a href="#/tainan" data-route="/tainan">台南</a>
        <a href="#/japan" data-route="/japan">日本</a>
      </nav>

      <main class="app-main">
        ${contentHtml}
      </main>

      <footer class="app-footer">
        <p>BerYa Trip © 2026</p>
      </footer>

    </div>
  `;

  setActiveNav();
}

function renderLoading() {
  app.innerHTML = `
    <div class="loading-page">
      <p>載入中...</p>
    </div>
  `;
}

function renderError() {
  app.innerHTML = `
    <div class="error-page">
      <h1>頁面載入失敗</h1>
      <p>找不到這個頁面，請確認 pages 資料夾內是否有對應的 HTML 檔案。</p>
      <a href="#/home">回首頁</a>
    </div>
  `;
}

function setActiveNav() {
  const currentRoute = getCurrentRoute();
  const links = document.querySelectorAll(".app-nav a");

  links.forEach(link => {
    if (link.dataset.route === currentRoute) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

async function loadPage() {
  renderLoading();

  const currentRoute = getCurrentRoute();
  const route = routes[currentRoute] || routes["/"];

  try {
    const response = await fetch(route.file);

    if (!response.ok) {
      throw new Error("Page not found");
    }

    const html = await response.text();

    document.title = `BerYa Trip - ${route.title}`;
    renderLayout(html, route.title);

  } catch (error) {
    renderError();
  }
}

window.addEventListener("hashchange", loadPage);

loadPage();
