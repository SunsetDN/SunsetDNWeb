const fs = require("fs");
const path = require("path");
const { page, ROOT } = require("./build-pages");
const { MEMBERS } = require("./members-data");
const { TECH_MEMBERS } = require("./tech-members-data");

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}


function memberCard(member, index) {
  const accent = member.color || "#299FAB";
  const portrait = member.image
    ? `<img class="technical-card__image" src="${esc(member.image)}" alt="${esc(member.name)} 캐릭터 이미지" loading="lazy" data-zoomable data-zoom-caption="${esc(member.name)}" style="view-transition-name:portrait-${esc(member.id)}"/>`
    : `<div class="member-card__placeholder"><span class="material-symbols-outlined" aria-hidden="true">person</span><span>프로필 이미지 준비 중</span></div>`;

  const roles = member.roles.map((role) => `<span class="technical-card__role">${esc(role)}</span>`).join("");
  const color = member.color
    ? `<button class="technical-card__color" data-copy="${esc(member.color)}" type="button" title="${esc(member.color)} 복사"><span style="background:${esc(member.color)}"></span><strong>${esc(member.colorLabel || "메인 컬러")}</strong><code>${esc(member.color)}</code></button>`
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

  return `<article class="technical-card member-profile-card reveal-on-scroll" id="member-${esc(member.id)}" data-roles="${esc(member.roles.join("|"))}" data-name="${esc(member.name)}" style="--member-color:${esc(accent)}">
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

  return `<article class="technical-card reveal-on-scroll" id="tech-${esc(member.id)}" data-name="${esc(member.name)}" style="--member-color:${esc(member.color)}">
  <div class="technical-card__visual">
    <span class="technical-card__number">TECH ${String(index + 1).padStart(2, "0")}</span>
    <img class="technical-card__image" src="${esc(member.image)}" alt="${esc(member.name)} 캐릭터 이미지" loading="lazy" data-zoomable data-zoom-caption="${esc(member.name)}" style="view-transition-name:portrait-tech-${esc(member.id)}"/>
  </div>
  <div class="technical-card__content">
    <div class="technical-card__heading">
      <div>
        <p class="technical-card__eyebrow">TECHNICAL MEMBER</p>
        <h3>${esc(member.name)}${member.fullName ? `<span>${esc(member.fullName)}</span>` : ""}</h3>
      </div>
      <button class="technical-card__color" data-copy="${esc(member.color)}" type="button" title="${esc(member.color)} 복사">
        <span style="background:${esc(member.color)}"></span>
        <strong>${esc(member.colorLabel)}</strong>
        <code>${esc(member.color)}</code>
      </button>
    </div>
    <div class="technical-card__roles">${roles}</div>
    <blockquote class="technical-card__message"><span class="material-symbols-outlined" aria-hidden="true">format_quote</span><p>${esc(member.message)}</p></blockquote>
    <div class="technical-card__links">${links}</div>
  </div>
</article>`;
}

// Role chips above the member grid. Filtering happens client-side inside a
// view transition, so the remaining cards animate into their new positions.
function roleFilter() {
  const counts = new Map();
  for (const member of MEMBERS) {
    for (const role of member.roles) counts.set(role, (counts.get(role) || 0) + 1);
  }

  const chips = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(
      ([role, count]) =>
        `<button class="member-filter__chip" data-role-filter="${esc(role)}" type="button" aria-pressed="false">${esc(role)}<span>${count}</span></button>`
    )
    .join("");

  return `<div class="member-filter" data-role-filters>
    <span class="member-filter__label"><span class="material-symbols-outlined" aria-hidden="true">filter_list</span>직군 필터</span>
    <button class="member-filter__chip is-active" data-role-filter="" type="button" aria-pressed="true">전체<span>${MEMBERS.length}</span></button>
    ${chips}
  </div>`;
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
    ${roleFilter()}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-gutter" data-member-grid>
      ${cards}
    </div>
    <p class="member-filter__empty" data-filter-empty hidden>선택한 직군에 해당하는 팀원이 없습니다.</p>
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
  return page("members", "팀원 소개 - 낮밤사이 (sunsetdn)", "낮밤사이의 확인된 팀원 정보를 소개합니다.", body, "members.html");
}

function roleGroup(title, icon, iconColorClass, description, members) {
  const chips = members
    .map((m) => `<span class="px-2 py-0.5 rounded bg-surface font-label-sm text-label-sm text-on-secondary-container">${esc(m)}</span>`)
    .join("");
  return `<div class="reveal-on-scroll p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-md hover:bg-surface-container transition-colors">
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
  const namesWithAnyRole = (...roles) =>
    MEMBERS.filter((member) => member.roles.some((role) => roles.includes(role))).map((member) => member.name);

  const groups = [
    roleGroup(
      "운영진 (사장 / 총관리)",
      "workspace_premium",
      "text-primary",
      "채널 전체 운영과 관리를 맡은 직군입니다.",
      namesWithAnyRole("사장", "총관리자")
    ),
    roleGroup(
      "매니저",
      "supervisor_account",
      "text-primary",
      "멤버 관리와 팀 운영 전반을 조율합니다.",
      namesWithAnyRole("매니저")
    ),
    roleGroup(
      "편집",
      "movie_edit",
      "text-primary-container",
      "영상 편집과 컷 구성을 담당합니다.",
      namesWithAnyRole("편집장", "편집")
    ),
    roleGroup(
      "기획",
      "lightbulb",
      "text-tertiary",
      "콘텐츠 기획을 맡은 직군입니다.",
      namesWithAnyRole("기획장", "기획")
    ),
    roleGroup(
      "콘텐츠 보조",
      "sports_esports",
      "text-primary",
      "콘텐츠 보조 역할을 맡은 멤버입니다.",
      namesWithAnyRole("컨텐츠 보조")
    ),
    roleGroup(
      "일반 멤버",
      "group",
      "text-on-surface",
      "별도 직군이 등록되지 않은 멤버입니다.",
      MEMBERS.filter((member) => member.roles.length === 1 && member.roles[0] === "멤버").map((member) => member.name)
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
      <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl">팀원이 직접 등록한 역할을 기준으로 정리한 현재 직군 구성입니다.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
      ${groups}
    </div>
  </div>
</section>`;
  return page("tech", "직군 소개 - 낮밤사이 (sunsetdn)", "낮밤사이 팀에서 확인된 역할과 직군을 소개합니다.", body, "tech.html");
}

fs.writeFileSync(path.join(ROOT, "members.html"), buildMembersPage(), "utf8");
fs.writeFileSync(path.join(ROOT, "tech.html"), buildTechPage(), "utf8");
console.log("members.html, tech.html generated");
