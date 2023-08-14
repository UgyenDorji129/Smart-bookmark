import React, { useEffect, useState } from 'react'
import HomeCard from './HomeCard'
import fetchYoutubeVideos from '../service/fetchYoutubeVideos'
import HomeLoadingState from '../components/HomeLoadingState'
import NoVideos from './NoVideos'
import '../styles/AllContent.css'
import fetchRecentWatches from '../service/fetchRecentWatches'

const YoutubeContent = () => {
  const [youtubeVideos, setYoutubeVideos] = useState([])
  const [recentWatchVideos, setRecentWatchVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentWatches(setRecentWatchVideos)
    fetchYoutubeVideos(setYoutubeVideos)
      .then(async () => setLoading(false))
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [])

  if(loading) {
    return (<HomeLoadingState />)
  }
  return (
    <>
      <div className='main-content-div'>
      <h1 className='segment-header'>Youtube Videos</h1>
      <div className='diff-content-div'>
        {youtubeVideos.length === 0 ? (<NoVideos />) : ( youtubeVideos.map((video, index) => (
          <div key={index} className="video-card-div">
            <HomeCard id={video.id} url={video.url} video={video} setVideos={setYoutubeVideos} 
            time={recentWatchVideos[index]?.last_viewed}
            is_shared={false}
            />
          </div>))
        )}
      </div>
      </div>
    </>
  )
}

export default YoutubeContent
