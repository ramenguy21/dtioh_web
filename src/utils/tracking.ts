export interface TrackingPayload {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function getCampaignParams(search: URLSearchParams) {
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  return Object.fromEntries(
    keys
      .map((key) => [key, search.get(key) ?? undefined] as const)
      .filter(([, value]) => value !== undefined),
  );
}

export function trackEvent(name: string, payload: TrackingPayload = {}) {
  if (typeof window === 'undefined') return;

  window.gtag?.('event', name, payload);
  window.dataLayer?.push({ event: name, ...payload });
}
