import Image from 'next/image'

import SEO from "../components/SEO";
import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <>
      <SEO title="Home"  excludeTitleSuffix/>
      
      <main className={styles.content}>
        <section className={styles.section}>
          <span>Olá Dev!</span>
          <h1>
            Bem Vindo(a) ao <br/>
            <span>Dev</span> News!
          </h1>
          <p>
            Um blog com conteúdos extremamente <br />
            <span>relevantes para o seu aprendizado.</span>
          </p>
        </section>
        <Image 
          src="/home.svg" 
          alt="Home image" 
          width={400}
          height={400}
          />
      </main>
    </>
  );
}


//primeira parte 


// import { GetServerSideProps } from 'next';
// import { useEffect, useState } from 'react'
// import SEO from '../components/SEO';
// import styles from '../styles/home.module.scss'

// interface Post{
//   id: string,
//   title: string,
// }

// interface HomeProps {
//   posts: Post[];
// }

// export default function Home({posts}: HomeProps) {
//   // const [posts, setPosts] = useState<Post[]>([]);

//   // useEffect(() =>{
//   //   fetch('https://jsonplaceholder.typicode.com/posts')
//   //     .then(res => res.json())
//   //     .then(data => setPosts(data))
//   // },[])

//   // useEffect(() =>{
//   //   fetch('http://localhost:3333/posts').then(response => {
//   //     response.json().then(data => {
//   //       setPosts(data);
//   //     })
//   //   })
//   // }, [])
//   // console.log(posts)
//   return (
//     <>
//       <SEO title='Home' />
//       <h1>Posts</h1>
//       <ul>
//         {posts.map(post => (
//           <li key={post.id}>{post.title}</li>
//         ) )}
//       </ul>
//     </>
//   )
// }

// export const getServerSideProps:GetServerSideProps<HomeProps> = async () => {
//   // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const response = await fetch('http://localhost:3333/posts');
//   const posts = await response.json();

//   return { props: { posts } };
// }

