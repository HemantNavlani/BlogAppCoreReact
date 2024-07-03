import React, { useEffect, useState } from 'react'
import dataService from '../appwrite/config';
import { Container, PostCard } from '../components';

function AllPosts() {
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        dataService.getPosts([]).then((posts)=>{
            if(posts) setPosts(posts.documents)
        })
    },[])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts && posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post}/>
                    </div>
                ))}
                {
                    posts.length===0 &&(   <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            No Posts Yet
                        </h1>
                    </div>)
                }
            </div>
        </Container>
    </div>
  )
}

export default AllPosts