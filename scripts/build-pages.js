// One-off generator for the multi-page static site. Run with `node scripts/build-pages.js`.
// Not part of the webpack build; just used to keep the duplicated header/footer markup
// consistent across index.html / members.html / tech.html / commission.html.
const fs = require("fs");
const path = require("path");
const { MEMBERS } = require("./members-data");
const { TECH_MEMBERS } = require("./tech-members-data");

const ROOT = path.resolve(__dirname, "..");

const SITE_URL = "https://sunsetdn.parin.asia";
const SITE_NAME = "낮밤사이 (SUNSETDN)";
const DEFAULT_OG_IMAGE = "img/logo.webp";

// Everything the command palette can jump to. Built from the same data the
// pages are generated from so the two can never drift apart.
function searchIndex() {
  const pages = NAV_ITEMS.map((item) => ({
    type: "페이지",
    name: item.label,
    hint: item.href,
    url: item.href,
    icon: "description",
  }));

  const members = MEMBERS.map((member) => ({
    type: "팀원",
    name: member.name,
    hint: [member.aka, member.roles.join(" · ")].filter(Boolean).join(" — "),
    url: `members.html#member-${member.id}`,
    icon: "person",
    color: member.color || null,
  }));

  const tech = TECH_MEMBERS.map((member) => ({
    type: "기술직",
    name: member.name,
    hint: [member.fullName, member.roles.join(" · ")].filter(Boolean).join(" — "),
    url: `members.html#tech-${member.id}`,
    icon: "engineering",
    color: member.color || null,
  }));

  const roles = [...new Set(MEMBERS.flatMap((member) => member.roles))].map((role) => ({
    type: "직군",
    name: role,
    hint: `${role} 역할의 팀원 보기`,
    url: `members.html?role=${encodeURIComponent(role)}`,
    icon: "workspace_premium",
  }));

  return JSON.stringify([...pages, ...members, ...tech, ...roles]);
}

function organizationLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "낮밤사이",
    url: SITE_URL,
    logo: `${SITE_URL}/${DEFAULT_OG_IMAGE}`,
  });
}

function head(title, description, pagePath = "index.html", ogImage = DEFAULT_OG_IMAGE) {
  const canonical = `${SITE_URL}/${pagePath}`;
  const ogImageUrl = `${SITE_URL}/${ogImage}`;
  return `<!DOCTYPE html>

<html class="scroll-smooth" data-theme="day" lang="ko"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="${description}" name="description"/><link href="${canonical}" rel="canonical"/><meta content="#fff8df" media="(prefers-color-scheme: light)" name="theme-color"/><meta content="#062b55" media="(prefers-color-scheme: dark)" name="theme-color"/><link href="favicon.ico" rel="icon" sizes="any"/><link href="icon.png" rel="apple-touch-icon"/><link href="site.webmanifest" rel="manifest"/><title>${title}</title><meta content="website" property="og:type"/><meta content="${SITE_NAME}" property="og:site_name"/><meta content="${title}" property="og:title"/><meta content="${description}" property="og:description"/><meta content="${canonical}" property="og:url"/><meta content="${ogImageUrl}" property="og:image"/><meta content="ko_KR" property="og:locale"/><meta content="summary_large_image" name="twitter:card"/><meta content="${title}" name="twitter:title"/><meta content="${description}" name="twitter:description"/><meta content="${ogImageUrl}" name="twitter:image"/><script>(function(){try{var root=document.documentElement;var saved=localStorage.getItem("sunsetdn-theme");var night;if(saved==="night"||saved==="day"){night=saved==="night";}else{var prefersDark=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;var hour=new Date().getHours();night=prefersDark||hour<7||hour>=19;root.dataset.themeAuto="true";}root.classList.toggle("dark",night);root.dataset.theme=night?"night":"day";}catch(error){}})();</script><script type="speculationrules">{"prerender":[{"where":{"and":[{"href_matches":"/*.html"},{"not":{"selector_matches":"[target=_blank]"}}]},"eagerness":"moderate"}]}</script><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;family=Noto+Sans+KR:wght@400;500;600;700;900&amp;display=swap" rel="stylesheet"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base { html, body { margin: 0; padding: 0; font-family: 'Noto Sans KR', 'Inter', sans-serif; } body { overscroll-behavior: none; } main > :first-child { margin-top: 0 !important; } main > :last-child { margin-bottom: 0 !important; } } ::-webkit-scrollbar { display: none; }</style><link href="css/tailwind.css" rel="stylesheet"/><link href="css/brand.css" rel="stylesheet"/><script type="application/ld+json">${organizationLd()}</script></head>`;
}

