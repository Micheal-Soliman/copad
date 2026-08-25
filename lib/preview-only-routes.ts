export const previewOnlyRoutes = [
  "manufacturing-quality",
  "insights",
  "partner-with-us",
  "careers",
] as const;

export function isPreviewOnlyRoute(route: string) {
  return previewOnlyRoutes.includes(route as (typeof previewOnlyRoutes)[number]);
}
