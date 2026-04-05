'use client'

import { Icon } from '@iconify-icon/react'

const COLORS = [
    { name: 'yellow', label: 'Yellow', cls: 'highlight-yellow', dot: 'oklch(0.92 0.18 95)' },
    { name: 'green',  label: 'Green',  cls: 'highlight-green',  dot: 'oklch(0.88 0.16 145)' },
    { name: 'blue',   label: 'Blue',   cls: 'highlight-blue',   dot: 'oklch(0.82 0.14 255)' },
    { name: 'pink',   label: 'Pink',   cls: 'highlight-pink',   dot: 'oklch(0.82 0.18 340)' },
]

/**
 * Floating toolbar that appears at a text selection.
 *
 * Props:
 *   position  – { top, left } in px (viewport-relative)
 *   onHighlight(color) – user chose a highlight color
 *   onAddToNotes()     – user wants to save selection as note
 *   onCopy()           – user wants to copy selection text
 *   onDismiss()        – user clicked away / hit Escape
 */
export default function HighlightToolbar({ position, onHighlight, onAddToNotes, onCopy, onDismiss }) {
    if (!position) return null

    return (
        <div
            id="highlight-toolbar"
            role="toolbar"
            aria-label="Text actions"
            className="highlight-toolbar"
            style={{ top: position.top, left: position.left }}
            // Prevent pointer default so the browser does not collapse the selection before onClick (esp. iOS)
            onMouseDown={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
        >
            {/* Color swatches */}
            <div className="highlight-toolbar__colors" role="group" aria-label="Highlight color">
                {COLORS.map((c) => (
                    <button
                        key={c.name}
                        title={`Highlight ${c.label}`}
                        className="highlight-toolbar__swatch"
                        style={{ background: c.dot }}
                        onClick={() => onHighlight(c.name, c.cls)}
                    />
                ))}
            </div>

            <div className="highlight-toolbar__divider" />

            {/* Action buttons */}
            <button
                className="highlight-toolbar__action"
                title="Add to Notes"
                onClick={onAddToNotes}
            >
                <Icon icon="ri:quill-pen-line" width="14" />
            </button>
            <button
                className="highlight-toolbar__action"
                title="Copy text"
                onClick={onCopy}
            >
                <Icon icon="ri:file-copy-line" width="14" />
            </button>
        </div>
    )
}
