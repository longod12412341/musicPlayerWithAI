// ProgressBar.js
import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentTime, duration, onSeek }) => (
  <div className="progress-bar">
    <input
      type="range"
      min="0"
      max={duration}
      value={currentTime}
      onChange={(e) => onSeek(e.target.value)}
    />
    <div className="time">
      {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / 
      {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
    </div>
  </div>
);

export default ProgressBar;
