import React, { useState, useRef, useEffect,useCallback } from "react";

import ReactPlayer from "react-player";
import { makeStyles } from "@material-ui/core/styles";
import screenful from "screenfull";
import Controls from "./Controls";
import html2canvas from "html2canvas";
import editBookMark from "../service/editBookMark";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import postBookMarks from "../service/postBookMarks";
import BookmarkPopup from "./BookmarkPopup";

const useStyles = makeStyles(() => ({
  playerWrapper: {
    width: "100%",
    position: "relative",
    paddingTop: "2rem",
    borderRadius: "1rem",
  },
  playerContainer: {
    borderRadius: "1rem",
    width: "100%",
    height: "100%",
  },

  // Dialog Box
  dialogContent: {
    lineHeight: "1", // Set the line height to one line
    position: 'relative',
    width: "40rem",
  },
  cancelButton: {
    color: "#FFF", // Set the button text color to white
    backgroundColor: "rgb(246, 91, 102)", // Set the button background color
    "&:hover": {
      backgroundColor: "rgb(246, 91, 102)", // Remove background color change on hover
    },
  },
  confirmButton: {
    color: "#FFF", // Set the button text color to white
    backgroundColor: "rgb(246, 91, 102)", // Set the button background color
    "&:hover": {
      backgroundColor: "rgb(246, 91, 102) !important", // Remove background color change on hover
    },
  },
  dialogDiv: {
    display: 'flex',
    paddingTop: '35rem',
    paddingLeft: '3rem',
  },
  label: {
    color: "rgb(246, 91, 102)", // Set the label color
    "&.Mui-focused": {
      color: "rgb(246, 91, 102)", // Set the label color when the TextField is focused
    },
  },
  underline: {
    "&:before": {
      borderBottomColor: "rgb(246, 91, 102)", // Set the underline color before the TextField is focused
    },
    "&.Mui-focused:before": {
      borderBottomColor: "rgb(246, 91, 102)", // Set the underline color when the TextField is focused
    },
  },
}));

const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

let count = 0;

