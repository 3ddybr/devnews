import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

import SEO from '../../components/SEO';
import styles from './post.module.scss';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <SEO title="Post" />

      <main className={styles.container}>
        <article className={styles.post}>
        <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asText(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 12, // 12 horas
  };
};



//primeira parte

// import { GetStaticPaths, GetStaticProps } from 'next';
// import {useRouter} from 'next/router';

// interface Comment {
//   id: string;
//   body: string;
// }

// interface CommentsProps{
//   comments: Comment[];
// }

// export default function Post ({comments}:CommentsProps){
//   const router = useRouter();

//   if (router.isFallback){
//     return <div>Loading...</div>
//   }

//   return (
//     <>
    
//     <h1>Post {router.query.id}</h1>
//     <ul>
//       {comments.map(comment =>(
//         <li key={comment.id}>{comment.body}</li>
//       ))}
//     </ul>
//     </>
//   )
// }

// export const getStaticPaths: GetStaticPaths = async() => {
//   //se nao for chamado o paths e passado o return o paths = [] so vai geral a page quando tiver o primeiro acesso 
//   //isso e usado para quando tem muitas page pra gerar e o build nao ficar enorme.

//   const response = await fetch('http://localhost:3333/posts');
//   const posts = await response.json();
  
//   const paths = posts.map(post => ({
//     params: { id: String(post.id) },
//   }));

//   return{ 
//     paths,
//     fallback: true,
//   };
// }

// export const getStaticProps: GetStaticProps<CommentsProps> = async context => {
//   const{id} = context.params;
//   // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const response = await fetch(`http://localhost:3333/comments?postId=${id}`);	
//   const comments = await response.json();
//   return {
//     props: {
//       comments,
//     },
//     revalidate: 5,
//   }
// }
