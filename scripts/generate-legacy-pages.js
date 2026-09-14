const fs = require("fs");
const path = require("path");
const { page, ROOT } = require("./build-pages");

const PROJECTS = [];
const ACTIVITIES = [];
const CONTACT_METHODS = [];

function emptyState(icon, title, description, countLabel) {
  return `<div class="w-full bg-surface-container-lowest p-space-xl rounded-xl shadow-sm text-center">
    <div class="w-14 h-14 mx-auto rounded-full bg-surface-container flex items-center justify-center text-primary">
      <span class="material-symbols-outlined text-[28px]" aria-hidden="true">${icon}</span>
    </div>
    <p class="mt-space-md font-label-sm text-label-sm text-primary font-bold">${countLabel}</p>
    <h2 class="mt-space-xs font-headline-md text-headline-md text-on-surface">${title}</h2>
    <p class="mt-space-xs font-body-sm text-body-sm text-on-surface-variant">${description}</p>
  </div>`;
}

function buildProjectsPage() {
  const body = `<section class="w-full px-margin lg:px-margin-lg py-space-xl" id="projects">
    <div class="max-w-7xl mx-auto flex flex-col gap-space-lg">
      <div>
        <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">콘텐츠 / 영상</h1>
        <p class="font-body-md text-body-md text-on-surface-variant mt-1">공식적으로 확인된 콘텐츠만 등록합니다.</p>
      </div>
      ${PROJECTS.length === 0 ? emptyState("movie", "등록된 콘텐츠가 없습니다", "확인된 콘텐츠가 생기면 이곳에 추가됩니다.", "0개") : ""}
    </div>
  </section>`;

  return page("projects", "콘텐츠 / 영상 - 낮밤사이 (sunsetdn)", "낮밤사이의 확인된 콘텐츠를 표시합니다.", body);
}

function buildActivityPage() {
  const body = `<section class="w-full px-margin lg:px-margin-lg py-space-xl" id="activity">
    <div class="max-w-7xl mx-auto flex flex-col gap-space-lg">
      <div>
        <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">활동 기록</h1>
        <p class="font-body-md text-body-md text-on-surface-variant mt-1">공식적으로 확인된 기록만 등록합니다.</p>
      </div>
      ${ACTIVITIES.length === 0 ? emptyState("timeline", "등록된 활동 기록이 없습니다", "확인된 활동이 생기면 이곳에 추가됩니다.", "0건") : ""}
    </div>
  </section>`;

  return page("activity", "활동 기록 - 낮밤사이 (sunsetdn)", "낮밤사이의 확인된 활동 기록을 표시합니다.", body);
}

function buildContactPage() {
  const body = `<section class="w-full px-margin lg:px-margin-lg py-space-xl" id="contact">
    <div class="max-w-7xl mx-auto flex flex-col gap-space-lg">
      <div>
        <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">문의</h1>
        <p class="font-body-md text-body-md text-on-surface-variant mt-1">공식적으로 확인된 연락처만 등록합니다.</p>
      </div>
      ${CONTACT_METHODS.length === 0 ? emptyState("mail", "공개된 문의 채널이 없습니다", "공식 연락처가 확인되면 이곳에 추가됩니다.", "0개") : ""}
    </div>
  </section>`;

  return page("contact", "문의 - 낮밤사이 (sunsetdn)", "낮밤사이의 확인된 문의 채널을 표시합니다.", body);
}

fs.writeFileSync(path.join(ROOT, "projects.html"), buildProjectsPage(), "utf8");
fs.writeFileSync(path.join(ROOT, "activity.html"), buildActivityPage(), "utf8");
fs.writeFileSync(path.join(ROOT, "contact.html"), buildContactPage(), "utf8");
console.log("projects.html, activity.html, contact.html generated");
