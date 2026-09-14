const fs = require("fs");
const path = require("path");
const { page, ROOT } = require("./build-pages");
const { MEMBERS } = require("./members-data");

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const TECH_MEMBERS = [
  {
    id: "juju",
    name: "쥬쥬",
    roles: ["믹싱"],
    color: "#667AFF",
    colorLabel: "파란색",
    message: "잘 부탁드립니다!!",
    image: "img/tech/juju.png",
    links: [
      { label: "YouTube", icon: "smart_display", url: "https://youtube.com/@hisojj-515?si=taljW0CA7sQBeEJH" },
      { label: "X", icon: "alternate_email", url: "https://x.com/_hisojj__" },
    ],
  },
  {
    id: "banz",
    name: "반즈",
    fullName: "BANZ",
    roles: ["일러레"],
    color: "#BDCCD6",
    colorLabel: "푸른색",
    message: "열심히 하겠습니다! 잘 부탁 드려용~",
    image: "img/tech/banz.png",
    links: [
      { label: "YouTube", icon: "smart_display", url: "https://www.youtube.com/@banz_601" },
      { label: "Littly", icon: "link", url: "https://litt.ly/banz" },
    ],
  },
  {
    id: "parin",
    name: "파린",
    roles: ["개발(프로그래밍 등)", "기획"],
    color: "#E0F7FA",
    colorLabel: "청색 계열",
    message: "잘부탁드립니다",
    image: "img/tech/parin.png",
    links: [
      { label: "CHZZK", icon: "live_tv", url: "https://chzzk.parin.asia/" },
      { label: "YouTube", icon: "smart_display", url: "https://www.youtube.com/@koroutine" },
      { label: "X", icon: "alternate_email", url: "https://x.com/palin1838982" },
    ],
  },
  {
    id: "n",
    name: "엔",
    fullName: "N",
    roles: ["일러스트"],
    color: "#A8968D",
    colorLabel: "연갈색",
    message: "안녕하세요",
    image: "img/tech/n.png",
    links: [],
  },
  {
    id: "cloud",
    name: "cloud",
    roles: ["편집"],
    color: "#000DFF",
    colorLabel: "메인 컬러",
    message: "잘 부탁드립니다",
    image: "img/tech/cloud.png",
    links: [{ label: "YouTube", icon: "smart_display", url: "https://www.youtube.com/@Cloud_11115" }],
  },
  {
    id: "oliva",
    name: "올리바",
    roles: ["편집자"],
    color: "#A01313",
    colorLabel: "메인 컬러",
    message: "열심히 하겠습니다",
    image: "img/tech/oliva.png",
    links: [{ label: "YouTube", icon: "smart_display", url: "https://www.youtube.com/@올리바O/videos" }],
  },
];

function memberCard(member, index) {
  const accent = member.color || "#299FAB";
  const portrait = member.image
    ? `<img class="technical-card__image" src="${esc(member.image)}" alt="${esc(member.name)} 캐릭터 이미지" loading="lazy"/>`
    : `<div class="member-card__placeholder"><span class="material-symbols-outlined" aria-hidden="true">person</span><span>프로필 이미지 준비 중</span></div>`;

  const roles = member.roles.map((role) => `<span class="technical-card__role">${esc(role)}</span>`).join("");
  const color = member.color
    ? `<div class="technical-card__color" title="${esc(member.color)}"><span style="background:${esc(member.color)}"></span><strong>${esc(member.colorLabel || "메인 컬러")}</strong><code>${esc(member.color)}</code></div>`
    : "";
  const message = member.oneLiner
    ? `<blockquote class="technical-card__message"><span class="material-symbols-outlined" aria-hidden="true">format_quote</span><p>${esc(member.oneLiner)}</p></blockquote>`
    : "";
  const links = member.links.length
    ? member.links
        .map(
          (link) =>
            `<a class="technical-card__link" href="${esc(link.url)}" rel="noopener noreferrer" target="_blank"><span class="material-symbols-outlined" aria-hidden="true">${esc(link.icon)}</span><span>${esc(link.label)}</span></a>`
        )
        .join("")
    : `<span class="technical-card__no-link">공개된 활동 링크 없음</span>`;

  return `<article class="technical-card member-profile-card" style="--member-color:${esc(accent)}">
  <div class="technical-card__visual">
    <span class="technical-card__number">MEMBER ${String(index + 1).padStart(2, "0")}</span>
    ${portrait}
  </div>
  <div class="technical-card__content">
    <div class="technical-card__heading">
      <div>
        <p class="technical-card__eyebrow">CREW MEMBER</p>
        <h3>${esc(member.name)}${member.aka ? `<span>${esc(member.aka)}</span>` : ""}</h3>
      </div>
      ${color}
    </div>
    <div class="technical-card__roles">${roles}</div>
    ${member.caption ? `<p class="member-card__caption">${esc(member.caption)}</p>` : ""}
    ${message}
    ${member.note ? `<p class="member-card__note">${esc(member.note)}</p>` : ""}
    <div class="technical-card__links">${links}</div>
  </div>
</article>`;
}