const NAV_ITEMS = [
  { key: "about", href: "index.html", label: "소개" },
  { key: "members", href: "members.html", label: "팀원" },
  { key: "tech", href: "tech.html", label: "직군 소개" },
  { key: "commission", href: "commission.html", label: "커미션 신청" },
];

function desktopNav(active) {
  return NAV_ITEMS.map((item) => {
    const isActive = item.key === active;
    const cls = isActive
      ? "transition-colors py-1 text-primary font-bold"
      : "font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-1";
    const current = isActive ? ' aria-current="page"' : "";
    return `<a${current} class="${cls}" data-path="${item.key}" href="${item.href}">${item.label}</a>`;
  }).join("");
}

function mobileNav(active) {
  return NAV_ITEMS.map((item) => {
    const isActive = item.key === active;
    const cls = isActive
      ? "px-space-md py-space-sm rounded-lg transition-colors bg-primary-container text-on-primary-container font-bold"
      : "px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-lg text-label-lg transition-colors";
    const current = isActive ? ' aria-current="page"' : "";
    return `<a${current} class="${cls}" data-path="${item.key}" href="${item.href}">${item.label}</a>`;
  }).join("");
}

function themeToggle() {
  return `<button aria-label="밤 모드로 전환" aria-pressed="false" class="theme-toggle" data-theme-toggle title="밤 모드로 전환" type="button"><span aria-hidden="true" class="theme-toggle__sun">☀</span><span aria-hidden="true" class="theme-toggle__track"><span class="theme-toggle__thumb"></span></span><span aria-hidden="true" class="theme-toggle__moon">☾</span><span class="sr-only" data-theme-label>현재 낮 모드</span></button>`;
}

function searchTrigger() {
  return `<button class="search-trigger" data-search-open type="button" aria-label="빠른 검색 열기"><span class="material-symbols-outlined" aria-hidden="true">search</span><span class="search-trigger__label">검색</span><kbd class="search-trigger__key" data-search-hotkey aria-hidden="true">Ctrl K</kbd></button>`;
}

// Shared overlays: command palette, portrait lightbox, toast region and the
// scroll progress bar. All are inert until js/app.js wires them up.
function overlays() {
  return `<div class="scroll-progress" aria-hidden="true"></div>
<dialog class="cmdk" data-search-dialog aria-label="빠른 검색">
  <div class="cmdk__field">
    <span class="material-symbols-outlined" aria-hidden="true">search</span>
    <input class="cmdk__input" data-search-input type="text" autocomplete="off" spellcheck="false" placeholder="멤버 · 직군 · 페이지 검색 (초성 가능)" aria-label="검색어" aria-controls="cmdk-results" aria-expanded="true" role="combobox"/>
  </div>
  <ul class="cmdk__results" data-search-results id="cmdk-results" role="listbox" aria-label="검색 결과"></ul>
  <p class="cmdk__empty" data-search-empty hidden>일치하는 항목이 없습니다.</p>
  <div class="cmdk__footer"><span><kbd>↑</kbd><kbd>↓</kbd> 이동</span><span><kbd>Enter</kbd> 열기</span><span><kbd>Esc</kbd> 닫기</span></div>
</dialog>
<dialog class="lightbox" data-lightbox aria-label="이미지 크게 보기">
  <button class="lightbox__close" data-lightbox-close type="button" aria-label="닫기"><span class="material-symbols-outlined" aria-hidden="true">close</span></button>
  <figure class="lightbox__figure">
    <img alt="" data-lightbox-image src=""/>
    <figcaption data-lightbox-caption></figcaption>
  </figure>
</dialog>
<div class="toast-region" data-toast-region role="status" aria-live="polite"></div>`;
}

