'use client'

import Logo from "./logo";
import PageLink from "./PageLink";
import NoteItem from "./NoteItem";

import styles from "./navbar.module.css";
import { Icon } from "@iconify-icon/react";
import { useEffect, useMemo, useRef, useState } from "react";
import useGardenStore from "../store/gardenStore";

export default function Navbar() {
    const toggleSidebar = useGardenStore((s) => s.toggleSidebar);
    const activeSidebar = useGardenStore((s) => s.activeSidebar);
    const navRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollYRef = useRef(0);
    const rafRef = useRef(null);

    const motionClass = useMemo(() => {
        // Mobile: slide down (off bottom). Desktop: slide up (off top).
        // We use fixed positioning for both so it never "unsticks".
        return isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-full md:-translate-y-full opacity-0 pointer-events-none";
    }, [isVisible]);

    useEffect(() => {
        const root = document.documentElement;
        const mq = window.matchMedia("(min-width: 768px)");

        const setOffsets = (visible = isVisible) => {
            const navH = navRef.current?.offsetHeight ?? 0;
            const pad = navH ? `${navH + 16}px` : "0px"; // +16px breathing room

            if (mq.matches) {
                root.style.setProperty("--nav-top-pad", visible ? pad : "0px");
                root.style.setProperty("--nav-bottom-pad", "0px");
            } else {
                root.style.setProperty("--nav-top-pad", "0px");
                root.style.setProperty("--nav-bottom-pad", visible ? pad : "0px");
            }
        };

        const onScroll = () => {
            if (rafRef.current) return;
            rafRef.current = window.requestAnimationFrame(() => {
                rafRef.current = null;

                const y = window.scrollY || 0;
                const lastY = lastScrollYRef.current;
                const delta = y - lastY;
                lastScrollYRef.current = y;

                // Always show near the top.
                if (y < 48) {
                    setIsVisible(true);
                    setOffsets(true);
                    return;
                }

                // Hide after some scroll-down distance; show on scroll-up.
                if (delta > 6 && y > 160) {
                    setIsVisible(false);
                    setOffsets(false);
                } else if (delta < -6) {
                    setIsVisible(true);
                    setOffsets(true);
                }
            });
        };

        const onResize = () => setOffsets(isVisible);
        const onMqChange = () => setOffsets(isVisible);

        // Init
        lastScrollYRef.current = window.scrollY || 0;
        setOffsets(isVisible);

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        mq.addEventListener?.("change", onMqChange);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            mq.removeEventListener?.("change", onMqChange);
            if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
        };
    }, [isVisible]);

    return (
        <nav
            ref={navRef}
            className={`fixed bottom-0 md:bottom-auto md:top-0 md:fixed z-30 flex justify-between w-full px-6 py-4 border-t border-b border-current/5 bg-slate-900 uxl:floater-nav transition-transform duration-200 ease-out ${motionClass}`}
        >
            <a href="/" className="w-8">
                <Logo
                    width="32"
                    height="32"
                    className="logo shrink-0 w-6 h-6 my-2 md:w-[1.8rem] md:h-[1.8rem]"
                />
            </a>
            <ul className="links flex gap-12 md:gap-10">
                <PageLink
                    label="Home"
                    iconLabel="ri:home-2-line"
                    className="h-full"
                />
                <PageLink
                    label="About"
                    iconLabel="ri:user-smile-line"
                    className="h-full"
                />
                <button
                    onClick={() => toggleSidebar('contact')}
                    aria-pressed={activeSidebar === 'contact'}
                    className={`size-10 btn-ghost rounded-full text-(--primary-color) grid place-items-center cursor-pointer transition-colors duration-150 ${
                        activeSidebar === 'contact'
                            ? 'border-[gold] bg-[gold]/10'
                            : 'border-slate-400'
                    }`}
                    title="Contact"
                >
                    <Icon icon="ri:arrow-left-circle-line" />
                </button>
                <button
                    onClick={() => toggleSidebar('notes')}
                    aria-pressed={activeSidebar === 'notes'}
                    className={`size-10 btn-ghost rounded-full text-(--primary-color) grid place-items-center cursor-pointer transition-colors duration-150 ${
                        activeSidebar === 'notes'
                            ? 'border-[gold] bg-[gold]/10'
                            : 'border-slate-400'
                    }`}
                    title="Your Notes"
                >
                    <Icon icon="ri:quill-pen-line" />
                </button>
            </ul>
        </nav>
    );
}

