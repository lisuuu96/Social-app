import './Post.css';
import axios from 'axios';
import React, { useState } from "react";

const Post = (props) =>{

    const[likesCount,setLikesCount] = useState(props.post.likes.lenght)

    const[deleteModalVisible,setDeleteModalVisible]= useState(false);

    const[doesUserliked,setDoesUserLiked]= useState(props.post.likes.filter(like=>like.username === props.user?.username).lenght !== 0);

    const deletePost = (id) => {
        axios.post('https://akademia108.pl/api/social-app/post/delete',{
        post_id: id
    }).then(res=>{
        props.setPosts((posts)=>{
            return posts.filter(post=>post.id !== res.data.post_id);
        })

    });

    };
    const unfollow = (id) => {
        axios.post('https://akademia108.pl/api/social-app/follows/disfollow',{
            leader_id:id,
        })
        .then(()=>{
            props.getLatestPosts();
        } )
    }

    const likePost= (id,isliked) => {
        axios.post('https://akademia108.pl/api/social-app/post/'+ (isliked ?'dislike' :'like'),{
            post_id:id
        }).then(()=>{
            setLikesCount(likesCount + (isliked? -1:1))
            setDoesUserLiked(!isliked)
        })
    }

    return (
        <div className="post"> 
            <div className="avatar">
                <img src={props.post.user.avatar_url} alt={props.post.user.username} />
            </div>
            <div className="postData">
                <div className="postMeta">
                    <div className="author">{props.post.user.username}</div>
                    <div className="data">{props.post.created_at.substring(0,10)}</div>
                </div>
                <div className="postContent">{props.post.content}</div>
                <div className="likes">
                    {props.user?.username === props.post.user.username && <button className='btn' onClick={()=>setDeleteModalVisible(true)}>Delete</button>}

                    {props.user && props.user.username !== props.post.user.username &&  (<button className='btn' onClick={()=>unfollow(props.post.user.id)}>Unfollow</button>)}
                    
                    {props.user &&<button className='btn' onClick={()=>likePost(props.post.id, doesUserliked)}>{doesUserliked?'Dislike':'Like'}</button>}
                    {likesCount}</div>
            </div>


      {deleteModalVisible &&(  
      <div className="deleteconfirmation">
            <h3>Are you sure you want to delete post?</h3>
            <button className='btn yes' onClick={()=>deletePost(props.post.id)}>Yes</button>
            <button className='btn no' onClick={()=>setDeleteModalVisible(false)}>No</button>
        </div>)}
         </div>
    )
}
export default Post;