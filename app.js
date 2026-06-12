const routes = {
  "/": {
    title: "宜蘭行程",
    file: "page_folder/2026/june/yilan/home.html"
  },
  "/home": {
    title: "宜蘭行程",
    file: "page_folder/2026/june/yilan/home.html"
  },
  "/yilan": {
    title: "宜蘭行程",
    file: "page_folder/2026/june/yilan/home.html"
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
      <p>找不到指定頁面，請確認檔案路徑是否正確。</p>
      <p>目前設定路徑：page_folder/2026/june/yilan/home.html</p>
      <a href="#/home">回首頁</a>
    </div>
  `;
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
    app.innerHTML = html;

  } catch (error) {
    renderError();
  }
}

window.addEventListener("hashchange", loadPage);

loadPage();
