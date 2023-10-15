export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  // Support a dev url for webhooks.
  if (process.env.DEV_URL) {
    return process.env.DEV_URL;
  }

  return "http://localhost:3000";
}
