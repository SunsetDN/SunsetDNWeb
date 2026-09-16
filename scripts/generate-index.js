const fs = require("fs");
const path = require("path");
const { page, ROOT } = require("./build-pages");
const { MEMBERS } = require("./members-data");

// Unknown public metrics stay at zero until the team provides an official
// value. The subscriber count is replaced at runtime by js/app.js.
const PUBLIC_STATS = {
  subscribers: 0,
  projects: 0,
};

const body = `<section class="brand-hero" id="hero">
    <div class="brand-hero__glow brand-hero__glow--day" aria-hidden="true"></div>
    <div class="brand-hero__glow brand-hero__glow--night" aria-hidden="true"></div>
    <div class="brand-hero__stars" aria-hidden="true"></div>
    <div class="brand-hero__grid max-w-7xl mx-auto">
      <div class="brand-hero__copy">
        <div class="brand-eyebrow">
          <span class="brand-eyebrow__dot"></span>
          <span>낮밤사이 공식 웹사이트</span>
        </div>
        <div class="brand-hero__title-wrap">
          <h1 class="brand-hero__title">낮밤사이<br/><span>SUNSETDN</span></h1>
          <p class="brand-hero__description">현재 확인된 팀원 정보만 공개하고 있습니다.</p>
        </div>
        <div class="brand-hero__actions">
          <a class="brand-button brand-button--primary" href="members.html">
            <span class="material-symbols-outlined">group</span>
            <span>팀원 보기</span>
          </a>
          <a class="brand-button brand-button--ghost" href="tech.html">
            <span>기술직 보기</span>
            <span class="material-symbols-outlined">arrow_outward</span>
          </a>
        </div>
      </div>
      <div class="brand-hero__visual" aria-label="낮밤사이 로고">
        <div class="brand-orbit brand-orbit--outer" aria-hidden="true"></div>
        <div class="brand-orbit brand-orbit--inner" aria-hidden="true"></div>
        <div class="brand-emblem">
          <img alt="낮밤사이 로고" src="img/logo.webp"/>
        </div>
        <div class="brand-visual__caption">
          <div><strong>SUNSETDN</strong><small>OFFICIAL WEBSITE</small></div>
        </div>
      </div>
    </div>
    <div class="brand-stats max-w-7xl mx-auto">
      <div class="brand-stats__intro">
        <span class="material-symbols-outlined">verified</span>
        <p><strong>확인된 정보만 표시합니다.</strong><small>등록되지 않은 공개 수치와 콘텐츠는 0으로 표시됩니다.</small></p>
      </div>
      <dl class="brand-stats__numbers">
        <div><dt>${MEMBERS.length}명</dt><dd>확인된 크루 멤버</dd></div>
        <div><dt aria-live="polite" data-youtube-subscriber-count>${PUBLIC_STATS.subscribers}명</dt><dd>구독자 수</dd></div>
        <div><dt>${PUBLIC_STATS.projects}개</dt><dd>등록된 콘텐츠</dd></div>
      </dl>
    </div>
  </section>
  <section class="w-full px-margin lg:px-margin-lg py-space-xl" id="sitemap">
    <div class="max-w-7xl mx-auto flex flex-col gap-space-lg">
      <div class="flex flex-col gap-space-xs">
        <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">사이트 둘러보기</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
        <a class="group reveal-on-scroll p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm flex flex-col justify-between gap-space-md" href="members.html">
          <div class="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-primary shadow-sm"><span class="material-symbols-outlined text-[26px]">group</span></div>
          <div><h3 class="font-headline-md text-headline-md text-on-surface">팀원 소개</h3><p class="font-body-sm text-body-sm text-on-surface-variant mt-1">확인된 크루 멤버 정보를 소개합니다.</p></div>
          <span class="font-label-sm text-label-sm text-primary font-semibold inline-flex items-center gap-1">바로가기 <span class="material-symbols-outlined text-[16px]">arrow_forward</span></span>
        </a>
        <a class="group reveal-on-scroll p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm flex flex-col justify-between gap-space-md" href="tech.html">
          <div class="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-primary shadow-sm"><span class="material-symbols-outlined text-[26px]">work</span></div>
          <div><h3 class="font-headline-md text-headline-md text-on-surface">직군 소개</h3><p class="font-body-sm text-body-sm text-on-surface-variant mt-1">확인된 역할과 직군을 소개합니다.</p></div>
          <span class="font-label-sm text-label-sm text-primary font-semibold inline-flex items-center gap-1">바로가기 <span class="material-symbols-outlined text-[16px]">arrow_forward</span></span>
        </a>
        <a class="group reveal-on-scroll p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm flex flex-col justify-between gap-space-md" href="commission.html">
          <div class="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-primary shadow-sm"><span class="material-symbols-outlined text-[26px]">handshake</span></div>
          <div><h3 class="font-headline-md text-headline-md text-on-surface">커미션 신청</h3><p class="font-body-sm text-body-sm text-on-surface-variant mt-1">디스코드로 외주 문의를 받습니다.</p></div>
          <span class="font-label-sm text-label-sm text-primary font-semibold inline-flex items-center gap-1">바로가기 <span class="material-symbols-outlined text-[16px]">arrow_forward</span></span>
        </a>
      </div>
    </div>
  </section>`;

fs.writeFileSync(
  path.join(ROOT, "index.html"),
  page(
    "about",
    "낮밤사이 (sunsetdn) 공식 웹사이트",
    "낮밤사이 공식 웹사이트입니다.",
    body,
    "index.html",
    '<script defer src="js/app.js"></script>'
  ),
  "utf8"
);
console.log("index.html generated");
