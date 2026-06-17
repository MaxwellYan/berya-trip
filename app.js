const params = new URLSearchParams(window.location.search);

const tripPath = params.get("trip") || "2026/june/yilan";
const currentPage = params.get("page") || "home";

const basePath = `./page_folder/${tripPath}/`;

let tripConfig = null;

async function init() {
  try {
    const response = await fetch(basePath + "trip.json");

    if (!response.ok) {
      throw new Error("找不到 trip.json");
    }

    tripConfig = await response.json();

    document.title = tripConfig.title;
    document.getElementById("site-title").textContent = tripConfig.title;
    document.getElementById("site-description").textContent = tripConfig.description;

    renderNav();
    loadPage(currentPage);

  } catch (error) {
    document.getElementById("content").innerHTML = `
      <section class="card">
        <h2>資料載入失敗</h2>
        <p>請確認資料夾路徑是否正確：</p>
        <code>${basePath}</code>
      </section>
    `;

    console.error(error);
  }
}

function renderNav() {
  const nav = document.getElementById("nav");
  nav.innerHTML = "";

  tripConfig.pages.forEach(page => {
    const button = document.createElement("button");
    button.textContent = page.title;

    button.addEventListener("click", () => {
      loadPage(page.key);
    });

    nav.appendChild(button);
  });
}

async function loadPage(pageKey) {
  const page = tripConfig.pages.find(item => item.key === pageKey);

  if (!page) {
    document.getElementById("content").innerHTML = `
      <section class="card">
        <h2>找不到頁面</h2>
        <p>頁面代號不存在：${pageKey}</p>
      </section>
    `;
    return;
  }

  try {
    const response = await fetch(basePath + page.file);

    if (!response.ok) {
      throw new Error(`找不到頁面檔案：${page.file}`);
    }

    const html = await response.text();
    document.getElementById("content").innerHTML = html;

    const newUrl = `?trip=${tripPath}&page=${page.key}`;
    history.replaceState(null, "", newUrl);

    setActiveButton(page.key);

  } catch (error) {
    document.getElementById("content").innerHTML = `
      <section class="card">
        <h2>頁面載入失敗</h2>
        <p>請確認檔案是否存在：</p>
        <code>${basePath + page.file}</code>
      </section>
    `;

    console.error(error);
  }
}

function setActiveButton(pageKey) {
  const buttons = document.querySelectorAll("#nav button");

  buttons.forEach((button, index) => {
    const page = tripConfig.pages[index];

    if (page.key === pageKey) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

init();
