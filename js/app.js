const YOUTUBE_CHANNEL_ID = "UCeXn3RzNjCDC-WgesgEWU0Q";
const YOUTUBE_SUBSCRIBER_API =
  `https://api.socialcounts.org/youtube-live-subscriber-count/${YOUTUBE_CHANNEL_ID}`;
const SUBSCRIBER_CACHE_KEY = "sunsetdn-youtube-subscriber-count";
const SUBSCRIBER_CACHE_TTL = 10 * 60 * 1000;

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Wraps a DOM update in a view transition when the browser supports one.
function withViewTransition(update) {
  if (prefersReducedMotion() || !document.startViewTransition) {
    update();
    return { finished: Promise.resolve() };
  }
  return document.startViewTransition(update);
}

/* -------------------------------------------------------------- subscribers */

function readSubscriberCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(SUBSCRIBER_CACHE_KEY));
    const count = Number(cached?.count);
    const updatedAt = Number(cached?.updatedAt);

    if (!Number.isInteger(count) || count < 0 || !Number.isFinite(updatedAt)) {
      return null;
    }

    return { count, updatedAt };
  } catch (error) {
    return null;
  }
}

function writeSubscriberCache(count) {
  try {
    localStorage.setItem(
      SUBSCRIBER_CACHE_KEY,
      JSON.stringify({ count, updatedAt: Date.now() })
    );
  } catch (error) {
    // The current value can still be displayed when storage is unavailable.
  }
}

function renderSubscriberCount(element, count) {
  element.textContent = `${count.toLocaleString("ko-KR")}명`;
}

