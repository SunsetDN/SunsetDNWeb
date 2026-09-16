const fs = require("fs");
const path = require("path");
const { page, ROOT } = require("./build-pages");

const DISCORD_URL = "https://discord.gg/SP8HY7WsqT";

const FIELDS = [
  { icon: "graphic_eq", title: "믹싱", desc: "보컬 및 음원 믹싱·마스터링 작업입니다." },
  { icon: "palette", title: "일러스트", desc: "캐릭터, 썸네일 등 일러스트 작업입니다." },
  { icon: "code", title: "개발 · 기획", desc: "웹/도구 개발과 콘텐츠 기획입니다." },
  { icon: "movie_edit", title: "편집", desc: "영상 편집과 컷 구성 작업입니다." },
];

function fieldCard(field) {
  return `<div class="reveal-on-scroll p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-md">
  <div class="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-primary shadow-sm shrink-0">
    <span class="material-symbols-outlined text-[26px]">${field.icon}</span>
  </div>
  <h3 class="font-headline-md text-headline-md text-on-surface">${field.title}</h3>
  <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">${field.desc}</p>
</div>`;
}

function buildCommissionPage() {
  const fieldCards = FIELDS.map(fieldCard).join("\n");
  const body = `<section class="w-full px-margin lg:px-margin-lg py-space-xl" id="commission">
    <div class="max-w-7xl mx-auto flex flex-col gap-space-lg">
      <div>
        <div class="inline-flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider">
          <span>COMMISSION</span>
        </div>
        <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">커미션 · 외주 신청</h1>
        <p class="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">낮밤사이 크루가 참여하는 외주 작업은 디스코드로만 접수합니다.</p>
      </div>
      <div class="commission-cta w-full p-space-xl rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-lg text-center sm:text-left">
        <div class="flex flex-col sm:flex-row items-center gap-space-md">
          <div class="w-14 h-14 rounded-full bg-surface flex items-center justify-center text-primary shrink-0">
            <span class="material-symbols-outlined text-[28px]" aria-hidden="true">forum</span>
          </div>
          <div>
            <h2 class="font-headline-md text-headline-md text-on-surface">디스코드로 문의해 주세요</h2>
            <p class="mt-space-xs font-body-sm text-body-sm text-on-surface-variant">서버에 참여하신 뒤 안내에 따라 문의 내용을 남겨 주세요.</p>
          </div>
        </div>
        <a class="brand-button brand-button--primary shrink-0" href="${DISCORD_URL}" rel="noopener noreferrer" target="_blank">
          <span class="material-symbols-outlined" aria-hidden="true">forum</span>
          <span>디스코드 참여하기</span>
        </a>
      </div>
      <div>
        <h2 class="font-headline-md text-headline-md text-on-surface mb-space-md">가능한 작업 분야</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          ${fieldCards}
        </div>
      </div>
    </div>
  </section>`;

  return page(
    "commission",
    "커미션 · 외주 신청 - 낮밤사이 (sunsetdn)",
    "낮밤사이 크루에게 커미션/외주 작업을 디스코드로 문의할 수 있습니다.",
    body,
    "commission.html"
  );
}

fs.writeFileSync(path.join(ROOT, "commission.html"), buildCommissionPage(), "utf8");
console.log("commission.html generated");