export function NavContactForm() {
    const activeSidebar = useGardenStore((s) => s.activeSidebar);
    const closeSidebar  = useGardenStore((s) => s.closeSidebar);
    const isOpen = activeSidebar === 'contact';

    return (
        <div
            id="contact-panel"
            style={{
                paddingTop: "var(--nav-top-pad, 0px)",
                paddingBottom: "var(--nav-bottom-pad, 0px)",
            }}
            className={`fixed z-20 top-0 flex flex-col gap-4 h-full w-full sm:w-96 border-s border-current/10 bg-slate-900 text-white shadow-2xl px-8 overflow-hidden transition-all duration-200 ease-in-out ${
                isOpen ? 'right-0' : '-right-[40rem]'
            }`}
        >
            <div className="flex items-center justify-between pt-4">
                <p className="text-3xl font-black">Get in Touch</p>
                <button
                    onClick={closeSidebar}
                    className="text-slate-400 hover:text-white transition-colors"
                    title="Close"
                >
                    <Icon icon="ri:close-line" width="20" />
                </button>
            </div>
            <form action="" method="post" className="flex flex-col gap-2 py-2">
                <div>
                    <input
                        type="text"
                        name="Name"
                        className={styles["text-input"]}
                        placeholder="enter name..."
                    />
                </div>
                <div>
                    <input
                        type="mail"
                        name="Email"
                        className={styles["text-input"]}
                        placeholder="enter email address..."
                    />
                </div>
                <div>
                    <input
                        type="textarea"
                        name="Message"
                        className={styles["text-input"]}
                        placeholder="enter your message..."
                    />
                </div>
                <button type="button" role="submit" className={`btn-solid`}>
                    <Icon icon="ri:send-plane-fill" size="1.2em" class="icon" />
                    <span>Send</span>
                </button>
            </form>
            <hr />
            <button type="button" className={styles.navPanelBtn}>
                <Icon icon="icon-park-outline:clipboard" size="1.2em" class="icon" />
                <span>Copy email address</span>
            </button>
            <button type="button" className={styles.navPanelBtn}>
                <Icon icon="icon-park-outline:mail-edit" size="1.2em" class="icon" />
                <span>Open mail client</span>
            </button>
        </div>
    );
}

export function NavNotesSidebar() {
    const activeSidebar = useGardenStore((s) => s.activeSidebar);
    const closeSidebar  = useGardenStore((s) => s.closeSidebar);
    const notes         = useGardenStore((s) => s.notes);
    const addNote       = useGardenStore((s) => s.addNote);
    const shareNotes    = useGardenStore((s) => s.shareNotes);
    const exportAsMarkdown = useGardenStore((s) => s.exportAsMarkdown);
    const clearAll      = useGardenStore((s) => s.clearAll);

    const [noteText, setNoteText] = useState('');
    const isOpen = activeSidebar === 'notes';

    const handleSave = () => {
        const trimmed = noteText.trim();
        if (!trimmed) return;
        addNote(trimmed, null, null);
        setNoteText('');
    };

    return (
        <div
            id="notes-panel"
            style={{
                paddingTop: "var(--nav-top-pad, 0px)",
                paddingBottom: "var(--nav-bottom-pad, 0px)",
            }}
            className={`fixed z-20 top-0 flex flex-col gap-4 h-full w-full sm:w-96 border-s border-current/10 bg-slate-900 text-white shadow-2xl px-8 overflow-y-auto transition-all duration-300 ease-in-out ${
                isOpen ? 'right-0' : '-right-[40rem]'
            }`}
        >
            <div className="flex items-center justify-between pt-4">
                <p className="text-3xl font-black">Notes</p>
                <div className="flex gap-2">
                    {notes.length > 0 && (
                        <>
                            <button
                                onClick={exportAsMarkdown}
                                className="btn-subtle rounded-full size-8 text-xs text-slate-400 hover:text-white transition-colors"
                                title="Download as Markdown"
                            >
                                <Icon icon="ri:markdown-line" width="18" />
                            </button>
                            <button
                                onClick={shareNotes}
                                className="btn-subtle rounded-full size-8 text-xs text-slate-400 hover:text-white transition-colors"
                                title="Share notes"
                            >
                                <Icon icon="ri:share-line" width="18" />
                            </button>
                            <button
                                onClick={clearAll}
                                className="btn-subtle rounded-full size-8 text-xs text-slate-400 hover:text-red-400 transition-colors"
                                title="Clear all notes"
                            >
                                <Icon icon="ri:delete-bin-line" width="18" />
                            </button>
                        </>
                    )}
                    <button
                        onClick={closeSidebar}
                        className="btn-subtle rounded-full size-8 text-xs text-slate-400 hover:text-white transition-colors"
                        title="Close"
                    >
                        <Icon icon="ri:close-line" width="20" />
                    </button>
                </div>
            </div>

            {/* Freeform note composer */}
            <div className="flex flex-col gap-2">
                <textarea
                    className={`${styles["text-input"]} resize-none h-24`}
                    placeholder="Write a note..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSave();
                    }}
                />
                <button
                    onClick={handleSave}
                    disabled={!noteText.trim()}
                    className={`${styles.navPanelBtn} disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                    <Icon icon="ri:save-3-line" size="1.2em" class="icon" />
                    <span>Save Note</span>
                </button>
            </div>

            {/* Saved notes list */}
            {notes.length > 0 ? (
                <ul className="flex flex-col gap-3 mt-2">
                    {notes.map((note) => (
                        <li key={note.id}>
                            <NoteItem note={note} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-slate-500 text-sm text-center mt-4">
                    Select text on any article to save highlights and notes.
                </p>
            )}
        </div>
    );
}