function technicalMemberCard(member, index) {
  const roles = member.roles
    .map((role) => `<span class="technical-card__role">${esc(role)}</span>`)
    .join("");

  const links = member.links.length
    ? member.links
        .map(
          (link) =>
            `<a class="technical-card__link" href="${esc(link.url)}" rel="noopener noreferrer" target="_blank"><span class="material-symbols-outlined" aria-hidden="true">${esc(link.icon)}</span><span>${esc(link.label)}</span></a>`
        )
        .join("")
    : `<span class="technical-card__no-link">공개된 활동 링크 없음</span>`;

  return `<article class="technical-card" style="--member-color:${esc(member.color)}">
  <div class="technical-card__visual">
    <span class="technical-card__number">TECH ${String(index + 1).padStart(2, "0")}</span>
    <img class="technical-card__image" src="${esc(member.image)}" alt="${esc(member.name)} 캐릭터 이미지" loading="lazy"/>
  </div>
  <div class="technical-card__content">
    <div class="technical-card__heading">
      <div>
        <p class="technical-card__eyebrow">TECHNICAL MEMBER</p>
        <h3>${esc(member.name)}${member.fullName ? `<span>${esc(member.fullName)}</span>` : ""}</h3>
      </div>
      <div class="technical-card__color" title="${esc(member.color)}">
        <span style="background:${esc(member.color)}"></span>
        <strong>${esc(member.colorLabel)}</strong>
        <code>${esc(member.color)}</code>
      </div>
    </div>
    <div class="technical-card__roles">${roles}</div>
    <blockquote class="technical-card__message"><span class="material-symbols-outlined" aria-hidden="true">format_quote</span><p>${esc(member.message)}</p></blockquote>
    <div class="technical-card__links">${links}</div>
  </div>
</article>`;
}

function buildMembersPage() {
  const cards = MEMBERS.map(memberCard).join("\n");
  const technicalCards = TECH_MEMBERS.map(technicalMemberCard).join("\n");
  const body = `<section class="w-full px-margin lg:px-margin-lg py-space-xl" id="members">
  <div class="max-w-7xl mx-auto flex flex-col gap-space-lg">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm">
      <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">팀원 소개</h1>
      <div class="flex flex-wrap items-center gap-space-xs">
        <div class="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm bg-surface-container px-space-sm py-1 rounded-full w-fit">
          <span class="material-symbols-outlined text-[14px] text-primary">groups</span>
          <span>${MEMBERS.length}명의 크루 멤버</span>
        </div>
        <a class="technical-jump" href="#technical-members"><span class="material-symbols-outlined" aria-hidden="true">engineering</span><span>기술직 ${TECH_MEMBERS.length}명</span><span class="material-symbols-outlined" aria-hidden="true">south</span></a>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
      ${cards}
    </div>
  </div>
</section>
<section class="technical-members-section" id="technical-members">
  <div class="technical-members-inner">
    <div class="technical-members-heading">
      <div>
        <p><span class="material-symbols-outlined" aria-hidden="true">engineering</span> BEHIND THE SCENES</p>
        <h2>기술직 소개</h2>
      </div>
      <p>콘텐츠의 완성도를 함께 만드는 믹싱·일러스트·개발·기획·편집 멤버를 소개합니다.</p>
    </div>
    <div class="technical-members-grid">${technicalCards}</div>
  </div>
</section>`;
  return page("members", "팀원 소개 - 낮밤사이 (sunsetdn)", "유튜브 크리에이티브 팀 낮밤사이의 팀원 소개 페이지입니다.", body);
}

