
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react'
import styles from '../styles/home.module.scss'

interface Post{
  id: string,
  title: string,
}

interface HomeProps {
  posts: Post[];
}

export default function Home({posts}: HomeProps) {
  // const [posts, setPosts] = useState<Post[]>([]);

  // useEffect(() =>{
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //     .then(res => res.json())
  //     .then(data => setPosts(data))
  // },[])

  // useEffect(() =>{
  //   fetch('http://localhost:3333/posts').then(response => {
  //     response.json().then(data => {
  //       setPosts(data);
  //     })
  //   })
  // }, [])
  // console.log(posts)
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ) )}
      </ul>
    </>
  )
}

export const getServerSideProps:GetServerSideProps<HomeProps> = async () => {
  // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const response = await fetch('http://localhost:3333/posts');
  const posts = await response.json();

  return { props: { posts } };
}