async function loadSubscriberCount() {
  const element = document.querySelector("[data-youtube-subscriber-count]");
  if (!element) return;

  const cached = readSubscriberCache();
  if (cached) {
    renderSubscriberCount(element, cached.count);

    if (Date.now() - cached.updatedAt <= SUBSCRIBER_CACHE_TTL) {
      return;
    }
  }

  try {
    const response = await fetch(YOUTUBE_SUBSCRIBER_API, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Subscriber request failed with ${response.status}`);
    }

    const data = await response.json();
    const count = Number(
      data?.counters?.api?.subscriberCount ??
        data?.counters?.estimation?.subscriberCount
    );
    if (!Number.isInteger(count) || count < 0) {
      throw new Error("Subscriber response did not contain a valid count");
    }

    renderSubscriberCount(element, count);
    writeSubscriberCache(count);
  } catch (error) {
    console.warn("YouTube subscriber count could not be refreshed.", error);
  }
}

/* -------------------------------------------------------------------- toast */

function showToast(message, icon = "check_circle") {
  const region = document.querySelector("[data-toast-region]");
  if (!region) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true"></span><span></span>`;
  toast.firstChild.textContent = icon;
  toast.lastChild.textContent = message;
  region.append(toast);

  window.setTimeout(() => {
    toast.classList.add("is-leaving");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
    window.setTimeout(() => toast.remove(), 600);
  }, 2400);
}

/* ----------------------------------------------------------- command palette */

const HANGUL_INITIALS = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";

// "힘내" -> "ㅎㄴ", so typing initials alone finds a Korean name.
function toInitials(value) {
  let out = "";
  for (const char of value) {
    const code = char.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      out += HANGUL_INITIALS[Math.floor((code - 0xac00) / 588)];
    } else {
      out += char;
    }
  }
  return out;
}

function setupCommandPalette() {
  const dialog = document.querySelector("[data-search-dialog]");
  const input = document.querySelector("[data-search-input]");
  const list = document.querySelector("[data-search-results]");
  const empty = document.querySelector("[data-search-empty]");
  const indexScript = document.querySelector("[data-search-index]");
  if (!dialog || !input || !list || !indexScript) return;

  let entries = [];
  try {
    entries = JSON.parse(indexScript.textContent).map((entry) => ({
      ...entry,
      haystack: `${entry.name} ${entry.hint || ""}`.toLowerCase(),
      initials: toInitials(`${entry.name} ${entry.hint || ""}`).toLowerCase(),
    }));
  } catch (error) {
    return;
  }

  let matches = [];
  let activeIndex = 0;

  const isMac = /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent);
  const hotkeyLabel = document.querySelector("[data-search-hotkey]");
  if (hotkeyLabel) hotkeyLabel.textContent = isMac ? "⌘ K" : "Ctrl K";

  function score(entry, query) {
    if (!query) return 0;
    const name = entry.name.toLowerCase();
    if (name.startsWith(query)) return 3;
    if (name.includes(query)) return 2;
    if (entry.initials.startsWith(query)) return 2;
    if (entry.haystack.includes(query) || entry.initials.includes(query)) return 1;
    return -1;
  }

  function render(query) {
    const trimmed = query.trim().toLowerCase();
    matches = trimmed
      ? entries
          .map((entry) => ({ entry, rank: score(entry, trimmed) }))
          .filter((item) => item.rank >= 0)
          .sort((a, b) => b.rank - a.rank)
          .slice(0, 8)
          .map((item) => item.entry)
      : entries.filter((entry) => entry.type === "페이지" || entry.type === "팀원").slice(0, 8);

    activeIndex = 0;
    list.innerHTML = "";

    for (const [i, entry] of matches.entries()) {
      const item = document.createElement("li");
      item.className = "cmdk__item";
      item.setAttribute("role", "option");
      item.setAttribute("aria-selected", String(i === 0));
      item.dataset.url = entry.url;
      if (entry.color) item.style.setProperty("--entry-color", entry.color);
      item.innerHTML =
        `<span class="material-symbols-outlined cmdk__icon" aria-hidden="true"></span>` +
        `<span class="cmdk__text"><strong></strong><small></small></span>` +
        `<span class="cmdk__type"></span>`;
      item.querySelector(".cmdk__icon").textContent = entry.icon;
      item.querySelector("strong").textContent = entry.name;
      item.querySelector("small").textContent = entry.hint || "";
      item.querySelector(".cmdk__type").textContent = entry.type;
      item.addEventListener("click", () => go(i));
      item.addEventListener("pointermove", () => setActive(i));
      list.append(item);
    }

    if (empty) empty.hidden = matches.length > 0;
  }

  function setActive(next) {
    if (!matches.length) return;
    activeIndex = (next + matches.length) % matches.length;
    const items = [...list.children];
    items.forEach((item, i) => item.setAttribute("aria-selected", String(i === activeIndex)));
    items[activeIndex]?.scrollIntoView({ block: "nearest" });
  }

  function go(index) {
    const entry = matches[index];
    if (!entry) return;
    dialog.close();
    window.location.href = entry.url;
  }

  function open() {
    if (dialog.open) return;
    render("");
    dialog.showModal();
    input.value = "";
    input.focus();
  }

  document.querySelectorAll("[data-search-open]").forEach((button) => {
    button.addEventListener("click", open);
  });

  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      dialog.open ? dialog.close() : open();
      return;
    }
    if (event.key === "/" && !dialog.open && !/^(input|textarea|select)$/i.test(event.target.tagName)) {
      event.preventDefault();
      open();
    }
  });

  input.addEventListener("input", () => render(input.value));

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive(activeIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive(activeIndex - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(activeIndex);
    } else if (event.key === "Escape") {
      // Some input types swallow the first Escape, so close explicitly.
      event.preventDefault();
      dialog.close();
    }
  });

  // Clicking the backdrop (outside the panel) closes the dialog.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

/* ------------------------------------------------------------- role filtering */

