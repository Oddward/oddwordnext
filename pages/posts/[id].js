import Head from 'next/head';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css'
import Layout from '../../components/layout';
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
            <header className={`flex flex-col md:flex-row flex-nowrap md:p-4 md:shadow-md md: md:rounded-md`}>
                <div className={`p-0 md:p-4 md:w-1/2`}>
                    <Image src={postData.thumbnail} alt="header image for article" className={styles.cover} width={300} height={200} />
                </div>
                <div className={`flex flex-col `}>
                    <h1 className={utilStyles.headingXl}>{ postData.title }</h1>
                    <p>{ postData.subtitle }</p>
                    <div>
                        {/* { postData.map( ({ tags }) => (
                            <span>{ tags }</span>
                        )) } */}
                    </div>
                </div>
            </header>
            
            <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
}
