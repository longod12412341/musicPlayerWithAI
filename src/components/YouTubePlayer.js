// YouTubePlayer.js

import React, { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ videoId, isPlaying, volume, onPlay, onPause }) => {
    const youtubePlayerRef = useRef(null);

    // Handle play/pause logic
    useEffect(() => {
        const player = youtubePlayerRef.current?.internalPlayer;
        if (player) {
            if (isPlaying) {
                player.playVideo();  // Play video when isPlaying is true
            } else {
                player.pauseVideo();  // Pause video when isPlaying is false
            }
            player.setVolume(volume * 100);  // Ensure volume is applied whenever state changes
        }
    }, [isPlaying, volume]);

    const onYouTubePlay = (event) => {
        youtubePlayerRef.current = event.target;
        event.target.setVolume(volume * 100); // Set volume when player starts
        if (isPlaying) {
            event.target.playVideo(); // Start the video if it's playing
        }
        onPlay(event.target); // Pass player instance to the parent if needed
    };

    return (
        <YouTube
            videoId={videoId}
            opts={{
                height: '0',
                width: '0',
                playerVars: { autoplay: isPlaying ? 1 : 0, controls: 0 }
            }}
            onPlay={onYouTubePlay}
            ref={youtubePlayerRef}
        />
    );
};

export default YouTubePlayer;

