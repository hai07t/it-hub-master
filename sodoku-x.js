const META_URL = "http://ip-api.com/json/";
const TARGET_URL = "";

const ALLOWED_ASNS = new Set([
  "AS7552",
  "AS45899",
  "AS18403",
  "AS24086",
  "AS45543",
  "AS7602",
  "AS45903",
  "AS24173",
  "AS131429",
  "AS38735",
  "AS140822",
  "AS63737",
  "AS24088",
  "AS7643",
  "AS140766",
  "AS135905",
  "AS38731",
  "AS135918",
  "AS38244",
  "AS24085",
  "AS38247"
]);

function normalizeAsn(value) {
  if (value == null) return null;
  const match = String(value).toUpperCase().match(/AS\s*(\d+)/);
  return match ? `AS${match[1]}` : null;
}

async function runGate() {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isVietnamTimeZone =
    userTimeZone === "Asia/Ho_Chi_Minh" ||
    userTimeZone === "Asia/Saigon";

  if (!isVietnamTimeZone) {
    window.location.href = "app://game";
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(META_URL, {
      method: "GET",
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: controller.signal
    });

    if (!response.ok) {
      window.location.href = "app://game";
      return;
    }

    const data = await response.json();
    const currentAsn = normalizeAsn(data.as ?? data.asn);

    if (currentAsn && ALLOWED_ASNS.has(currentAsn)) {
      window.location.replace(TARGET_URL);
      return;
    }

    window.location.href = "app://game";
  } catch (_) {
    window.location.href = "app://game";
  } finally {
    clearTimeout(timeout);
  }
}

runGate();
