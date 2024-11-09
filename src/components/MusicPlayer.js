// MusicPlayer.js

import React, { useState, useEffect } from 'react';
import './MusicPlayer.css';
import VolumeControl from './VolumeControl';
import { FaPlay, FaPause, FaBackward, FaForward, FaRandom, FaSync, FaExpand, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import YouTubePlayer from './YouTubePlayer';  // Import the YouTubePlayer component

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);  // Play/Pause toggle
    const [trackIndex, setTrackIndex] = useState(0);
    const [volume, setVolume] = useState(1);  // Volume ranges from 0 to 1
    const [isLooping, setIsLooping] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Handle play/pause button click
    const handlePlayPause = () => {
        setIsPlaying((prevState) => !prevState);  // Toggle play/pause
    };

    // Next song
    const handleNext = () => {
        if (tracks.length > 1) {
            setTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
            setIsPlaying(true);  // Auto-play next song
        }
    };

    // Previous song
    const handlePrevious = () => {
        if (tracks.length > 1) {
            setTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
            setIsPlaying(true);  // Auto-play previous song
        }
    };

    // Add track to playlist
    const handleAddToPlaylist = (video) => {
        const newTrack = {
            title: video.snippet.title,
            artist: video.snippet.channelTitle,
            src: video.id.videoId,
            isYouTube: true,
        };
        setTracks((prevTracks) => [...prevTracks, newTrack]);
    };

    // Search handler for YouTube API
    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                params: {
                    part: 'snippet',
                    q: searchQuery,
                    type: 'video',
                    maxResults: 3,
                    key: 'AIzaSyDhOPPldEbOs0DxTFc02HAL9cL7hA8j8Ms',  // Replace with your YouTube API key
                },
            });
            setSearchResults(response.data.items);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    // Delete track from playlist
    const handleDeleteTrack = (index) => {
        setTracks((prevTracks) => {
            const newTracks = prevTracks.filter((_, i) => i !== index);
            if (index === trackIndex) {
                setTrackIndex(0);  // Reset to first track
                setIsPlaying(false);  // Stop playback if current track is deleted
            } else if (index < trackIndex) {
                setTrackIndex(trackIndex - 1);  // Adjust track index if before current track
            }
            return newTracks;
        });
    };

    return (
        <div className="app">
            <Sidebar />
            <div className="content">
                <Header 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                    handleSearch={handleSearch} 
                />
                <div>
                    <h2>{tracks[trackIndex]?.title || 'No Song Selected'}</h2>
                    <p>{tracks[trackIndex]?.artist || 'Unknown Artist'}</p>
                </div>
                
                {/* Use YouTubePlayer component here */}
                {tracks[trackIndex]?.isYouTube && (
                    <YouTubePlayer
                        videoId={tracks[trackIndex].src}
                        isPlaying={isPlaying}
                        volume={volume}
                        onPlay={() => {}}
                        onPause={() => {}}
                    />
                )}
                
                <div className="controls">
                    <FaRandom onClick={() => setTracks((prevTracks) => prevTracks.sort(() => Math.random() - 0.5))} />
                    <FaBackward onClick={handlePrevious} />
                    {isPlaying ? <FaPause onClick={handlePlayPause} /> : <FaPlay onClick={handlePlayPause} />}
                    <FaForward onClick={handleNext} />
                    <FaSync onClick={() => setIsLooping(!isLooping)} style={{ color: isLooping ? 'blue' : 'inherit' }} />
                    <FaExpand />
                </div>
                <VolumeControl volume={volume} onVolumeChange={(newVolume) => setVolume(newVolume)} />
                <SongList tracks={tracks} trackIndex={trackIndex} handleDeleteTrack={handleDeleteTrack} />
                <SearchResults results={searchResults} handleAddToPlaylist={handleAddToPlaylist} />
            </div>
        </div>
    );
};

const Sidebar = () => (
    <div className="sidebar">
        <h2>Your Library</h2>
        <button>Create Playlist</button>
        <button>Explore Podcasts</button>
    </div>
);

const Header = ({ searchQuery, setSearchQuery, handleSearch }) => (
    <div className="header">
        <input 
            type="text" 
            placeholder="What do you want to play?" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button onClick={handleSearch}>Search</button>
        <button>Log In</button>
    </div>
);

const SongList = ({ tracks, trackIndex, handleDeleteTrack }) => (
    <div className="song-list">
        <h3>Song List</h3>
        <ul>
            {tracks.map((track, index) => (
                <li key={index} className={index === trackIndex ? 'active' : ''}>
                    {track.title} - {track.artist}
                    <FaTrash onClick={() => handleDeleteTrack(index)} />
                </li>
            ))}
        </ul>
    </div>
);

const SearchResults = ({ results, handleAddToPlaylist }) => (
    <div className="search-results">
        <h3>Search Results</h3>
        <ul>
            {results.map((result) => (
                <li key={result.id.videoId}>
                    {result.snippet.title} - {result.snippet.channelTitle}
                    <button onClick={() => handleAddToPlaylist(result)}>Add to Playlist</button>
                </li>
            ))}
        </ul>
    </div>
);

export default MusicPlayer;
