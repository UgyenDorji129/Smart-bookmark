import React, { useEffect, useState } from 'react'
import HomeCard from './HomeCard'
import fetchSharedVideos from '../service/fetchSharedVideos'
import HomeLoadingState from '../components/HomeLoadingState'
import NoVideos from './NoVideos'
import '../styles/AllContent.css'
import fetchRecentWatches from '../service/fetchRecentWatches'

const SharedBookmarks = () => {
  const [sharedVideos, setSharedVideos] = useState([])
  const [recentWatchVideos, setRecentWatchVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentWatches(setRecentWatchVideos)
    fetchSharedVideos(setSharedVideos)
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
      <h1 className='segment-header'>Shared Bookmarks</h1>
      <div className='diff-content-div'>
        {sharedVideos.length === 0 ? (<NoVideos />) : ( sharedVideos.map((video, index) => (
          <div key={index} className="video-card-div">
            <HomeCard id={video.id} url={video.url} video={video} setVideos={setSharedVideos} 
            time={recentWatchVideos[index]?.last_viewed}
            is_shared={true}
            />
          </div>))
        )}
      </div>
      </div>
    </>
  )
}

export default SharedBookmarks
