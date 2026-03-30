'use client'

import Logo from "./logo";
import PageLink from "./PageLink";

import styles from "./navbar.module.css";
import { Icon } from "@iconify-icon/react";
import { useRef, useState } from "react";

export default function Navbar() {
    const contact = useRef(null);
    const [contactShow, setContactShow] = useState(false);

    const handleContactShow = () => {
        setContactShow(!contactShow);
        console.log("Toggled contact form");
    };

    return (
        <nav className="fixed bottom-0 md:sticky md:bottom-auto md:top-0 z-30 flex justify-between w-full px-6 py-4 border-t border-b border-slate-700 bg-slate-900 uxl:floater-nav">
            <a href="/" className="w-8">
                <Logo
                    width="32"
                    height="32"
                    className="logo flex-shrink-0 w-6 h-6 my-2 md:w-[1.8rem] md:h-[1.8rem]"
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
                {/* <PageLink
                    onClick={handleContactShow}
                    active={contactShow}
                    label="Contact"
                    classes={`hover-accent-bg h-full`}
                    iconLabel="ri:message-3-line"
                /> */}
                <label
                    htmlFor="contact-toggle"
                    className="size-10 rounded-full border border-slate-400 text-[gold] grid place-items-center cursor-pointer"
                >
                    <Icon name="ri:arrow-arrow-left-circle-line"></Icon>
                </label>
                <label
                    htmlFor="notes-toggle"
                    className="size-10 rounded-full border border-slate-400 text-[gold] grid place-items-center cursor-pointer"
                >
                    <Icon name="ri:quill-pen-line"></Icon>
                </label>
            </ul>
            {/* Contact sidebar moved to main */}
        </nav>
    );
}

export function NavContactForm() {
    return (
        <div
            id="contact-panel"
            className={`fixed z-10 top-0 -right-96 pt-20 flex flex-col gap-4 h-full w-xl sm:w-96 border-s border-slate-700 bg-slate-900 text-white px-8 pb-12 overflow-hidden transition-all duration-200 ease-in-out peer-checked/contact:right-0`}
        >
            {/* <label
                htmlFor="contact-toggle"
                className="size-10 rounded-full border border-slate-400 grid place-items-center cursor-pointer"
            >
                <Icon name="ri:arrow-arrow-right-circle-line"></Icon>
            </label> */}
            <p className="text-3xl font-black pt-4">Get in Touch</p>
            <form action="" method="post" className="flex flex-col gap-2 py-2">
                <div>
                    {/* <label htmlFor="Name" className="text-sm hidden">
                        name
                    </label> */}
                    <input
                        type="text"
                        name="Name"
                        className={styles["text-input"]}
                        placeholder="enter name..."
                    />
                </div>
                <div>
                    {/* <label htmlFor="Email" className="text-sm hidden">
                        email
                    </label> */}
                    <input
                        type="mail"
                        name="Email"
                        className={styles["text-input"]}
                        placeholder="enter email address..."
                    />
                </div>
                <div>
                    {/* <label htmlFor="Message" className="text-sm hidden">
                        message
                    </label> */}
                    <input
                        type="textarea"
                        name="Message"
                        className={styles["text-input"]}
                        placeholder="enter your message..."
                    />
                </div>
                {/* <input type="button" value="Send" className={styles.btn} /> */}
                <button type="button" role="submit" className={styles.btn}>
                    <Icon icon="ri:send-plane-fill" size="1.2em" class="icon" />
                    <span>Send</span>
                </button>
            </form>
            <hr />
            <button type="button" className={styles.btn}>
                <Icon
                    icon="icon-park-outline:clipboard"
                    size="1.2em"
                    class="icon"
                />
                <span>Copy email address</span>
            </button>
            <button type="button" className={styles.btn}>
                <Icon
                    icon="icon-park-outline:mail-edit"
                    size="1.2em"
                    class="icon"
                />
                <span>Open mail client</span>
            </button>
        </div>
    );
}
