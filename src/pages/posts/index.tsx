import { GetStaticProps } from "next";
import Link from "next/link";
import SEO from "../../components/SEO";

import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';

import Prismic from '@prismicio/client'
import {RichText} from 'prismic-dom'
import { getPrismicClient } from "../../services/prismic";

import styles from './posts.module.scss';

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {  
  return (    
    <>
      <SEO title="Posts"/>
      <main className={styles.container}>
          <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
          </div>
        </main>
    </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
  // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  // const response = await fetch('http://localhost:3333/posts');
  // const posts = await response.json();
  const prismic = getPrismicClient();
  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'post'),
  ], {
    fetch: ['post.title', 'post.content'],
  });

  // console.log(response);
  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find(content => content.type === 'paragraph')?.text ??
        '',
      updatedAt: format(
        new Date(post.last_publication_date),
        "dd 'de' MMMM 'de' yyyy",
        {locale: ptBR},
      ),
    };
  });
  return {
    props: {
      posts,
    },
    revalidate: 60*60*12 // 12 horas,
  }
}
