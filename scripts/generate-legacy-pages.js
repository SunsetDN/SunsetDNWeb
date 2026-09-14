// Relocates the original (fictional placeholder) projects/activity/contact sections
// from the old single-page index.html into their own static pages, unchanged in content.
const fs = require("fs");
const path = require("path");
const { page, ROOT } = require("./build-pages");

function buildProjectsPage() {
  const body = `<section class="w-full px-margin lg:px-margin-lg py-space-xl" id="projects">
    <div class="max-w-7xl mx-auto flex flex-col gap-space-lg">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <div class="inline-flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider">
            <span class="">유튜브 대표 콘텐츠</span>
          </div>
          <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            주요 기획 시리즈 및 영상 <span class="text-on-surface-variant text-label-lg font-normal block md:inline md:ml-space-xs">(재생목록)</span>
          </h1>
          <p class="font-body-md text-body-md text-on-surface-variant mt-1">감각적인 시네마틱 다큐멘터리부터 야간 작업 플레이리스트까지, 낮밤사이의 대표 영상들입니다.</p>
        </div>
        <div class="flex flex-wrap items-center gap-space-xs" id="project-filters">
          <button class="filter-chip px-space-md py-1.5 rounded-lg font-label-sm text-label-sm transition-all bg-primary-container text-on-primary font-semibold shadow-sm" data-filter="all" type="button">
            전체 영상
          </button>
          <button class="filter-chip px-space-md py-1.5 rounded-lg font-label-sm text-label-sm transition-all bg-surface-container text-on-surface hover:bg-surface-container-high" data-filter="시네마틱" type="button">
            시네마틱
          </button>
          <button class="filter-chip px-space-md py-1.5 rounded-lg font-label-sm text-label-sm transition-all bg-surface-container text-on-surface hover:bg-surface-container-high" data-filter="플레이리스트" type="button">
            플레이리스트
          </button>
          <button class="filter-chip px-space-md py-1.5 rounded-lg font-label-sm text-label-sm transition-all bg-surface-container text-on-surface hover:bg-surface-container-high" data-filter="브랜디드 필름" type="button">
            브랜디드 필름
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter" id="projects-container"></div>
    </div>
  </section>`;

  const script = `<script>
  (function () {
    const projects = ${JSON.stringify(
      [
        {
          title: "도심의 골든아워: 서울의 황혼을 걷다",
          category: "시네마틱",
          status: "인기 급상승",
          statusColor: "bg-primary-container text-on-primary",
          description: "오후 6시 20분부터 7시 40분까지, 퇴근길 도시 풍경과 한강의 따뜻한 잔상을 4K 60fps 초고화질 시네마틱 영상미로 담아낸 시리즈 대표작입니다.",
          tags: ["4K HDR", "도시 감성", "색보정 룩북"],
          metaText: "조회수 48만회 · 댓글 1,200개",
          linkText: "유튜브에서 시청",
          url: "https://www.youtube.com",
        },
        {
          title: "심야 작업실: 잠들지 못하는 이들을 위한 음악",
          category: "플레이리스트",
          status: "실시간 스트리밍",
          statusColor: "bg-tertiary-fixed text-on-tertiary-fixed font-bold",
          description: "팀 낮밤사이가 직접 작곡·믹싱한 오리지널 로파이 및 칠합 비트로 구성된 24시간 연속 재생 노동요 라이브 스트림입니다.",
          tags: ["로파이 비트", "노동요", "라이브 스트림"],
          metaText: "동시 시청자 3,500명",
          linkText: "라이브 참여",
          url: "https://www.youtube.com",
        },
        {
          title: "공간에 스며드는 빛 (공식 브랜드 필름)",
          category: "브랜디드 필름",
          status: "공식 협업",
          statusColor: "bg-primary-container text-on-primary",
          description: "라이프스타일 조명 브랜드와 공동 제작한 브랜디드 시네마틱 단편으로, 자연광의 변화와 조명의 조화를 서정적인 이야기로 풀어냈습니다.",
          tags: ["브랜드 협업", "스폰서십", "스토리텔링"],
          metaText: "전환율 18.4% 달성",
          linkText: "필름 감상",
          url: "https://www.youtube.com",
        },
        {
          title: "유튜브 영상 톤을 180도 바꾸는 노을빛 조명 세팅법",
          category: "시네마틱",
          status: "노하우 공유",
          statusColor: "bg-primary-container text-on-primary",
          description: "스튜디오 촬영에서 자연스러운 일몰 감성을 연출하는 3점 조명 기법과 초보자도 쉽게 따라 할 수 있는 색보정 LUT 무료 배포 영상입니다.",
          tags: ["촬영 튜토리얼", "무료 LUT 배포", "제작 팁"],
          metaText: "LUT 다운로드 2.4만 건",
          linkText: "강의 시청",
          url: "https://www.youtube.com",
        },
      ]
    )};

    const projectsContainer = document.getElementById("projects-container");
    function renderProjects(filter) {
      const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);
      projectsContainer.innerHTML = filtered
        .map(
          (p) => \`
        <article class="p-space-md lg:p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
          <div class="flex flex-col gap-space-md">
            <div class="relative w-full h-48 rounded-lg overflow-hidden bg-surface-container">
              <div class="absolute top-2 right-2 px-space-xs py-0.5 rounded font-label-sm text-label-sm \${p.statusColor} shadow-sm">\${p.status}</div>
              <div class="absolute bottom-2 left-2 px-space-xs py-0.5 rounded font-label-sm text-label-sm bg-surface/90 backdrop-blur-sm text-on-surface">\${p.category}</div>
            </div>
            <div>
              <h3 class="font-headline-md text-headline-md font-semibold text-on-surface">\${p.title}</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mt-space-xs">\${p.description}</p>
            </div>
            <div class="flex flex-wrap gap-space-xs">\${p.tags.map((t) => \`<span class="px-2 py-0.5 rounded bg-surface font-label-sm text-label-sm text-on-secondary-container">\${t}</span>\`).join('')}</div>
          </div>
          <div class="mt-space-md pt-space-sm flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-on-surface-variant">\${p.metaText}</span>
            <a href="\${p.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary font-semibold hover:underline">
              <span class="material-symbols-outlined text-[16px]">play_arrow</span> \${p.linkText}
            </a>
          </div>
        </article>\`
        )
        .join("");
    }
    renderProjects("all");
    document.querySelectorAll(".filter-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-chip").forEach((b) => {
          b.classList.remove("bg-primary-container", "text-on-primary", "font-semibold");
          b.classList.add("bg-surface-container", "text-on-surface");
        });
        btn.classList.add("bg-primary-container", "text-on-primary", "font-semibold");
        btn.classList.remove("bg-surface-container", "text-on-surface");
        renderProjects(btn.dataset.filter);
      });
    });
  })();
  </script>`;

  return page("projects", "콘텐츠 / 영상 - 낮밤사이 (sunsetdn)", "낮밤사이의 대표 유튜브 콘텐츠와 영상 시리즈를 소개합니다.", body, script);
}

