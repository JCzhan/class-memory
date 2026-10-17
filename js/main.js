// ===== 1. 导航当前页高亮 =====
(function highlightCurrentNav() {
  // 获取当前页面的文件名，例如 index.html、memories.html
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(function (link) {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
})();

// ===== 2. 文字回忆搜索 =====
(function setupMemorySearch() {
  const searchInput = document.getElementById("memory-search");

  // 如果当前页面没有搜索框，就直接结束
  if (!searchInput) return;

  const articles = document.querySelectorAll("main article");
  const main = document.querySelector("main");

  // 创建“没有结果”的提示元素，先隐藏
  const noResult = document.createElement("p");
  noResult.className = "no-result";
  noResult.textContent = "没有找到匹配的回忆，换个关键词试试。";
  noResult.style.display = "none";
  main.appendChild(noResult);

  searchInput.addEventListener("input", function () {
    const keyword = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    articles.forEach(function (article) {
      const text = article.textContent.toLowerCase();
      const matched = text.includes(keyword);
      article.style.display = matched ? "" : "none";
      if (matched) visibleCount++;
    });

    noResult.style.display = visibleCount === 0 ? "block" : "none";
  });
})();