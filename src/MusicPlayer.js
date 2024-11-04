import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';
import { FaPlay, FaPause, FaStop, FaBackward, FaForward, FaRandom, FaSync } from 'react-icons/fa';
import song1 from './assets/song1.mp3';
import song2 from './assets/song2.mp3';
import song3 from './assets/song3.mp3';

const initialTracks = [
    { title: 'Song 1', src: song1 },
    { title: 'Song 2', src: song2 },
    { title: 'Song 3', src: song3 },
];

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [trackIndex, setTrackIndex] = useState(0);
    const [tracks, setTracks] = useState(initialTracks);
    const [isLooping, setIsLooping] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const audioElement = audioRef.current;

        if (isPlaying) {
            audioElement.play().catch(error => {
                console.error("Error playing audio:", error);
            });
        } else {
            audioElement.pause();
        }

        const updateTime = () => {
            setCurrentTime(audioElement.currentTime);
        };

        const handleEnded = () => {
            if (isLooping) {
                audioElement.currentTime = 0; // Reset time if looping
                audioElement.play(); // Play again
            } else {
                handleNext(); // Move to the next track
            }
        };

        audioElement.addEventListener('timeupdate', updateTime);
        audioElement.addEventListener('ended', handleEnded);

        return () => {
            audioElement.removeEventListener('timeupdate', updateTime);
            audioElement.removeEventListener('ended', handleEnded);
        };
    }, [isPlaying, trackIndex, isLooping]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleStop = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        audioRef.current.currentTime = 0; // Reset audio
    };

    const handleNext = () => {
        setTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
        setIsPlaying(true); // Automatically play the next song
    };

    const handlePrevious = () => {
        setTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
        setIsPlaying(true); // Automatically play the previous song
    };

    const handleRandomize = () => {
        const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);
        setTracks(shuffledTracks);
        setTrackIndex(0); // Reset to first track after randomizing
        setIsPlaying(true); // Start playing immediately
    };

    const toggleLoop = () => {
        setIsLooping(prev => !prev);
    };

    return (
        <div className="music-player">
            <h2>{tracks[trackIndex].title}</h2>
            <audio ref={audioRef} src={tracks[trackIndex].src}></audio>
            <div className="controls">
                <FaBackward onClick={handlePrevious} />
                {isPlaying ? (
                    <FaPause onClick={handlePlayPause} />
                ) : (
                    <FaPlay onClick={handlePlayPause} />
                )}
                <FaStop onClick={handleStop} />
                <FaForward onClick={handleNext} />
                <FaRandom onClick={handleRandomize} />
                <FaSync onClick={toggleLoop} style={{ color: isLooping ? 'blue' : 'inherit' }} />
            </div>
            <div className="progress">
                <input
                    type="range"
                    min="0"
                    max={audioRef.current ? audioRef.current.duration : 0}
                    value={currentTime}
                    onChange={(e) => {
                        const newTime = e.target.value;
                        setCurrentTime(newTime);
                        audioRef.current.currentTime = newTime;
                    }}
                />
                <div className="progress-bar" style={{ width: `${(currentTime / (audioRef.current ? audioRef.current.duration : 1)) * 100}%` }} />
                <span>{Math.floor(currentTime)}s / {Math.floor(audioRef.current ? audioRef.current.duration : 0)}s</span>
            </div>
        </div>
    );
};

export default MusicPlayer;
