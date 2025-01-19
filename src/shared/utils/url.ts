export function isValidUrl(url: string | null) {
  if (!url) return false;

  if (url.includes("https://static.licdn.com")) return false;

  const regex = /^(https?:\/\/)([\w.-]+)+(:\d+)?(\/[^\s]*)?$/;
  return regex.test(url);
}
