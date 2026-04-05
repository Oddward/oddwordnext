'use client'

import { Icon } from '@iconify-icon/react'
import useGardenStore from '../store/gardenStore'

/**
 * A single saved note card in the Notes sidebar.
 *
 * Props:
 *   note – { id, text, sourceText, postId, createdAt }
 */
export default function NoteItem({ note }) {
    const removeNote = useGardenStore((s) => s.removeNote)
    const date = new Date(note.createdAt)
    const dateStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

    const handleShare = async () => {
        const origin = typeof window !== 'undefined' ? window.location.origin : ''
        const url = note.postId ? `${origin}${note.postId}` : null

        const lines = []
        if (note.sourceText) lines.push(`"${note.sourceText}"`)
        if (note.text) lines.push(note.text)
        if (url) lines.push(url)
        const text = lines.filter(Boolean).join('\n\n')

        const payload = { title: 'OddWord note', text }

        try {
            if (navigator.share) {
                await navigator.share(payload)
            } else {
                await navigator.clipboard.writeText(text)
                alert('Note copied to clipboard!')
            }
        } catch (err) {
            console.error('Share failed:', err)
        }
    }

    return (
        <article className="note-item">
            {note.sourceText && (
                <blockquote className="note-item__quote border-0 p-0">
                    "{note.sourceText}"
                </blockquote>
            )}

            {note.text && (
                <p className="note-item__text">{note.text}</p>
            )}

            <footer className="note-item__footer">
                <span className="note-item__date">{dateStr}</span>
                {note.postId && (
                    <a href={note.postId} className="note-item__source" title="Go to source article">
                        <Icon icon="ri:article-line" width="12" />
                        <span>source</span>
                    </a>
                )}
                <button
                    className="note-item__delete"
                    title="Share note"
                    onClick={handleShare}
                >
                    <Icon icon="ri:share-line" width="14" />
                </button>
                <button
                    className="note-item__delete"
                    title="Delete note"
                    onClick={() => removeNote(note.id)}
                >
                    <Icon icon="ri:delete-bin-line" width="14" />
                </button>
            </footer>
        </article>
    )
}
