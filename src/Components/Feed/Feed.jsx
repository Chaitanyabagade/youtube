import React, { useEffect, useState } from 'react'
import './Feed.css'
import thumbnail1 from '../../assets/thumbnail1.png'

import {API_KEY1} from '../../data'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Feed = ({category}) => {

 const [data,setData]=useState([]);

 const fetchData = async()=>{
    const videList_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY1}`
    await fetch(videList_url).then(response=>response.json()).then(data=>setData(data.items))
 }
useEffect(()=>{
     fetchData();
},[category])
function covert(value){
    if(value>=1000000){
        return Math.floor(value/1000000)+"M"
     }
     else if(value>=1000){
        return Math.floor(value/1000)+"K"
     }
     else{
        return value;
     }
}
  return(
    <div className='feed'>
        {data.map((item,index)=>{
         return(
            <Link to={`video/0/${item.id}`} className='card'>
             <img src={item.snippet.thumbnails.medium.url} alt=""/>
             <h2>{item.snippet.title}</h2>
             <h3>{item.snippet.channelTitle}</h3>
             <p>{covert(item.statistics.viewCount)} &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
         </Link>
         )
    })}
   
          
    </div>
 )
}

export default Feed