function buildActivityPage() {
  const activities = [
    { date: "2025.02", badge: "구독자 달성", title: "유튜브 구독자 10만 명 돌파 (실버버튼 수상)", description: "구독자 10만 명을 공식 돌파하여 유튜브 실버 크리에이터 어워드를 수상하고 기념 라이브 Q&A 파티를 진행했습니다.", icon: "military_tech" },
    { date: "2024.12", badge: "영화제 수상", title: "단편 웹필름 페스티벌 최우수 영상미상 수상", description: "자체 제작 오리지널 영상 '서울의 노을'이 웹필름 페스티벌에서 심사위원 만장일치로 최우수 시각 연출상을 수상했습니다.", icon: "theaters" },
    { date: "2024.10", badge: "오프라인 행사", title: "제1회 낮밤사이 팬미팅 & 사운드 청음회 개최", description: "성수동 복합문화공간에서 100여 명의 구독자 분들을 초대하여 오리지널 OST 라이브 청음회와 비하인드 토크를 열었습니다.", icon: "campaign" },
    { date: "2024.08", badge: "창단", title: "유튜브 팀 낮밤사이 공식 창단 및 채널 개설", description: "총괄 PD, 촬영감독, 편집장, 사운드 디자이너 4명이 뜻을 모아 '낮밤사이' 유튜브 채널을 정식 오픈하고 첫 영상을 공개했습니다.", icon: "flag" },
  ];

  const items = activities
    .map(
      (act, index) => `<div class="relative flex items-start gap-space-md lg:gap-space-lg">
        ${index !== activities.length - 1 ? '<div class="absolute left-5 top-10 bottom-0 w-0.5 bg-surface-container -translate-x-1/2"></div>' : ""}
        <div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0 z-10 shadow-sm">
          <span class="material-symbols-outlined text-[20px]">${act.icon}</span>
        </div>
        <div class="flex flex-col gap-1 pb-space-sm">
          <div class="flex flex-wrap items-center gap-space-xs">
            <span class="font-label-sm text-label-sm font-bold text-primary tracking-wider">${act.date}</span>
            <span class="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">${act.badge}</span>
          </div>
          <h3 class="font-headline-md text-headline-md font-semibold text-on-surface">${act.title}</h3>
          <p class="font-body-sm text-body-sm text-on-surface-variant max-w-2xl leading-relaxed">${act.description}</p>
        </div>
      </div>`
    )
    .join("\n");

  const body = `<section class="w-full px-margin lg:px-margin-lg py-space-xl" id="activity">
    <div class="max-w-7xl mx-auto flex flex-col gap-space-lg">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm">
        <div>
          <div class="inline-flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider">
            <span class="">채널 성장 발자취</span>
          </div>
          <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            주요 활동 기록 <span class="text-on-surface-variant text-label-lg font-normal block sm:inline sm:ml-space-xs">(히스토리)</span>
          </h1>
        </div>
        <span class="font-label-sm text-label-sm text-on-surface-variant">첫 촬영부터 지금까지 이어온 기록</span>
      </div>
      <div class="w-full bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-xl shadow-sm">
        <div class="relative flex flex-col gap-space-lg">
          ${items}
        </div>
      </div>
    </div>
  </section>`;

  return page("activity", "활동 기록 - 낮밤사이 (sunsetdn)", "낮밤사이 채널의 주요 활동 히스토리를 소개합니다.", body);
}

