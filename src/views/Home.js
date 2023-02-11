import './Home.css';

import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import AddPost from '../components/AddPost';
import FollowRecommendations from '../components/FollowRecommendations';

const Home =(props)  => {

    const [posts,setPosts] = useState([])

    const getLatestPosts = () => {
        axios.post("https://akademia108.pl/api/social-app/post/latest").then((req)=>{
            setPosts(req.data);

        });

    }


    const getNextPosts = () => {
        axios.post("https://akademia108.pl/api/social-app/post/older-then",{
            date: posts[0].created_at
        }).then((res)=>{
            setPosts(res.data.concat(posts));

        });

    }

    const getPrevPosts = () => {
        axios.post("https://akademia108.pl/api/social-app/post/newer-then",{
            date: posts[posts.length -1.].created_at
        }).then((res)=>{
            props.getPrevPosts();
            setPosts(posts.concat(res.data));

        });

    }


    useEffect(()=>{
        getLatestPosts();
    },[props.user]);
    return (
        <div className="home">
            {props.user && <AddPost  getPrevPosts ={getPrevPosts}/>}
            {props.user && <FollowRecommendations user={props.user} getLatestPosts={getLatestPosts} posts={posts}/>}
            <div className="postList">
                {
                    posts.map ((post)=>{
                        return <Post post={post} key={post.id} user={props.user} setPosts={setPosts} getLatestPosts={getLatestPosts}/>
                    })
                }
                <button className='btn loadMore' onClick={getNextPosts}>Load more</button>
            </div>
        </div>
    )
}

export default Home;