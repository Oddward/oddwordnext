import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Navbar from './navbar';
import Footer from './footer';

const name = 'Mugtaba G';
export const siteTitle = 'Next.js Oddward Blog slash Garden';

export default function Layout({ children, home }) {
  return (
    <div className={`flex flex-col`}>
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
            />
            <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
                siteTitle,
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
            />
            <meta name="og:title" content={siteTitle} />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <Navbar />

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