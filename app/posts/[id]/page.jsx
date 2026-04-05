import Date from '../../../components/date'
import { getAllPostIds, getPostData } from '../../../lib/posts'
import { POST_TYPE_LABELS } from '../../../lib/postTypes'
import Link from 'next/link'
import styles from './post.module.css'
import Image from 'next/image'
import Logo from '../../../components/logo'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import HighlightableContent from '../../../components/HighlightableContent'

// Build a static path per post (replaces getStaticPaths).
export async function generateStaticParams() {
    return getAllPostIds().map(({ params }) => ({ id: params.id }))
}

// Match previous pages router: document title is only the post title.
export async function generateMetadata({ params }) {
    const { id } = await params
    const postData = await getPostData(id)
    return {
        title: { absolute: postData.title },
    }
}

/** Shipped asset used when frontmatter has no thumbnail (non-article posts, drafts). */
const FALLBACK_COVER = '/images/3_backticks_regular_pgrad.svg'

export default async function Post({ params }) {
    const { id } = await params
    const postData = await getPostData(id)
    const typeLabel =
        POST_TYPE_LABELS[postData.postType] ?? POST_TYPE_LABELS.article
    const coverSrc = postData.thumbnail || FALLBACK_COVER

    return (
        <>
            <article className={styles.article}>
                <header className={styles.header}>
                    <div className={``}>
                        <Image
                            src={coverSrc}
                            alt={postData.title ? `Cover: ${postData.title}` : 'Post cover'}
                            className={styles.cover}
                            width={300}
                            height={200}
                        />
                    </div>
                    <div className={``}>
                        <h1 className={``}>{postData.title}</h1>
                        {postData.subtitle ? (
                            <p className={styles.subtitle}>{postData.subtitle}</p>
                        ) : null}
                        <div
                            className={`flex flex-row shrink-[1.5] items-center gap-2 py-4`}
                        >
                            <p>
                                —<span className={styles.author} aria-label="Author">Mugtaba G</span>
                            </p>
                        </div>
                        {postData.tags?.length > 0 ? (
                            <div className={styles.tagsContainer}>
                                {postData.tags.map((tag) => (
                                    <span key={tag} className={styles.tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </header>

                <div className={`m-6 max-w-[90ch]`}>
                    <div className={styles.meta}>
                        <span>{typeLabel}</span>
                        <Logo
                            outline
                            className={` w-12 h-12 stroke-2 stroke-current overflow-visible mx-auto`}
                        />
                        <Date dateString={postData.date} />
                    </div>

                    <HighlightableContent postId={`/posts/${id}`}>
                        <div
                            className={styles.content}
                            dangerouslySetInnerHTML={{
                                __html: postData.contentHtml,
                            }}
                        />
                    </HighlightableContent>

                    <div className={`flex flex-row gap-4 w-full my-12`}>
                        <hr className="border-slate-600 w-full" />
                        <Image
                            src={`/images/3_backticks_regular_pgrad.svg`}
                            alt=""
                            width={60}
                            height={20}
                        />
                        <hr className="border-slate-600 w-full" />
                    </div>

                    <div>
                        <div className={`flex flex-row items-center gap-2 py-4`}>
                            <Image
                                src={`/images/pfp_cool.jpg`}
                                alt=""
                                width={32}
                                height={32}
                                className={styles.avatar}
                            />
                            <span className={`font-bold opacity-85`}>
                                Mugtaba G
                            </span>
                        </div>
                        <small className="inline-block mb-6">
                            African raised in Asia, a melting pot of cultures
                            and interests with most of them revolving around
                            visual arts, natural sciences and understanding
                            people. Trying to create semi-educational and
                            inspirational content. Usually consuming lots of
                            media (especially animation), practicing web
                            development and graphic design, gaming, and/or
                            hanging out on a discord chat.
                        </small>
                        <ul className={styles['about-links']}>
                            <li>
                                <a href="https://threads.com/@mugtaba.g">
                                    <Icon icon="ri:threads-fill" />
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com/mugtaba.g">
                                    <Icon icon="ri:instagram-fill" />
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com/oddward.io">
                                    <Icon icon="ri:instagram-fill" />
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/Oddward">
                                    <Icon icon="ri:github-fill" />
                                </a>
                            </li>
                            <li>
                                <a href="https://dribbble.com/oddward">
                                    <Icon icon="ri:dribbble-fill" />
                                </a>
                            </li>
                            <li>
                                <a href="https://codepen.io/Oddward">
                                    <Icon icon="ri:codepen-fill" />
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com/in/mugtabagaroot">
                                    <Icon icon="ri:linkedin-box-fill" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </article>
            <div className="mt-12 mx-auto max-w-[90ch]">
                <Link href="/" className="btn-outline w-auto rounded-full size-10" aria-label="Back to home">
                    <Icon icon="ri:arrow-left-line" />
                    <span className="hidden md:inline-block">Back to home</span>
                </Link>
            </div>
        </>
    )
}
