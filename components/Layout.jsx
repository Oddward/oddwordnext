import styles from "./layout.module.css";
import Link from "next/link";
import Navbar, { NavContactForm } from "./navbar";
import Footer from "./footer";
import { siteTitle } from "../lib/site";

// Re-export for any import path that expects Layout to own the title string.
export { siteTitle };

export default function Layout({ children, home }) {
    return (
        <div className={`flex flex-col`}>
            <Navbar />
            <input
                type="checkbox"
                id="contact-toggle"
                className="hidden peer/contact"
            />
            <NavContactForm />

            <main>
                {children}
                {!home && (
                    <div className={styles.backToHome}>
                        <Link href="/">← Back to home</Link>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