function Player({
  bookmarks,
  setBookmarks,
  playerRef,
  controlsRef,
  url,
  videoId,
  videoTitle,
}) {
  const classes = useStyles();
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [state, setState] = useState({
    pip: false,
    playing: true,
    controls: false,
    light: false,

    muted: true,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  });

  const playerContainerRef = useRef(null);
  const {
    playing,
    light,

    muted,
    loop,
    playbackRate,
    pip,
    played,
    volume,
  } = state;

  const [showDialog, setShowDialog] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [selectedBookmarkIndex, setSelectedBookmarkIndex] = useState(null);
  const [id, setId] = useState();
  const handleBookmarkClick = useCallback((existingBookmarkIndex, id) => {
    setSelectedBookmarkIndex(existingBookmarkIndex);
    setNoteText(bookmarks[existingBookmarkIndex].notes);
    setShowDialog(true);
    setId(id);
  }, [bookmarks]);

  const handleSaveNote = () => {
    if (selectedBookmarkIndex !== null) {
      const updatedBookmarks = [...bookmarks];
      updatedBookmarks[selectedBookmarkIndex].note = noteText;
      editBookMark(id, noteText, setBookmarks);
      setBookmarks(updatedBookmarks);
    }
    setShowDialog(false);
  };

  const handleTextFieldKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSaveNote();
    }
  };

  const handleCancelNote = () => {
    setShowDialog(false);
  };

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState) => {
    if (count > 3) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }
    if (controlsRef.current.style.visibility === "visible") {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    console.log({ newValue });
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    console.log({ value: e.target });
    setState({ ...state, seeking: false });
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handleDuration = (duration) => {
    setState({ ...state, duration });
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
  };
  const handleVolumeChange = (e, newValue) => {
    // console.log(newValue);
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const toggleFullScreen = () => {
    screenful.toggle(playerContainerRef.current);
  };

  const handleMouseMove = () => {
    console.log("mousemove");
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = "hidden";
    count = 0;
  };

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === "normal" ? "remaining" : "normal"
    );
  };

  const handlePlaybackRate = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const hanldeMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const [showPopup, setShowPopup] = useState(false);
  const addBookmark = useCallback(async () => {
    setState({ ...state, playing: false });
    const currentTime = playerRef.current.getCurrentTime();
    const existingBookmarkIndex = bookmarks.findIndex(
      (bookmark) => Math.abs(bookmark.timestamp - currentTime) < 61
    );

    if (existingBookmarkIndex !== -1) {
      // Bookmark already exists at this timestamp, open the edit note dialog for the existing bookmark
      handleBookmarkClick(
        existingBookmarkIndex,
        bookmarks[existingBookmarkIndex].id
      );
      return;
    }
    const playerContainer = playerContainerRef.current;

    const canvas = await html2canvas(playerContainer);
    canvas.width = 160;
    canvas.height = 90;
    setShowPopup(true);
  }, [bookmarks, handleBookmarkClick,playerRef]);

  const handlePopupConfirm = (noteText) => {
    setShowPopup(false);
    if (!noteText) {
      console.log("Blank notes");
      return;
    }
    const currentDate = new Date();
    const bookmarkDate = currentDate.toUTCString();
    console.log(bookmarkDate);
    const bookmarksCopy = [...bookmarks];
    bookmarksCopy.push({
      time: playerRef.current.getCurrentTime(),
      display: format(playerRef.current.getCurrentTime()),
      //   image: dataUri,
      note: noteText,
      created_at: bookmarkDate,
    });
    postBookMarks(
      setBookmarks,
      noteText,
      videoId,
      playerRef.current.getCurrentTime(),
      false
    );
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
  };

  const handleKeyDown = useCallback((event) => {
    if (event.ctrlKey && event.key === "b") {
      event.preventDefault();
      addBookmark();
    }
  }, [addBookmark]);
  useEffect(() => {
    // Mount the event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Unmount the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : "00:00";

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
  const elapsedTime =
    timeDisplayFormat === "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={hanldeMouseLeave}
      ref={playerContainerRef}
      className={classes.playerWrapper}
      style={{ width: "100%", height: "55.6rem" }}
    >
      <div
        // ref={playerContainerRef}
        className={classes.playerContainer}
      >
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          url={url}
          playing={playing}
          muted={muted}
          ref={playerRef}
          pip={pip}
          controls={false}
          light={light}
          loop={loop}
          playbackRate={playbackRate}
          volume={volume}
          onProgress={handleProgress}
          config={{
            file: {
              attributes: {
                crossorigin: "anonymous",
              },
            },
          }}
        />
      </div>
      <Controls
        ref={controlsRef}
        onSeek={handleSeekChange}
        onSeekMouseDown={handleSeekMouseDown}
        onSeekMouseUp={handleSeekMouseUp}
        onDuration={handleDuration}
        onRewind={handleRewind}
        onPlayPause={handlePlayPause}
        onFastForward={handleFastForward}
        playing={playing}
        played={played}
        elapsedTime={elapsedTime}
        totalDuration={totalDuration}
        onMute={hanldeMute}
        muted={muted}
        onVolumeChange={handleVolumeChange}
        onVolumeSeekDown={handleVolumeSeekDown}
        onChangeDispayFormat={handleDisplayFormat}
        playbackRate={playbackRate}
        onPlaybackRateChange={handlePlaybackRate}
        onToggleFullScreen={toggleFullScreen}
        volume={volume}
        onBookmark={addBookmark}
        bookmarks={bookmarks}
        duration={duration}
        playerRef={playerRef}
        videoId={videoId}
        videoTitle={videoTitle}
      />
      <Dialog open={showDialog} onClose={handleCancelNote} maxWidth="md" fullWidth className={classes.dialogDiv}>
        {/* <DialogTitle>Edit Note</DialogTitle> */}
        <DialogContent className={classes.dialogContent}>
          <TextField
            autoFocus
            label="Edit Note"
            fullWidth
            multiline
            rows={1}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={handleTextFieldKeyDown}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelNote} className={classes.cancelButton}> 
            Cancel
          </Button>
          <Button onClick={handleSaveNote} className={classes.confirmButton}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {showPopup && (
        <BookmarkPopup
          onConfirm={handlePopupConfirm}
          onCancel={handlePopupCancel}
        />
      )}
    </div>
  );
}

export default Player;
