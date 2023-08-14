import React, { useState } from "react";
import { Dialog, DialogContent, DialogActions, TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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

function BookmarkPopup({ onConfirm, onCancel }) {
  const classes = useStyles();
  const [noteText, setNoteText] = useState("");

  const handleCancel = () => {
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm(noteText);
    setNoteText("");
  };

  const handleTextFieldKeyDown = (event) => {
    if (event.key === "Enter") {
      handleConfirm();
    }
  };

  return (
    <Dialog open={true} onClose={handleCancel} maxWidth="md" fullWidth className={classes.dialogDiv}>
      {/* <DialogTitle >Note</DialogTitle> */}
      <DialogContent className={classes.dialogContent}>
        <TextField
          autoFocus
          label="Note"
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
        <Button onClick={handleCancel} className={classes.cancelButton}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} className={classes.confirmButton}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookmarkPopup;
