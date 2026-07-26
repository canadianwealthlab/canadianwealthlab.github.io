export const siteConfig = {
  name: "Canadian Wealth Lab",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://canadianwealthlab.github.io",
  description:
    "Data-driven calculators and guides that help Canadians make smarter financial decisions.",
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