function header(active) {
  return `<header class="site-header fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="site-header__inner h-16 max-w-7xl mx-auto px-margin lg:px-margin-lg flex items-center justify-between gap-space-md"><div class="flex items-center gap-space-sm"><a class="site-brand flex items-center gap-space-sm focus:outline-none" data-path="about" href="index.html"><img alt="낮밤사이 브랜드 로고" class="brand-logo h-8 w-8 object-contain" src="img/logo.webp"/><span class="flex flex-col"><span class="font-label-lg text-label-lg text-on-surface tracking-tight leading-none font-bold">낮밤사이</span><span class="font-label-sm text-label-sm text-on-surface-variant font-normal leading-none mt-space-xs">SUNSETDN</span></span></a><span class="site-brand__tag hidden sm:inline-flex items-center px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm ml-space-xs">OFFICIAL</span></div><nav class="site-nav hidden md:flex items-center gap-space-md lg:gap-space-lg" data-active-classes="text-primary font-bold">${desktopNav(active)}</nav><div class="site-header__actions flex items-center gap-space-sm">${searchTrigger()}${themeToggle()}<button aria-expanded="false" aria-label="메뉴 열기" class="site-menu md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface focus:outline-none transition-colors" onclick="const d = document.getElementById('mobile-drawer'); const isOpen = d.classList.toggle('hidden'); this.setAttribute('aria-expanded', !isOpen);" type="button"><span class="material-symbols-outlined text-[20px]">menu</span></button></div></div><div class="hidden md:hidden bg-surface-container-low shadow-[0_8px_24px_-4px_rgba(15,23,42,0.08)] px-margin py-space-md" id="mobile-drawer"><nav class="flex flex-col gap-space-xs" data-active-classes="bg-primary-container text-on-primary-container font-bold">${mobileNav(active)}</nav></div></header>`;
}

function footer() {
  return `<footer class="site-footer w-full bg-surface-container-low text-on-surface-variant"><div class="max-w-7xl mx-auto px-margin lg:px-margin-lg py-space-xl"><div class="flex flex-col gap-space-lg"><div class="flex items-center gap-space-sm"><img alt="" aria-hidden="true" class="site-footer__logo" src="img/logo.webp"/><span class="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">낮밤사이</span><span class="font-label-sm text-label-sm text-on-surface-variant">SUNSETDN</span></div><div class="site-footer__bottom pt-space-md font-label-sm text-label-sm text-on-surface-variant"><p>© 2026 낮밤사이 (sunsetdn). All rights reserved.</p></div></div></div></footer>`;
}

function page(active, title, description, bodyHtml, pagePath, extraScript = "") {
  return `${head(title, description, pagePath)}<body class="bg-background font-body-md text-body-md text-on-surface antialiased flex flex-col min-h-screen selection:bg-primary-container selection:text-on-primary-container">${header(
    active
  )}<main class="site-main w-full pt-16 flex-1 bg-background"><div class="flex flex-col w-full">
${bodyHtml}
</div></main>${footer()}
${overlays()}
<script type="application/json" data-search-index>${searchIndex()}</script>
<script defer src="js/app.js"></script>
${extraScript}
<script>(function(){var root=document.documentElement;var controls=document.querySelectorAll("[data-theme-toggle]");function sync(){var night=root.classList.contains("dark");root.dataset.theme=night?"night":"day";controls.forEach(function(button){button.setAttribute("aria-pressed",String(night));button.setAttribute("aria-label",night?"낮 모드로 전환":"밤 모드로 전환");button.title=night?"낮 모드로 전환":"밤 모드로 전환";var label=button.querySelector("[data-theme-label]");if(label)label.textContent=night?"현재 밤 모드":"현재 낮 모드";});}function applyTheme(night){root.classList.toggle("dark",night);try{localStorage.setItem("sunsetdn-theme",night?"night":"day");}catch(error){}sync();}controls.forEach(function(button){button.addEventListener("click",function(event){var night=!root.classList.contains("dark");var reduceMotion=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!reduceMotion&&document.startViewTransition){var rect=button.getBoundingClientRect();var x=event.clientX||rect.left+rect.width/2;var y=event.clientY||rect.top+rect.height/2;var endRadius=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));root.classList.add("theme-changing");var transition=document.startViewTransition(function(){applyTheme(night);});transition.ready.then(function(){root.animate({clipPath:["circle(0px at "+x+"px "+y+"px)","circle("+endRadius+"px at "+x+"px "+y+"px)"]},{duration:500,easing:"ease-in-out",pseudoElement:"::view-transition-new(root)"});});transition.finished.finally(function(){root.classList.remove("theme-changing");});}else{root.classList.add("theme-changing");applyTheme(night);window.setTimeout(function(){root.classList.remove("theme-changing");},350);}});});sync();})();</script>
</body></html>
`;
}

module.exports = { page, ROOT };
