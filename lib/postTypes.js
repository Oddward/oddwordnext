/**
 * Canonical post types for the digital garden (YAML frontmatter: postType).
 * Use kebab-case in markdown, e.g. postType: feature-highlight
 */
export const POST_TYPES = {
  ARTICLE: 'article',
  SKETCH: 'sketch',
  FEATURE_HIGHLIGHT: 'feature-highlight',
};

const ALLOWED = new Set(Object.values(POST_TYPES));

/** Labels for the post detail meta row (replaces the old hardcoded “Article post”). */
export const POST_TYPE_LABELS = {
  [POST_TYPES.ARTICLE]: 'Article post',
  [POST_TYPES.SKETCH]: 'Sketch',
  [POST_TYPES.FEATURE_HIGHLIGHT]: 'Feature highlight',
};

/**
 * Maps frontmatter to a canonical postType. Unknown or missing values default to article
 * so existing posts without postType stay in the Articles section.
 */
export function normalizePostType(raw) {
  if (raw == null || raw === '') return POST_TYPES.ARTICLE;
  const s = String(raw)
    .trim()
    .toLowerCase()
    .replace(/_/g, '-');
  const normalized =
    s === 'feature highlight' ? POST_TYPES.FEATURE_HIGHLIGHT : s;
  if (ALLOWED.has(normalized)) return normalized;
  return POST_TYPES.ARTICLE;
}
