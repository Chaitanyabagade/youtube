import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import {API_KEY1} from '../../../src/data'
import {API_KEY} from '../../../src/data'
import moment from 'moment'
import { useParams } from 'react-router'
const PlayVideo = () => {
  const {videoId} =useParams();
 
   const [apiData,setApiData]=useState(null);
   const [channelData,setChannelData]=useState(null);
   const [commentData,setCommentData]=useState([])
   const fetchVideoData= async () =>{
          const VideoDetail_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY1}`
          await fetch(VideoDetail_url).then(res=>res.json()).then(data=>setApiData(data.items[0]))
   }
   useEffect(()=>{
      fetchVideoData();
   },[videoId])

   const fetchOhterData= async ()=>{
      //fetching channel data:-
      const channelData_url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY1}`
      await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]))

      //fetching comments data
      const commnetData_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY1}`
      await fetch(commnetData_url).then(res=>res.json()).then(data=>setCommentData(data.items))
   }
   
   useEffect(()=>{
       fetchOhterData();
   },[apiData])


   function covert(value){
    if(value>=1000000){
        return (value/1000000)+"M"
     }
     else if(value>=1000){
        return Math.floor(value/1000)+"K"
     }
     else{
        return value;
     }
}
  return (
 
    <div className='play-video'>
       <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
       <h3>{apiData?apiData.snippet.title:"Title Here.."}</h3>
       <div className='play-video-info'>
          <p>Views {covert(apiData?apiData.statistics.viewCount:"View..")} &bull;{apiData?covert(moment(apiData.snippet.publishedAt).fromNow()):"a"}  day ago</p>
          <div className='rightside' >
              <span><img src={like}/>{covert(apiData?apiData.statistics.likeCount:"View..")}</span>
              <span><img src={dislike}/></span>
              <span><img src={share}/>Share</span>
              <span><img src={save}/>Save</span>
          </div>
         
        </div>
        <hr></hr>

        <div>
          <div className='publisher'>
              <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt=""/>
              <div>
                <p>{apiData?apiData.snippet.channelTitle:"chaitanya bagade"}</p>
                <span>{channelData?covert(channelData.statistics.subscriberCount):""} Subscribers</span>
              </div>
              <button >Subscribe</button>
          </div>
         <div className='vid-description'>
              <p>{apiData?apiData.snippet.description:"Description Here"}</p>
          <hr/>
            <h4>{apiData?covert(apiData.statistics.commentCount):0} Comments</h4>
          

          {commentData.map((item,index)=>{
              return (
                <div key={index} className='comment'>
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt=""/>
          
            <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 Day ago</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className='comment-action'>
                    <img src={like}alt=""/>
                    <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                    <img src={dislike}alt=""/>
                </div>
            </div>
            </div>
              )
          })}  
            
        
           

         </div>
       </div>
    </div>
  )
}

export default PlayVideo