import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import BookIcon from '@material-ui/icons/Book'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  actualNotes: {
    marginTop: '1rem',
    overflow: 'auto',
  },
}))
const BookmarkItem = ({
  bookmark,
  index,
  playerRef,
  controlsRef,
  handleBookmarkClick,
  handleDeleteBookmark,
  format,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const classes = useStyles()
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div key={index} style={{ marginTop: '1rem', marginLeft: "0.1rem",borderRadius:"8px" ,border: "0.25px solid #B3B3B3", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.05)", padding:"16px 20.5px", display: "inline-flex", alignItems:"flex-start", gap:"64px"}}>
      <div
        style = {{backgroundColor: "#fff", border: "none", fontFamily: "Open Sans", color: "#454545", fontStyle: "normal", fontWeight: "700", lineHeight: "normal", width: "12rem"}}
        className="notes-div"
        onClick={() => {
          playerRef.current.seekTo(bookmark.timestamp)
          controlsRef.current.style.visibility = 'visible'

          setTimeout(() => {
            controlsRef.current.style.visibility = 'hidden'
          }, 1000)
        }}
      >
        <div className="timestamps-div">
          <h3 className="timestamps-h3">{format(bookmark.timestamp)}</h3>
        </div>
        <div className={classes.actualNotes}>
          <p style={{fontWeight: "400"}}>{bookmark.notes}</p>
        </div>
      </div>
      <div style={{position: "relative", left: "0.5rem", top: "0.2rem"}} className="edit-delete-div">
          <MoreHorizIcon onClick={handleClick} />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <div
                onClick={() => handleBookmarkClick(index, bookmark.id)}
                className="edit-notes-div"
              >
                <h5>Edit Notes</h5>
              </div>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <div className="delete-notes">
                <div
                  className="edit-notes-div"
                  onClick={() => handleDeleteBookmark(index, bookmark.id)}
                >
                  <h5>Delete Notes</h5>
                </div>
              </div>
            </MenuItem>
          </Menu>
        </div>
    </div>
  )
}

export default BookmarkItem
