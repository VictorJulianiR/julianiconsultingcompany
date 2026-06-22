// Locale resolution endpoint (Vercel Edge Function).
//
// Two jobs:
//   GET /api/locale
//     Detects the visitor's locale from the request's country (BR -> pt, else en),
//     unless the visitor has already chosen via the `jcc_locale` cookie.
//     Returns JSON { locale, country, source }.
//
//   GET /api/locale?set=pt   or   ?set=en
//     Sets the persistent `jcc_locale` cookie (1 year) and 302-redirects to `/`,
//     stripping the query. Powers the manual PT/EN toggle in the header.
//
// On Vercel, `request.geo.country` is populated by the edge network. Locally
// (vercel dev / static server) it may be undefined and we fall back to the
// Accept-Language header, then to "en".

export const config = {
  runtime: "edge",
};

const COOKIE_NAME = "jcc_locale";
const SUPPORTED = ["pt", "en"];
const ONE_YEAR = "Max-Age=31536000; Path=/; SameSite=Lax; Secure";

const isValid = (value) => SUPPORTED.includes(value);

const fromAcceptLanguage = (header) => {
  if (!header) return "en";
  // Accept-Language: pt-BR,pt;q=0.9,en;q=0.8  ->  ["pt-BR","pt","en;q=0.8"]
  const picked = header
    .split(",")
    .map((part) => part.trim().split(";")[0].toLowerCase())
    .find((tag) => tag.startsWith("pt"));
  return picked ? "pt" : "en";
};

const getCookie = (cookieHeader, name) => {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
};

export default function handler(request) {
  const url = new URL(request.url);
  const setParam = url.searchParams.get("set");

  // Manual override: persist + redirect to a clean URL.
  if (isValid(setParam)) {
    const redirectUrl = new URL("/", url.origin);
    const headers = new Headers({
      Location: redirectUrl.toString(),
      "Set-Cookie": `${COOKIE_NAME}=${setParam}; ${ONE_YEAR}`,
      "Cache-Control": "no-store",
    });
    return new Response(null, { status: 302, headers });
  }

  // Read the existing choice if present.
  const cookieLocale = getCookie(request.headers.get("cookie"), COOKIE_NAME);

  let locale;
  let country;
  let source;

  if (cookieLocale && isValid(cookieLocale)) {
    locale = cookieLocale;
    country = request.geo?.country || "—";
    source = "cookie";
  } else {
    // Country alone is a poor language proxy (a Brazilian abroad or on a VPN
    // still speaks Portuguese). Accept-Language is the more reliable signal:
    // the browser sends pt-BR for a PT user regardless of where they sit.
    country = request.geo?.country || "—";
    const fromHeader = fromAcceptLanguage(request.headers.get("accept-language"));
    if (fromHeader === "pt") {
      locale = "pt";
      source = "header";
    } else if (country === "BR") {
      // BR country but non-pt browser — assume a Brazilian setup and show PT.
      locale = "pt";
      source = "geo";
    } else {
      locale = "en";
      source = country !== "—" ? "geo" : "header";
    }
  }

  return new Response(
    JSON.stringify({ locale, country: country || "—", source }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
}
