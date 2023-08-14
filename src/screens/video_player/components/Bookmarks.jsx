import React, { useState, useMemo } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { Button, Dialog,DialogContent,DialogActions,TextField,FormControl,InputLabel, Select} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import editBookMark from "../service/editBookMark";
import deleteBookmark from "../service/deleteBookMark";
import "../styles/Bookmarks.css";
import BookmarkItem from "./BookmarkItem";
const useStyles = makeStyles((theme) => ({
  inputLabel: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "rgb(246, 91, 102)",
  },
  formControl: {
    backgroundColor: "white",
    position: "sticky",
    top: "2rem",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(246, 91, 102)", // Set the outline border color
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(246, 91, 102)", // Set the outline border color on hover
    },
    "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(246, 91, 102)", // Set the outline border color when focused
    },
  },
  label: {
    color: "rgb(246, 91, 102)", // Set the label color
    "&.Mui-focused": {
      color: "rgb(246, 91, 102)", // Set the label color when the TextField is focused
    },
    fontSize: "1.1rem",
    fontWeight: "bold",
  },

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

  underline: {
    "&:before": {
      borderBottomColor: "rgb(246, 91, 102)", // Set the underline color before the TextField is focused
    },
    "&.Mui-focused:before": {
      borderBottomColor: "rgb(246, 91, 102)", // Set the underline color when the TextField is focused
    },
  },
}));

function Bookmarks({
  bookmarks,
  setBookmarks,
  playerRef,
  controlsRef,
  videoId,
}) {
  const classes = useStyles();
  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [editedIndex, setEditedIndex] = useState(-1);
  const [noteText, setNoteText] = useState("");
  const [selectedDate, setSelectedDate] = useState("All Dates"); // State to hold the selected date

  const extractDateFromCreatedAt = (created_at) => {
    const date = new Date(created_at);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // Get abbreviated month name
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Create an array of unique dates from the bookmarks list for dropdown options
  const dropdownOptions = useMemo(() => {
    const uniqueDates = [
      ...new Set(
        bookmarks.map((bookmark) =>
          extractDateFromCreatedAt(bookmark.created_at)
        )
      ),
    ];
    return uniqueDates;
  }, [bookmarks]);

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
  // Function to handle changes in the date dropdown
  const handleDateChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDate(selectedValue);
  };


  const filteredBookmarks = useMemo(() => {
    if (selectedDate === "All Dates") {
      return bookmarks;
    } else {
      return bookmarks.filter(
        (bookmark) =>
          extractDateFromCreatedAt(bookmark.created_at) === selectedDate
      );
    }
  }, [bookmarks, selectedDate]);

  const handleBookmarkClick = (index, id) => {
    setEditedIndex(index);
    setNoteText(bookmarks[index].notes);
    setShowPopup(true);
    setId(id);
  };

  const handleCancelNote = () => {
    setShowPopup(false);
  };

  const handleSaveNote = () => {
    if (editedIndex !== -1) {
      const bookmarksCopy = [...bookmarks];
      bookmarksCopy[editedIndex].note = noteText;
      editBookMark(id, noteText, setBookmarks);
      setBookmarks(bookmarksCopy);
    }
    setShowPopup(false);
  };

  const handleDeleteBookmark = (index, id) => {
    const bookmarksCopy = [...bookmarks];
    bookmarksCopy.splice(index, 1);
    setId(id);
    deleteBookmark(id, setBookmarks);
    // setBookmarks(bookmarksCopy);
  };

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const handleTextFieldKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSaveNote();
    }
  };  

  return (
    <div className="bookmark-main-div">
      <div className="spacer-div"></div>
      <FormControl fullWidth variant="outlined" className={classes.formControl}>
        <InputLabel id="date-dropdown-label" className={classes.label}>
          Select Date
        </InputLabel>
        <Select
          labelId="date-dropdown-label"
          id="date-dropdown"
          value={selectedDate}
          onChange={handleDateChange}
          label="Select Date"
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
        >
          <MenuItem value={"All Dates"}>All Dates</MenuItem>
          {dropdownOptions.map((date) => (
            <MenuItem key={date} value={date}>
              {date}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="main-grid-div">
        {filteredBookmarks.map((bookmark, index) => (
          <BookmarkItem
            key={index}
            bookmark={bookmark}
            index={index}
            playerRef={playerRef}
            controlsRef={controlsRef}
            handleBookmarkClick={handleBookmarkClick}
            handleDeleteBookmark={handleDeleteBookmark}
            format={format}
          />
        ))}
      </div>
      <Dialog open={showPopup} onClose={handleCancelNote} maxWidth="sm" fullWidth className={classes.dialogDiv}>
      {/* <DialogTitle >Edit Note</DialogTitle> */}
      <DialogContent className={classes.dialogContent}>
        <TextField
          autoFocus
          label="Edit Note"
          fullWidth
          multiline
          rows={1} // Set the rows to 1 to allow only one line
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          InputLabelProps={{
            classes: {
              root: classes.label,
              focused: "Mui-focused", // You can customize this class name if needed
            },
          }}
          InputProps={{
            classes: {
              underline: classes.underline,
            },
          }}
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
    </div>
  );
}

export default Bookmarks;
