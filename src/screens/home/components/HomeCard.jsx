import React, { useEffect, useState } from 'react'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import '../styles/HomeCard.css'
import { RWebShare } from 'react-web-share'
import ShareIcon from '@material-ui/icons/Share'
import fetchBookmarks from '../service/fetchBookmark'
import fetchSharedBookmarks from '../service/fetchSharedBookmark'
import fetchVideoDetails from '../../video_player/service/fetchYoutubeData'
import HomeCardLoading from '../components/HomeCardLoading'
import deleteVideo from '../service/deleteVideo'
import { Menu, MenuItem } from '@material-ui/core'
import { DeleteOutlineSharp, MoreVertSharp } from '@material-ui/icons'

const HomeCard = ({ id, url, video, setVideos, time, is_shared }) => {
  const [bookmarks, setBookmarks] = useState([])

  const [videoDetails, setVideoDetails] = useState({
    videoId: '',
    title: '',
    thumbnail: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    console.log("Timeeeeeeeeeeee:", time)
    if (is_shared) {
      fetchSharedBookmarks(id, setBookmarks)
    } else {
      fetchBookmarks(id, setBookmarks)
    }
    fetchVideoDetails(setVideoDetails, url).then(() => setIsLoading(false)) // Step 2: Set loading to false after data fetch
  }, [id, url, is_shared])
  if (isLoading) {
    return <HomeCardLoading />
  }

  return (
    <>
      <div
        className="youtube-data-div"
        onClick={() => {
          if (is_shared) {
            window.location.href =
              `/videos/` + encodeURIComponent(video.url) + '/true'
          } else {
            window.location.href =
              `/videos/` + encodeURIComponent(video.url) + '/false'
          }
        }}
      >
        <img
          className="thumbnail-img"
          src={videoDetails.thumbnail}
          alt="thumbnail"
        />
        <h3 className="video-title">{videoDetails.title}</h3>
      </div>
      <p className='time-para'>{time}</p>
      <div className="api-data-div">
        
        <BookmarkBorderIcon className="bookmark-icon" />
        <p className="bookmark-para">{bookmarks.length}</p>
        <MoreVertSharp className="more-icon" onClick={handleClick} />
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose} // Adjust positioning
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Adjust positioning
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleClose}>
            <p
              onClick={async () => {
                await deleteVideo(id, setVideos, is_shared)
              }}
            >
              {' '}
              <DeleteOutlineSharp className="menu-icons" />
              Delete
            </p>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <RWebShare
              data={{
                text: 'Share your Bookmarks with your Friends',
                url: `https://smartbookmark-backend-urtjok3rza-wl.a.run.app/bookmarkshare/${id}`,
                title: 'WatchWise',
              }}
              onClick={() => console.log('Shared Successfully!')}
            >
              <p>
                <ShareIcon className="menu-icons" />
                Share
              </p>
            </RWebShare>
          </MenuItem>
        </Menu>
        {/* <div>
      {time}
    </div> */}
      </div>
    </>
  )
}

export default HomeCard
