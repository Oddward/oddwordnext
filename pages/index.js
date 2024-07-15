import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import PostCard from '../components/post-card';
import Image from 'next/image';
import PageLink from '../components/PageLink';
import SectionHeading from '../components/section-heading';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section id="hero" className="flex flex-wrap md:flex-nowrap content-center justify-around gap-6 py-8 px-8">
          <div className="w-[70%] h-auto lg:w-1/2 max-w-56 md:max-w-60">
              <Image src="/images/pfp_crop_nobg.png" alt="Oddward silhouette hero portrait" className="aspect-auto w-full h-auto border-l border-b border-slate-300 rounded-bl-[1.5rem] md:rounded-bl-[2rem] lg:rounded-bl-[2.5rem]" width={300} height={300} />
          </div>
  
          <article className="flex flex-col justify-center gap-4 w-full uxl:w-3/4 m-4">
              <header className="relative my-6">
                  <span>Welcome to the</span>
                  <h1 className="text-orange-gradient relative">Oddword garden</h1>
              </header>
              <p className="text-xl lg:text-2xl uxl:text-3xl">Hello, friend. In this digital garden of ideas and things we will discuss personal development, software development, design, art, and where those threads intersect.</p>
          </article>
      </section>

      <div class="flex flex-col gap-4 my-4">
          <div class="bg-slate-500 h-[2px] w-1/2 mr-auto"></div>
          <div class="bg-slate-500 h-[2px] w-1/2 mx-auto"></div>
          <div class="bg-slate-500 h-[2px] w-1/2 ml-auto"></div>
      </div>
      <section id="articles" className={`relative py-8 px-8 uxl:my-8`}>
        <SectionHeading children="Articles" />
        <ul className={`flex justify-center gap-x-4 flex-wrap 2xl:max-w-[900px]`}>
          {allPostsData.map(({ id, date, title, description, thumbnail }) => (
            <li className={`flex w-full justify-center xl:w-auto`} key={id}>
              <PostCard href={`/posts/${id}`} title={title} desc={description} src={thumbnail} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
