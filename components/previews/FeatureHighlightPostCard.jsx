/**
 * List preview for feature-highlight posts: short promo-style block with accent.
 * Links to the same /posts/[id] route as other types.
 */
export default function FeatureHighlightPostCard({
    title = 'Untitled',
    desc = '',
    href = '#',
}) {
    return (
        <a
            href={href}
            className="flex flex-col gap-2 w-full max-w-lg p-6 rounded-lg border border-orange-500/40 bg-gradient-to-br from-slate-900 to-slate-950 hover:border-orange-400/60 transition-colors"
        >
            <span className="text-xs uppercase tracking-wider text-orange-400/90">
                Highlight
            </span>
            <h3 className="text-xl font-semibold m-0">{title}</h3>
            {desc ? <p className="text-sm opacity-90 m-0">{desc}</p> : null}
            <span className="text-sm text-orange-300/80 mt-2 inline-flex items-center gap-1">
                Read more →
            </span>
        </a>
    );
}
