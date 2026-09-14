const fs = require("fs");
const path = require("path");
const { page, ROOT } = require("./build-pages");
const { MEMBERS } = require("./members-data");

const body = `<section class="brand-hero" id="hero">
    <div class="brand-hero__glow brand-hero__glow--day" aria-hidden="true"></div>
    <div class="brand-hero__glow brand-hero__glow--night" aria-hidden="true"></div>
    <div class="brand-hero__stars" aria-hidden="true"></div>
    <div class="brand-hero__grid max-w-7xl mx-auto">
      <div class="brand-hero__copy">
        <div class="brand-eyebrow">
          <span class="brand-eyebrow__dot"></span>
          <span>DAY TO NIGHT · CREATIVE STUDIO</span>
        </div>
        <div class="brand-hero__title-wrap">
          <p class="brand-hero__kicker">노을이 머물고, 밤의 이야기가 시작되는 시간</p>
          <h1 class="brand-hero__title">낮과 밤 사이,<br/><span>우리의 장면이<br/>됩니다.</span></h1>
          <p class="brand-hero__description"><strong>유튜브 팀 낮밤사이</strong>는 일상과 음악, 테크와 다큐멘터리를 우리만의 시선으로 기록합니다. 낮의 에너지와 밤의 몰입을 한 편의 영상에 담습니다.</p>
        </div>
        <div class="brand-hero__actions">
          <a class="brand-button brand-button--primary" href="projects.html">
            <span class="material-symbols-outlined">play_arrow</span>
            <span>콘텐츠 만나보기</span>
          </a>
          <a class="brand-button brand-button--ghost" href="members.html">
            <span>팀 이야기</span>
            <span class="material-symbols-outlined">arrow_outward</span>
          </a>
        </div>
        <div class="brand-hero__genres" aria-label="주요 콘텐츠 분야">
          <span>FILM</span><i></i><span>LIVE</span><i></i><span>TECH</span><i></i><span>DOCUMENTARY</span>
        </div>
      </div>
      <div class="brand-hero__visual" aria-label="낮과 밤이 교차하는 낮밤사이 로고">
        <div class="brand-orbit brand-orbit--outer" aria-hidden="true"></div>
        <div class="brand-orbit brand-orbit--inner" aria-hidden="true"></div>
        <span class="brand-orbit__label brand-orbit__label--day">DAY</span>
        <span class="brand-orbit__label brand-orbit__label--night">NIGHT</span>
        <div class="brand-emblem">
          <img alt="태양과 달, 도시 풍경이 담긴 낮밤사이 로고" src="img/logo.png"/>
        </div>
        <div class="brand-visual__caption">
          <span class="material-symbols-outlined">wb_twilight</span>
          <div><strong>BETWEEN DAY &amp; NIGHT</strong><small>Seoul · Since 2024</small></div>
        </div>
      </div>
    </div>
    <div class="brand-stats max-w-7xl mx-auto">
      <div class="brand-stats__intro">
        <span class="material-symbols-outlined">movie_filter</span>
        <p><strong>낮에는 기획하고, 밤에는 완성합니다.</strong><small>빛의 온도와 이야기의 밀도를 함께 설계하는 크리에이티브 팀</small></p>
      </div>
      <dl class="brand-stats__numbers">
        <div><dt>${MEMBERS.length}명</dt><dd>함께하는 크리에이터</dd></div>
        <div><dt>12.5만</dt><dd>채널 구독자</dd></div>
        <div><dt>4개</dt><dd>오리지널 시리즈</dd></div>
      </dl>
    </div>
  </section>
  <section class="w-full px-margin lg:px-margin-lg py-space-xl bg-surface-container-lowest" id="about">
    <div class="max-w-7xl mx-auto flex flex-col gap-space-xl">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div class="flex flex-col gap-space-xs">
          <div class="inline-flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider">
            <span class="">채널 정체성과 방향성</span>
          </div>
          <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">팀 낮밤사이 소개 <span class="text-on-surface-variant text-label-lg font-normal block md:inline md:ml-space-xs">(유튜브 미디어 크루 · sunsetdn)</span></h2>
        </div>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-xl">
          낮밤사이는 낮의 온기와 밤의 차분함이 교차하는 골든아워를 모티브로, 구독자들의 일상에 몰입과 쉼을 전달하는 영상을 만듭니다.
        </p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-stretch">
        <div class="lg:col-span-5 p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between gap-space-lg">
          <div class="flex flex-col gap-space-md">
            <div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-[28px]">videocam</span>
            </div>
            <h3 class="font-headline-md text-headline-md text-on-surface">빛과 어둠이 교차하는 영상미</h3>
            <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              정형화된 자극적인 유튜브 콘텐츠에서 벗어나, 시네마틱한 카메라 앵글, 독창적인 색보정(컬러그레이딩), 현장 사운드 디자인을 바탕으로 깊은 감동과 시각적 몰입감을 선사합니다.
            </p>
          </div>
          <div class="p-space-md rounded-lg bg-surface shadow-sm">
            <span class="font-label-sm text-label-sm text-primary font-semibold block mb-1">제작 크루 슬로건</span>
            <blockquote class="font-body-sm text-body-sm text-on-surface italic">
              "낮에는 치열하게 아이디어를 구성하고, 노을빛 아래 카메라를 들며, 밤의 정적 속에서 최고의 한 컷을 완성합니다."
            </blockquote>
          </div>
        </div>
        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-space-md">
          <div class="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-colors">
            <div class="flex flex-col gap-space-sm">
              <div class="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary-container shadow-sm">
                <span class="material-symbols-outlined text-[22px]">video_camera_back</span>
              </div>
              <h4 class="font-headline-md text-headline-md text-on-surface">오리지널 기획</h4>
              <span class="font-label-sm text-label-sm text-primary font-semibold">시네마틱 연출</span>
              <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                4K HDR 장비와 특수 렌즈군을 활용하여 매 회차 영화 같은 미장센과 시각적 즐거움을 구현합니다.
              </p>
            </div>
            <div class="mt-space-md pt-space-xs font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">check</span> 최고 수준의 영상미
            </div>
          </div>
          <div class="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-colors">
            <div class="flex flex-col gap-space-sm">
              <div class="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary shadow-sm">
                <span class="material-symbols-outlined text-[22px]">forum</span>
              </div>
              <h4 class="font-headline-md text-headline-md text-on-surface">구독자 소통</h4>
              <span class="font-label-sm text-label-sm text-primary font-semibold">커뮤니티와 팬덤</span>
              <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                정기 라이브 방송, 커뮤니티 투표, 오프라인 시사회와 상영회를 통해 팬들과 끈끈한 유대를 만듭니다.
              </p>
            </div>
            <div class="mt-space-md pt-space-xs font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">check</span> 활발한 실시간 소통
            </div>
          </div>
          <div class="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-colors">
            <div class="flex flex-col gap-space-sm">
              <div class="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-tertiary shadow-sm">
                <span class="material-symbols-outlined text-[22px]">handshake</span>
              </div>
              <h4 class="font-headline-md text-headline-md text-on-surface">브랜드 협업</h4>
              <span class="font-label-sm text-label-sm text-primary font-semibold">진정성 있는 브랜디드</span>
              <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                거부감 없는 자연스러운 스토리텔링과 세련된 감성으로 브랜드의 핵심 가치를 전달합니다.
              </p>
            </div>
            <div class="mt-space-md pt-space-xs font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">check</span> 맞춤형 브랜디드 PPL
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="w-full px-margin lg:px-margin-lg py-space-xl" id="sitemap">
    <div class="max-w-7xl mx-auto flex flex-col gap-space-lg">
      <div class="flex flex-col gap-space-xs">
        <div class="inline-flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider">
          <span class="">더 알아보기</span>
        </div>
        <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">낮밤사이를 더 자세히 둘러보세요</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <a class="group p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm flex flex-col justify-between gap-space-md" href="members.html">
          <div class="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-primary shadow-sm"><span class="material-symbols-outlined text-[26px]">group</span></div>
          <div>
            <h3 class="font-headline-md text-headline-md text-on-surface">팀원 소개</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">낮밤사이 ${MEMBERS.length}명의 멤버를 소개합니다.</p>
          </div>
          <span class="font-label-sm text-label-sm text-primary font-semibold inline-flex items-center gap-1">바로가기 <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span></span>
        </a>
        <a class="group p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm flex flex-col justify-between gap-space-md" href="tech.html">
          <div class="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-primary shadow-sm"><span class="material-symbols-outlined text-[26px]">work</span></div>
          <div>
            <h3 class="font-headline-md text-headline-md text-on-surface">직군 소개</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">팀 내 역할과 직군 구성을 확인해보세요.</p>
          </div>
          <span class="font-label-sm text-label-sm text-primary font-semibold inline-flex items-center gap-1">바로가기 <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span></span>
        </a>
        <a class="group p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm flex flex-col justify-between gap-space-md" href="projects.html">
          <div class="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-primary shadow-sm"><span class="material-symbols-outlined text-[26px]">movie</span></div>
          <div>
            <h3 class="font-headline-md text-headline-md text-on-surface">콘텐츠 / 영상</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">대표 기획 시리즈와 영상들을 만나보세요.</p>
          </div>
          <span class="font-label-sm text-label-sm text-primary font-semibold inline-flex items-center gap-1">바로가기 <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span></span>
        </a>
        <a class="group p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm flex flex-col justify-between gap-space-md" href="activity.html">
          <div class="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-primary shadow-sm"><span class="material-symbols-outlined text-[26px]">timeline</span></div>
          <div>
            <h3 class="font-headline-md text-headline-md text-on-surface">활동 기록</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">채널의 주요 히스토리를 확인해보세요.</p>
          </div>
          <span class="font-label-sm text-label-sm text-primary font-semibold inline-flex items-center gap-1">바로가기 <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span></span>
        </a>
      </div>
    </div>
  </section>`;

fs.writeFileSync(
  path.join(ROOT, "index.html"),
  page("about", "낮밤사이 (sunsetdn) - 유튜브 크리에이티브 팀 공식 웹사이트", "낮과 밤이 교차하는 순간을 담는 유튜브 크리에이티브 팀 낮밤사이의 공식 웹사이트입니다.", body),
  "utf8"
);
console.log("index.html generated");
