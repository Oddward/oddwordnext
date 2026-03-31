import '../styles/global.css'
import { siteTitle } from '../lib/site'
import Navbar, { NavContactForm, NavNotesSidebar } from '../components/navbar'
import Footer from '../components/footer'
import GardenProvider from '../components/GardenProvider'

// App Router metadata replaces next/head in _app and Layout (site-wide defaults).
export const metadata = {
    title: {
        default: siteTitle,
        template: `%s | ${siteTitle}`,
    },
    description: 'Learn how to build a personal website using Next.js',
    icons: {
        icon: '/favicon.ico',
    },
    openGraph: {
        title: siteTitle,
        images: [
            `https://og-image.vercel.app/${encodeURI(
                siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`,
        ],
    },
    twitter: {
        card: 'summary_large_image',
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="flex flex-col">
                <GardenProvider>
                    <Navbar />
                    <NavContactForm />
                    <NavNotesSidebar />

                    <main className="pt-20">
                        {children}
                    </main>

                    <Footer />
                </GardenProvider>
            </body>
        </html>
    )
}
