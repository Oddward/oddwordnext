import Head from 'next/head';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
// import utilStyles from '../../styles/utils.module.css'
import Layout from '../../components/Layout';
import styles from './post.module.css'
import Image from 'next/image';
import Logo from '../../components/logo';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
//   .then( console.log( postData ) )

  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
            <title>{ postData.title }</title>
        </Head>
        <article className={styles.article}>

            <header className={styles.header}>
                <div className={``}>
                    <Image src={postData.thumbnail} alt="header image for article" className={styles.cover} width={300} height={200} />
                    {/* <span className={`${styles.tag}`}>{ postData.tags }</span> */}
                </div>
                <div className={``}>
                    <h1 className={``}>{ postData.title }</h1>
                    <p className={styles.subtitle}>{ postData.subtitle }</p>
                    <div className={`flex flex-row flex-shrink-[1.5] items-center gap-2 py-4`}>
                        {/* <Image src={`/images/pfp_cool.jpg`} alt='' width={32} height={32} className={styles.avatar} /> */}
                        <p>—<span className={styles.author}>Mugtaba G</span></p>
                    </div>
                    <div>
                        <span className={`${styles.tag}`}>{ postData.tags }</span>
                        {/* { postData.map( ({ tags }) => (
                            <span>{ tags }</span>
                        )) } */}
                    </div>
                </div>
            </header>
            
            <div className={`m-6 max-w-[65ch]`}>

            <div className={styles.meta}>
                <span>Article post</span>
                <Logo outline className={` w-12 h-12 stroke-2 stroke-current overflow-visible mx-auto`} />
                <Date dateString={ postData.date } />
            </div>

            <div className={styles.content} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            
            <div className={`flex flex-row gap-4 w-full mx-8`}>
                <hr className='border-slate-600 w-full'/>
                <Image src={`/images/3_backticks_regular_pgrad.svg`} alt='' width={60} height={20} />
                <hr className='border-slate-600 w-full'/>
            </div>

            <div >
                <div className={`flex flex-row items-center gap-2 py-4`}>
                    <Image src={`/images/pfp_cool.jpg`} alt='' width={32} height={32} className={styles.avatar} />
                    <span className={`font-bold opacity-85`}>Mugtaba G</span>
                </div>
                <small >African raised in Asia, a melting pot of cultures and interests with most of them revolving around visual arts, natural sciences and understanding people. Trying to create semi-educational and inspirational content. Usually consuming lots of media (especially animation), practicing web development and graphic design, gaming, and/or hanging out on a discord chat.</small>
                <ul className={styles['about-links']}>
                    <li><a href='https://threads.com/@mugtaba.g'>
                        <Icon icon='ri:threads-fill' />
                    </a></li>
                    <li><a href='https://instagram.com/mugtaba.g'>
                        <Icon icon='ri:instagram-fill' />
                    </a></li>
                    <li><a href='https://instagram.com/oddward.io'>
                        <Icon icon='ri:instagram-fill' />
                    </a></li>
                    <li><a href='https://github.com/Oddward'>
                        <Icon icon='ri:github-fill' />
                    </a></li>
                    <li><a href='https://dribbble.com/oddward'>
                        <Icon icon='ri:dribbble-fill' />
                    </a></li>
                    <li><a href='https://codepen.io/Oddward'>
                        <Icon icon='ri:codepen-fill' />
                    </a></li>
                    <li><a href='https://linkedin.com/in/mugtabagaroot'>
                        <Icon icon='ri:linkedin-box-fill' />
                    </a></li>
                </ul>
            </div>

            </div>

        </article>
      </Layout>
    );
}
