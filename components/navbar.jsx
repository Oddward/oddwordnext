import Logo from "./logo"
import PageLink from "./PageLink"
import styles from './navbar.module.css'
import { Icon } from "@iconify-icon/react";
import { useRef, useState } from "react";

export default function Navbar() {
    const contact = useRef(null)
    const [contactShow, setContactShow] = useState(false)

    const handleContactShow = () => {
        setContactShow(!contactShow)
        console.log('Toggled contact form')
    }

    return(
        <nav className="relative md:sticky z-30 flex justify-between w-full px-6 border-b border-slate-700 uxl:floater-nav">
            <a href="/" className="w-8">
                <Logo width="32" height="32" className="logo flex-shrink-0 w-6 h-6 my-2 md:w-[1.8rem] md:h-[1.8rem]" />
            </a>
            <ul className="links flex gap-12 md:gap-10">
                <PageLink label="Home" iconLabel="ri:home-2-line" className="h-full" />
                <PageLink label="About" iconLabel="ri:user-smile-line" className="h-full" />
                {/* <div className={`inline-block`} onClick={handleContactShow} > */}
                {/* <span onClick={handleContactShow}> */}
                <PageLink 
                    onClick={handleContactShow}
                    active={contactShow}
                    label="Contact" 
                    classes={`hover-accent-bg h-full`} 
                    iconLabel="ri:message-3-line">
                </PageLink>
                {/* </span> */}
                {/* </div> */}
            </ul>
            <NavContactForm contactShow={contactShow} />
        </nav>
    );
}

function NavContactForm({ contactShow }) {
    return(
        <div id="contact-panel" className={`absolute z-20 top-full right-0 flex flex-col gap-4 h-auto w-full sm:w-96 bg-[gold] text-slate-900 px-8 pb-12 shadow-lg ${contactShow ? '':'hidden'}`}>
            <p className="text-3xl font-black pt-4">Get in Touch</p>
            <form action="" method="post" className="flex flex-col gap-2 py-2">
                <div>
                    <label htmlFor="Name" className="text-sm hidden">name</label>
                    <input type="text" name="Name" className={styles['text-input']} placeholder="enter name..." />
                </div>
                <div>
                    <label htmlFor="Email" className="text-sm hidden">email</label>
                    <input type="mail" name="Email" className={styles['text-input']} placeholder="enter email address..." />
                </div>
                <div>
                    <label htmlFor="Message" className="text-sm hidden">message</label>
                    <input type="textarea" name="Message" className={styles['text-input']} placeholder="enter your message..." />
                </div>
                {/* <input type="button" value="Send" className={styles.btn} /> */}
                <button type="button" role="submit" className={styles.btn}>
                    <Icon icon="ri:send-plane-fill" size="1.2em" class="icon" />
                    <span>Send</span>
                </button>
            </form>
            <hr />
            <button type="button" className={styles.btn}>
                <Icon icon="icon-park-outline:clipboard" size="1.2em" class="icon" />
                <span>Copy email address</span>
            </button>
            <button type="button" className={styles.btn}>
                <Icon icon="icon-park-outline:mail-edit" size="1.2em" class="icon" />
                <span>Open mail client</span>
            </button>
        </div>
    )
}