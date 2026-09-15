const YOUTUBE_CHANNEL_ID = "UCeXn3RzNjCDC-WgesgEWU0Q";
const YOUTUBE_SUBSCRIBER_API =
  `https://api.socialcounts.org/youtube-live-subscriber-count/${YOUTUBE_CHANNEL_ID}`;
const SUBSCRIBER_CACHE_KEY = "sunsetdn-youtube-subscriber-count";
const SUBSCRIBER_CACHE_TTL = 10 * 60 * 1000;

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

loadSubscriberCount();
