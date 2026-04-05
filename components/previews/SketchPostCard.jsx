/**
 * List preview for sketch-type posts: visual-first card (square hero).
 * Styling aligns with post-card borders and hover (digital garden look).
 */
export default function SketchPostCard({
    title = 'Untitled',
    desc = '',
    href = '#',
    src = '',
}) {
    return (
        <a
            href={href}
            className="group flex flex-col w-full max-w-sm overflow-hidden rounded-md border-2 border-slate-700 bg-gray-900 hover:border-slate-300 transition-colors"
        >
            <div
                className="aspect-square w-full bg-cover bg-center bg-slate-800"
                style={
                    src
                        ? { backgroundImage: `url(${src})` }
                        : undefined
                }
                aria-hidden={!src}
            />
            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg m-0 group-hover:underline">{title}</h3>
                {desc ? (
                    <p className="text-sm opacity-85 line-clamp-3 m-0">{desc}</p>
                ) : null}
            </div>
        </a>
    );
}
