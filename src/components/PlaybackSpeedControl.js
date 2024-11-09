import React, { useState } from 'react';

const PlaybackSpeedControl = ({ audioRef }) => {
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    const handleSpeedChange = (e) => {
        const newSpeed = e.target.value;
        audioRef.current.playbackRate = newSpeed;
        setPlaybackSpeed(newSpeed);
    };

    return (
        <div className="speed-control">
            <label>Playback Speed</label>
            <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={playbackSpeed}
                onChange={handleSpeedChange}
            />
            <span>{playbackSpeed}x</span>
        </div>
    );
};

export default PlaybackSpeedControl;