function buildContactPage() {
  const body = `<section class="w-full px-margin lg:px-margin-lg py-space-xl" id="contact">
    <div class="max-w-7xl mx-auto flex flex-col gap-space-xl">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg bg-surface-container-low p-space-lg lg:p-space-xl rounded-2xl shadow-sm">
        <div class="flex flex-col gap-space-xs max-w-xl">
          <div class="inline-flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider">
            <span class="">비즈니스 및 제휴</span>
          </div>
          <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">협업 및 비즈니스 문의 <span class="text-on-surface-variant text-label-lg font-normal block sm:inline">(브랜드 제휴 · 제작 의뢰)</span></h1>
          <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-1">
            브랜디드 영상 제작, 유튜브 PPL 스폰서십, 공간 영상 연출, 음원 제작 등 다양한 프로젝트 제안을 환영합니다. 함께 특별한 이야기를 만들어가요.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-space-sm">
          <a class="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg transition-colors shadow-sm" href="mailto:contact@sunsetdn.org">
            <span class="material-symbols-outlined text-[18px]">outgoing_mail</span>
            <span class="">협업 제안 메일 보내기</span>
          </a>
          <a class="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors shadow-sm" href="https://www.youtube.com" rel="noopener noreferrer" target="_blank">
            <span class="material-symbols-outlined text-[18px]">smart_display</span>
            <span class="">공식 유튜브 채널</span>
          </a>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <a class="group p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm flex flex-col justify-between gap-space-md" href="https://www.youtube.com" rel="noopener noreferrer" target="_blank">
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-lg bg-surface-container group-hover:bg-primary-container/20 group-hover:text-primary flex items-center justify-center text-on-surface transition-colors">
              <span class="material-symbols-outlined text-[20px]">smart_display</span>
            </div>
            <span class="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">north_east</span>
          </div>
          <div>
            <span class="font-label-sm text-label-sm text-primary uppercase">영상 채널</span>
            <h3 class="font-label-lg text-label-lg text-on-surface font-semibold">공식 유튜브 채널</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant">youtube.com/@sunsetdn</p>
          </div>
        </a>
        <a class="group p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm flex flex-col justify-between gap-space-md" href="mailto:contact@sunsetdn.org">
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-lg bg-surface-container group-hover:bg-primary-container/20 group-hover:text-primary flex items-center justify-center text-on-surface transition-colors">
              <span class="material-symbols-outlined text-[20px]">mail</span>
            </div>
            <span class="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">north_east</span>
          </div>
          <div>
            <span class="font-label-sm text-label-sm text-primary uppercase">비즈니스 제휴</span>
            <h3 class="font-label-lg text-label-lg text-on-surface font-semibold">공식 문의 이메일</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant">contact@sunsetdn.org</p>
          </div>
        </a>
        <a class="group p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm flex flex-col justify-between gap-space-md" href="#">
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-lg bg-surface-container group-hover:bg-primary-container/20 group-hover:text-primary flex items-center justify-center text-on-surface transition-colors">
              <span class="material-symbols-outlined text-[20px]">forum</span>
            </div>
            <span class="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">north_east</span>
          </div>
          <div>
            <span class="font-label-sm text-label-sm text-primary uppercase">구독자 소통</span>
            <h3 class="font-label-lg text-label-lg text-on-surface font-semibold">팬 커뮤니티 라운지</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant">디스코드 &amp; 오픈채팅</p>
          </div>
        </a>
        <a class="group p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm flex flex-col justify-between gap-space-md" href="https://www.instagram.com" rel="noopener noreferrer" target="_blank">
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-lg bg-surface-container group-hover:bg-primary-container/20 group-hover:text-primary flex items-center justify-center text-on-surface transition-colors">
              <span class="material-symbols-outlined text-[20px]">photo_camera</span>
            </div>
            <span class="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">north_east</span>
          </div>
          <div>
            <span class="font-label-sm text-label-sm text-primary uppercase">비하인드 &amp; 일상</span>
            <h3 class="font-label-lg text-label-lg text-on-surface font-semibold">공식 인스타그램</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant">@sunsetdn_official</p>
          </div>
        </a>
      </div>
    </div>
  </section>`;

  return page("contact", "협업 문의 - 낮밤사이 (sunsetdn)", "낮밤사이와의 브랜드 협업 및 비즈니스 제휴 문의 방법을 안내합니다.", body);
}

fs.writeFileSync(path.join(ROOT, "projects.html"), buildProjectsPage(), "utf8");
fs.writeFileSync(path.join(ROOT, "activity.html"), buildActivityPage(), "utf8");
fs.writeFileSync(path.join(ROOT, "contact.html"), buildContactPage(), "utf8");
console.log("projects.html, activity.html, contact.html generated");
