import Head from 'next/head';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
// import utilStyles from '../../styles/utils.module.css'
import Layout from '../../components/Layout';
import styles from './post.module.css'
import Image from 'next/image';

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
                <div className={`p-0 md:p-4 md:w-1/2`}>
                    <Image src={postData.thumbnail} alt="header image for article" className={styles.cover} width={300} height={200} />
                </div>
                <div className={`flex flex-col  md:p-4`}>
                    <h1 className={``}>{ postData.title }</h1>
                    <p className={styles.subtitle}>{ postData.subtitle }</p>
                    <div className={`flex flex-row items-center gap-2 py-4`}>
                        <Image src={``} alt='' width={32} height={32} className={styles.avatar} />
                        <span className={`font-bold opacity-85`}>Mugtaba G</span>
                    </div>
                    <div>
                        {/* { postData.map( ({ tags }) => (
                            <span>{ tags }</span>
                        )) } */}
                    </div>
                </div>
            </header>
            
            <div className={``}>
                <Date dateString={ postData.date } />
            </div>
            <div className={`${styles.content}`} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
}
