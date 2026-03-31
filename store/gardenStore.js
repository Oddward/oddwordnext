'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Renders the saved notes array as a Markdown string.
 * postId is stored as a path (e.g. /posts/my-article), so we
 * combine it with window.location.origin at export time to get
 * the full absolute URL.
 */
function buildMarkdown(notes) {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''

    const header = `# My Oddword Garden Notes\n_Exported ${new Date().toLocaleString()}_\n`

    const body = notes
        .map((n) => {
            const date = new Date(n.createdAt).toLocaleDateString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric',
            })
            const url = n.postId ? `${origin}${n.postId}` : null

            const lines = []
            lines.push(`## ${date}`)
            if (url) lines.push(`**Source:** [${url}](${url})`)
            if (n.sourceText) lines.push(`\n> ${n.sourceText}`)
            if (n.text) lines.push(`\n${n.text}`)
            return lines.join('\n')
        })
        .join('\n\n---\n\n')

    return `${header}\n---\n\n${body}\n`
}

const useGardenStore = create(
    persist(
        (set, get) => ({
            // ── UI State (not persisted) ────────────────────────────────────
            activeSidebar: null, // null | 'contact' | 'notes'

            openSidebar: (name) => set({ activeSidebar: name }),
            closeSidebar: () => set({ activeSidebar: null }),
            toggleSidebar: (name) =>
                set((state) => ({
                    activeSidebar: state.activeSidebar === name ? null : name,
                })),

            // ── Notes (persisted) ───────────────────────────────────────────
            notes: [],
            // note shape: { id, text, sourceText?, postId?, createdAt }

            addNote: (text, sourceText = null, postId = null) =>
                set((state) => ({
                    notes: [
                        {
                            id: crypto.randomUUID(),
                            text,
                            sourceText,
                            postId,
                            createdAt: new Date().toISOString(),
                        },
                        ...state.notes,
                    ],
                })),

            removeNote: (id) =>
                set((state) => ({
                    notes: state.notes.filter((n) => n.id !== id),
                })),

            clearAll: () => set({ notes: [] }),

            shareNotes: async () => {
                const { notes } = get()
                if (!notes.length) return

                const md = buildMarkdown(notes)
                const payload = { title: 'My Oddword Notes', text: md }

                try {
                    if (navigator.share) {
                        await navigator.share(payload)
                    } else {
                        await navigator.clipboard.writeText(md)
                        alert('Notes copied to clipboard!')
                    }
                } catch (err) {
                    console.error('Share failed:', err)
                }
            },

            exportAsMarkdown: () => {
                const { notes } = get()
                if (!notes.length) return

                const md = buildMarkdown(notes)
                const blob = new Blob([md], { type: 'text/markdown; charset=utf-8' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `oddword-notes-${new Date().toISOString().slice(0, 10)}.md`
                a.click()
                URL.revokeObjectURL(url)
            },
        }),
        {
            name: 'oddword-garden',
            // Only persist notes, not UI state
            partialize: (state) => ({ notes: state.notes }),
        }
    )
)

export default useGardenStore
