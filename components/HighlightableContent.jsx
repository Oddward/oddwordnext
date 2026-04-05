'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import HighlightToolbar from './HighlightToolbar'
import useGardenStore from '../store/gardenStore'

/**
 * Wraps post content to enable ephemeral text highlighting and note capture.
 *
 * Highlights are stored in local component state only — they are cleared when
 * the user navigates away or reloads. To persist content, users click
 * "Add to Notes" which saves to the Zustand store (localStorage-backed).
 *
 * Props:
 *   children – the rendered post content (dangerouslySetInnerHTML div, etc.)
 *   postId   – the post's URL slug, passed to notes for source attribution
 */
export default function HighlightableContent({ children, postId }) {
    const contentRef = useRef(null)
    const selectionDebounceRef = useRef(null)
    const [toolbar, setToolbar] = useState(null)
    // toolbar shape: { top, left, text, range, markEl? }

    const addNote = useGardenStore((s) => s.addNote)
    const openSidebar = useGardenStore((s) => s.openSidebar)

    // ── Selection detection ──────────────────────────────────────────────────
    // Mobile browsers often never fire mouseup after a touch text selection, so we
    // rely on selectionchange (debounced) as the primary signal. Desktop still uses
    // mouseup for a snappy response; both paths share this logic.
    const syncToolbarFromSelection = useCallback(() => {
        const sel = window.getSelection()
        if (!sel || sel.isCollapsed || !sel.rangeCount) {
            setToolbar(null)
            return
        }

        const range = sel.getRangeAt(0)
        const text = sel.toString().trim()
        if (!text) {
            setToolbar(null)
            return
        }

        if (!contentRef.current?.contains(range.commonAncestorContainer)) {
            setToolbar(null)
            return
        }

        // Safari (especially iOS) can report an empty rect for a valid range; merge getClientRects().
        let rect = range.getBoundingClientRect()
        if (rect.width === 0 && rect.height === 0) {
            const rects = range.getClientRects()
            if (rects.length === 0) {
                setToolbar(null)
                return
            }
            let minL = Infinity
            let minT = Infinity
            let maxR = -Infinity
            let maxB = -Infinity
            for (let i = 0; i < rects.length; i++) {
                const r = rects[i]
                minL = Math.min(minL, r.left)
                minT = Math.min(minT, r.top)
                maxR = Math.max(maxR, r.right)
                maxB = Math.max(maxB, r.bottom)
            }
            rect = {
                left: minL,
                top: minT,
                width: maxR - minL,
                height: maxB - minT,
            }
        }

        const toolbarWidth = 220
        const left = Math.min(
            Math.max(rect.left + window.scrollX + rect.width / 2 - toolbarWidth / 2, 8),
            window.innerWidth - toolbarWidth - 8
        )
        const top = rect.top + window.scrollY - 52

        setToolbar({ top, left, text, range })
    }, [])

    const handleMouseUp = useCallback((e) => {
        // Clicking an existing highlight will collapse selection and would
        // immediately clear the toolbar. Let the click handler manage it.
        if (e?.target?.closest?.('mark.highlight')) return

        // Short delay so the browser finalises the selection object
        setTimeout(syncToolbarFromSelection, 10)
    }, [syncToolbarFromSelection])

    // selectionchange fires for touch text selection where mouseup often does not (iOS/Android).
    // Debounce so we read the selection once handles/caret settle, not on every drag frame.
    useEffect(() => {
        const onSelectionChange = () => {
            if (selectionDebounceRef.current) clearTimeout(selectionDebounceRef.current)
            selectionDebounceRef.current = setTimeout(() => {
                selectionDebounceRef.current = null
                syncToolbarFromSelection()
            }, 120)
        }
        document.addEventListener('selectionchange', onSelectionChange)
        return () => {
            document.removeEventListener('selectionchange', onSelectionChange)
            if (selectionDebounceRef.current) clearTimeout(selectionDebounceRef.current)
        }
    }, [syncToolbarFromSelection])

    // Dismiss on outside tap/click or Escape (pointerdown covers touch + mouse; mousedown misses many touch cases)
    useEffect(() => {
        const handleKeyDown = (e) => { if (e.key === 'Escape') setToolbar(null) }
        const handlePointerDown = (e) => {
            const tb = document.getElementById('highlight-toolbar')
            if (tb && tb.contains(e.target)) return
            if (!contentRef.current?.contains(e.target)) setToolbar(null)
        }
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('pointerdown', handlePointerDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('pointerdown', handlePointerDown)
        }
    }, [])

    // Re-open toolbar when clicking an existing highlight
    const handleContentClick = useCallback((e) => {
        const mark = e.target?.closest?.('mark.highlight')
        if (!mark || !contentRef.current?.contains(mark)) return

        const text = mark.textContent?.trim()
        if (!text) return

        const range = document.createRange()
        range.selectNodeContents(mark)

        const rect = mark.getBoundingClientRect()
        const toolbarWidth = 220
        const left = Math.min(
            Math.max(rect.left + window.scrollX + rect.width / 2 - toolbarWidth / 2, 8),
            window.innerWidth - toolbarWidth - 8
        )
        const top = rect.top + window.scrollY - 52

        setToolbar({ top, left, text, range, markEl: mark })
    }, [])

    // ── Toolbar actions ──────────────────────────────────────────────────────
    const handleHighlight = useCallback((colorName, colorCls) => {
        if (!toolbar?.range) return
        try {
            // If the user clicked an existing highlight, just update its color.
            if (toolbar.markEl) {
                toolbar.markEl.className = `highlight highlight-${colorName}`
                setToolbar(null)
                window.getSelection()?.removeAllRanges()
                return
            }

            const mark = document.createElement('mark')
            mark.className = `highlight highlight-${colorName}`
            mark.dataset.highlightId = crypto.randomUUID()

            // surroundContents fails on partial elements — clone + replace instead
            const frag = toolbar.range.extractContents()
            mark.appendChild(frag)
            toolbar.range.insertNode(mark)

            window.getSelection()?.removeAllRanges()
            setToolbar(null)
        } catch (err) {
            console.warn('Could not wrap selection:', err)
            setToolbar(null)
        }
    }, [toolbar])

    const handleAddToNotes = useCallback(() => {
        if (!toolbar?.text) return
        addNote('', toolbar.text, postId)
        openSidebar('notes')
        setToolbar(null)
        window.getSelection()?.removeAllRanges()
    }, [toolbar, addNote, openSidebar, postId])

    const handleCopy = useCallback(async () => {
        if (!toolbar?.text) return
        try {
            await navigator.clipboard.writeText(toolbar.text)
        } catch {
            /* silent */
        }
        setToolbar(null)
        window.getSelection()?.removeAllRanges()
    }, [toolbar])

    return (
        <div
            ref={contentRef}
            onMouseUp={handleMouseUp}
            onClickCapture={handleContentClick}
            className="highlightable-content"
        >
            {children}
            <HighlightToolbar
                position={toolbar ? { top: toolbar.top, left: toolbar.left } : null}
                onHighlight={handleHighlight}
                onAddToNotes={handleAddToNotes}
                onCopy={handleCopy}
                onDismiss={() => setToolbar(null)}
            />
        </div>
    )
}
