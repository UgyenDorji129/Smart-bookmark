import React from 'react';
import { Typography } from '@material-ui/core';
import '../styles/Timestamp.css';

export const TimeStamp = ({time}) => {

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

  return (
    <div className="time-stamp">
      <Typography variant="caption" style={{ color: '#ffffff' , fontSize: '1rem', fontWeight: '800'}}>
        {format(time)}
      </Typography>
    </div>
  );
};
