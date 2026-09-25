document.addEventListener("DOMContentLoaded", () => {
  const progress = document.getElementById("progressBar");
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  const search = document.getElementById("state-search");
  const cards = [...document.querySelectorAll(".state-card")];
  const count = document.getElementById("state-count");
  const empty = document.getElementById("state-empty");

  function updateScrollUI(){
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = height > 0 ? `${(scrollTop / height) * 100}%` : "0%";
    header.classList.toggle("scrolled", scrollTop > 20);
  }
  window.addEventListener("scroll", updateScrollUI, {passive:true});
  updateScrollUI();

  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  function filterStates(){
    const q = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const name = card.dataset.name || "";
      const show = name.includes(q);
      card.hidden = !show;
      if(show) visible++;
    });
    count.textContent = `${visible} place${visible === 1 ? "" : "s"}`;
    empty.hidden = visible !== 0;
  }
  search.addEventListener("input", filterStates);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:"smooth", block:"start"});
      }
    });
  });
});
