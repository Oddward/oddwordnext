'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

                const text = notes
                    .map((n) => {
                        const header = n.postId ? `[${n.postId}]` : '[General]'
                        const quote = n.sourceText ? `> "${n.sourceText}"\n` : ''
                        return `${header} ${new Date(n.createdAt).toLocaleDateString()}\n${quote}${n.text}`
                    })
                    .join('\n\n---\n\n')

                const payload = {
                    title: 'My Oddword Notes',
                    text,
                }

                try {
                    if (navigator.share) {
                        await navigator.share(payload)
                    } else {
                        await navigator.clipboard.writeText(text)
                        alert('Notes copied to clipboard!')
                    }
                } catch (err) {
                    console.error('Share failed:', err)
                }
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
