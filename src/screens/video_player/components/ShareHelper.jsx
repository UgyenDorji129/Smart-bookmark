import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import postSharedVideo from '../service/postSharedVideo';

export const ShareHelper = () => {
    const {video_id} = useParams();
    const [videoUrl, setVideoUrl] = useState(null);
    useEffect(() => {
        postSharedVideo(video_id).then(resp => {
            setVideoUrl(resp)
        });
      }, [video_id]);

    useEffect(() => {
    }, [setVideoUrl])
    
    if(videoUrl !== null) {
        window.location.href = `/videos/${encodeURIComponent(videoUrl)}/true`
    } 

  return (
    <div className="redirect-div" >
      <div class="loader">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <div class="bar4"></div>
        <div class="bar5"></div>
        <div class="bar6"></div>
        <div class="bar7"></div>
        <div class="bar8"></div>
        <div class="bar9"></div>
        <div class="bar10"></div>
        <div class="bar11"></div>
        <div class="bar12"></div>
      </div>
    </div>
  )
}