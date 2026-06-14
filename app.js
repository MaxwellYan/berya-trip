const app = document.getElementById("app");

const basePath = "page_folder/2026/june/yilan/";

const pages = {
  home: {
    title: "首頁",
    file: "01_home.html"
  },
  journey: {
    title: "行程",
    file: "02_journey.html"
  },
  snack: {
    title: "小吃",
    file: "03_snack.html"
  },
  gourmetfood: {
    title: "美食餐廳",
    file: "04_gourmetfood.html"
  },
  attractions: {
    title: "景點",
    file: "05_attractions.html"
  },
  ecologicalfarm: {
    title: "生態農場",
    file: "06_ecologicalfarm.html"
  },
  oldstreet: {
    title: "老街",
    file: "07_oldstreet.html"
  },
  rainydayfilling: {
    title: "雨天備案",
    file: "08_rainydayfiling.html"
  },
  staple: {
    title: "伴手禮",
    file: "09_staple.html"
  },
  hotel: {
    title: "住宿",
    file: "10_hotel.html"
  }
};

function getCurrentPage() {
  const hash = window.location.hash.replace("#/", "");
  return hash || "home";
}

function renderShell() {
  app.innerHTML = `
    <div class="trip-app">

      <header class="trip-header">
        <p class="eyebrow">BerYa Trip</p>
        <h1>宜蘭旅遊資料</h1>
        <p>行程、景點、美食、住宿與備案整理</p>
      </header>

      <nav class="trip-nav">
        <a href="#/home" data-page="home">首頁</a>
        <a href="#/journey" data-page="journey">行程</a>
        <a href="#/snack" data-page="snack">小吃</a>
        <a href="#/gourmetfood" data-page="gourmetfood">美食餐廳</a>
        <a href="#/attractions" data-page="attractions">景點</a>
        <a href="#/ecologicalfarm" data-page="ecologicalfarm">生態農場</a>
        <a href="#/oldstreet" data-page="oldstreet">老街</a>
        <a href="#/rainydayfilling" data-page="rainydayfilling">雨天備案</a>
        <a href="#/staple" data-page="staple">伴手禮</a>
        <a href="#/hotel" data-page="hotel">住宿</a>
      </nav>

      <main class="trip-main">
        <div id="page-content">
          載入中...
        </div>
      </main>

    </div>
  `;
}

async function loadPage() {
  const pageKey = getCurrentPage();
  const page = pages[pageKey] || pages.home;
  const content = document.getElementById("page-content");

  if (!content) return;

  content.innerHTML = `
    <div class="loading">
      載入中...
    </div>
  `;

  try {
    const response = await fetch(basePath + page.file);

    if (!response.ok) {
      throw new Error("Page not found");
    }

    const html = await response.text();

    document.title = `BerYa Trip - ${page.title}`;
    content.innerHTML = html;

    setActiveNav(pageKey);

  } catch (error) {
    content.innerHTML = `
      <section class="card">
        <h2>頁面載入失敗</h2>
        <p>找不到檔案：${basePath + page.file}</p>
        <p>請確認 GitHub 檔名、大小寫與路徑是否正確。</p>
      </section>
    `;
  }
}

function setActiveNav(pageKey) {
  const links = document.querySelectorAll(".trip-nav a");

  links.forEach(link => {
    if (link.dataset.page === pageKey) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function init() {
  renderShell();
  loadPage();
}

window.addEventListener("hashchange", loadPage);

init();
