import React from 'react'
import BookIcon from '@material-ui/icons/Book'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  actualNotes: {
    marginTop: "1rem",
    overflow: 'auto',
  }
}));
const AiBookmarkItem = ({
  bookmark,
  index,
  playerRef,
  controlsRef,
  handleBookmarkClick,
  handleDeleteBookmark,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const classes = useStyles();
  const handleClose = () => {
    setAnchorEl(null)
  }
  const format = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };
  return (
    <div key={index} style={{ marginTop: '1rem', marginLeft: "0.1rem",borderRadius:"8px" ,border: "0.25px solid #B3B3B3", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.05)", padding:"16px 20.5px", display: "inline-flex", alignItems:"flex-start", gap:"64px"}}>
      <div style = {{backgroundColor: "#fff", border: "none", fontFamily: "Open Sans", color: "#454545", fontStyle: "normal", fontWeight: "700", lineHeight: "normal"}}
        className="notes-div"
        onClick={() => {
          playerRef.current.seekTo(format(bookmark.timestamp))
          controlsRef.current.style.visibility = 'visible'

          setTimeout(() => {
            controlsRef.current.style.visibility = 'hidden'
          }, 1000)
        }}
      >
        <div className="timestamps-div">
          <h3 className="timestamps-h3">{bookmark.timestamp}</h3>
        </div>
        <div className={classes.actualNotes}>
          <p style={{fontWeight: "400"}}>{bookmark.note}</p>
        </div>
      </div>
    </div>
  )
}

export default AiBookmarkItem