function roleGroup(title, icon, iconColorClass, description, members) {
  const chips = members
    .map((m) => `<span class="px-2 py-0.5 rounded bg-surface font-label-sm text-label-sm text-on-secondary-container">${esc(m)}</span>`)
    .join("");
  return `<div class="p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-md hover:bg-surface-container transition-colors">
  <div class="flex items-center gap-space-md">
    <div class="w-12 h-12 rounded-lg bg-surface flex items-center justify-center ${iconColorClass} shadow-sm shrink-0">
      <span class="material-symbols-outlined text-[26px]">${icon}</span>
    </div>
    <h3 class="font-headline-md text-headline-md text-on-surface">${title}</h3>
  </div>
  <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">${description}</p>
  <div class="flex flex-wrap gap-space-xs pt-space-xs">${chips}</div>
</div>`;
}

function buildTechPage() {
  const groups = [
    roleGroup(
      "운영진 (사장 / 총관리)",
      "workspace_premium",
      "text-primary",
      "채널 전체 운영과 관리를 맡은 직군입니다.",
      ["힘내"]
    ),
    roleGroup(
      "매니저",
      "supervisor_account",
      "text-primary",
      "멤버 관리와 팀 운영 전반을 조율합니다.",
      ["베리", "소유", "자연현상"]
    ),
    roleGroup(
      "편집",
      "movie_edit",
      "text-primary-container",
      "영상 편집과 컷 구성을 담당합니다.",
      ["베리 (편집장)", "이람"]
    ),
    roleGroup(
      "기획 / 홍보",
      "lightbulb",
      "text-tertiary",
      "콘텐츠 기획과 채널 홍보를 맡은 직군입니다.",
      ["자연현상 (기획장)"]
    ),
    roleGroup(
      "콘텐츠 제작",
      "sports_esports",
      "text-primary",
      "놀이·게임 콘텐츠와 제작 보조 업무를 담당합니다.",
      ["피리", "이노"]
    ),
    roleGroup(
      "일반 멤버",
      "group",
      "text-on-surface",
      "각자의 채널에서 활동하며 팀을 구성하는 멤버들입니다.",
      ["곰재", "모카나리아", "샛노란", "서아진", "인영"]
    ),
  ].join("\n");

  const body = `<section class="w-full px-margin lg:px-margin-lg py-space-xl" id="tech">
  <div class="max-w-7xl mx-auto flex flex-col gap-space-lg">
    <div class="flex flex-col gap-space-xs">
      <div class="inline-flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider">
        <span class="">역할과 직군</span>
      </div>
      <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
        직군 소개 <span class="text-on-surface-variant text-label-lg font-normal block sm:inline sm:ml-space-xs">(팀 내 역할 구분)</span>
      </h1>
      <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl">낮밤사이는 운영, 매니징먼트, 편집, 기획/홍보, 콘텐츠 제작까지 역할을 나누어 운영되는 팀입니다. 아래는 현재 확인된 직군별 구성입니다.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
      ${groups}
    </div>
  </div>
</section>`;
  return page("tech", "직군 소개 - 낮밤사이 (sunsetdn)", "낮밤사이 팀의 역할과 직군 구성을 소개합니다.", body);
}

fs.writeFileSync(path.join(ROOT, "members.html"), buildMembersPage(), "utf8");
fs.writeFileSync(path.join(ROOT, "tech.html"), buildTechPage(), "utf8");
console.log("members.html, tech.html generated");
