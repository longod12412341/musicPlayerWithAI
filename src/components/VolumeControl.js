//VolumenControl.js
import React from 'react';
import './VolumeControl.css';

const VolumeControl = ({ volume, onVolumeChange }) => {
  return (
      <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
      />
  );
};

export default VolumeControl;
