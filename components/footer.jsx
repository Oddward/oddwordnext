import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

export default function Footer() {
    return(
        <footer className="flex justify-between gap-8 text-slate-400 border-t border-slate-700 p-4 mt-12">
            <p>© 2023-{new Date().getFullYear()} — Oddward // Mugtaba G</p>
            <div className="flex justify-between nowrap gap-2">
                <a rel="me" href="https://bsky.app/profile/oddward.space" target="_blank" className="hover:text-[gold]">
                    <Icon icon="ri:bluesky-fill" />
                </a>
                <a rel="me" href="https://universeodon.com/@oddward" target="_blank" className="hover:text-[gold]">
                    <Icon icon="ri:mastodon-fill" />
                </a>
                <a href="https://x.com/oddward_io" target="_blank" className="hover:text-[gold]">
                    <Icon icon="ri:twitter-x-fill" />
                </a>
                <a href="https://threads.com/@mugtaba.g" target="_blank" className="hover:text-[gold]">
                    <Icon icon="ri:threads-fill" />
                </a>
                <a href="https://github.com/Oddward" target="_blank" className="hover:text-[gold]">
                    <Icon icon="ri:github-fill" />
                </a>
            </div>
        </footer>
    )
}