function setupRoleFilter() {
  const container = document.querySelector("[data-role-filters]");
  const grid = document.querySelector("[data-member-grid]");
  if (!container || !grid) return;

  const chips = [...container.querySelectorAll("[data-role-filter]")];
  const cards = [...grid.querySelectorAll("[data-roles]")];
  const emptyNote = document.querySelector("[data-filter-empty]");

  for (const card of cards) {
    const image = card.querySelector("[data-zoomable]");
    if (image) image.dataset.vtName = image.style.viewTransitionName || "";
  }

  // While cards rearrange, the cards themselves are the transition targets;
  // the portrait names are parked so a single element owns each name.
  function useCardTransitionNames(enabled) {
    for (const card of cards) {
      card.style.viewTransitionName = enabled && !card.hidden ? `card-${card.id}` : "";
      const image = card.querySelector("[data-zoomable]");
      if (image) image.style.viewTransitionName = enabled ? "" : image.dataset.vtName;
    }
  }

  function apply(role, { animate = true } = {}) {
    // Once cards start being shown and hidden, their scroll-reveal timelines
    // can no longer be trusted (a card unhidden next to the fold keeps the
    // stale "not yet entered" progress and stays invisible), so the reveal
    // animation is retired for the rest of the visit.
    grid.classList.add("is-filtered");

    const update = () => {
      for (const card of cards) {
        const roles = (card.dataset.roles || "").split("|");
        card.hidden = Boolean(role) && !roles.includes(role);
      }
      for (const chip of chips) {
        const active = chip.dataset.roleFilter === role;
        chip.classList.toggle("is-active", active);
        chip.setAttribute("aria-pressed", String(active));
      }
      if (emptyNote) emptyNote.hidden = cards.some((card) => !card.hidden);
      useCardTransitionNames(true);
    };

    if (!animate) {
      update();
      useCardTransitionNames(false);
      return;
    }

    useCardTransitionNames(true);
    const transition = withViewTransition(update);
    transition.finished.finally(() => useCardTransitionNames(false));
  }

  for (const chip of chips) {
    chip.addEventListener("click", () => {
      const role = chip.dataset.roleFilter;
      apply(role);
      const url = new URL(window.location.href);
      if (role) url.searchParams.set("role", role);
      else url.searchParams.delete("role");
      history.replaceState(null, "", url);
    });
  }

  const initialRole = new URL(window.location.href).searchParams.get("role");
  if (initialRole && chips.some((chip) => chip.dataset.roleFilter === initialRole)) {
    apply(initialRole, { animate: false });
  }
}

/* ---------------------------------------------------------------- lightbox */

function setupLightbox() {
  const dialog = document.querySelector("[data-lightbox]");
  const image = document.querySelector("[data-lightbox-image]");
  const caption = document.querySelector("[data-lightbox-caption]");
  const closeButton = document.querySelector("[data-lightbox-close]");
  if (!dialog || !image) return;

  let source = null;

  function open(target) {
    source = target;
    const name = target.style.viewTransitionName;
    image.src = target.currentSrc || target.src;
    image.alt = target.alt;
    if (caption) caption.textContent = target.dataset.zoomCaption || "";

    withViewTransition(() => {
      target.style.viewTransitionName = "";
      image.style.viewTransitionName = name;
      dialog.showModal();
    });
  }

  function close() {
    const name = image.style.viewTransitionName;
    withViewTransition(() => {
      image.style.viewTransitionName = "";
      if (source) source.style.viewTransitionName = name;
      dialog.close();
    });
  }

  document.querySelectorAll("[data-zoomable]").forEach((target) => {
    target.tabIndex = 0;
    target.setAttribute("role", "button");
    target.setAttribute("aria-label", `${target.dataset.zoomCaption || ""} 이미지 크게 보기`);
    target.addEventListener("click", () => open(target));
    target.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(target);
      }
    });
  });

  closeButton?.addEventListener("click", close);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
  // Esc fires `cancel`; close it through the same path so names are restored.
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
}

/* ------------------------------------------------------------ copy to board */

function setupCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        showToast(`${value} 복사했습니다`, "content_copy");
      } catch (error) {
        showToast("복사할 수 없습니다", "error");
      }
    });
  });
}

/* ----------------------------------------------------------- hero spotlight */

function setupHeroSpotlight() {
  const hero = document.querySelector("#hero");
  if (!hero || prefersReducedMotion()) return;
  if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;

  let frame = 0;
  hero.addEventListener("pointermove", (event) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      hero.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    });
  });

  hero.addEventListener("pointerleave", () => hero.classList.remove("is-pointed"));
  hero.addEventListener("pointerenter", () => hero.classList.add("is-pointed"));
}

/* ------------------------------------------------------------ offline cache */

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol !== "https:" && location.hostname !== "localhost") return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {
      // Offline support is optional; a failed registration changes nothing.
    });
  });
}

/* --------------------------------------------------------------------- init */

loadSubscriberCount();
setupCommandPalette();
setupRoleFilter();
setupLightbox();
setupCopyButtons();
setupHeroSpotlight();
registerServiceWorker();
