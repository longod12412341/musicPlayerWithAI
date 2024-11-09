import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ setSongs }) {
    const [query, setQuery] = useState('');

    const searchSongs = async () => {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    maxResults: 10,
                    q: query,
                    type: 'video',
                    key: process.env.REACT_APP_YOUTUBE_API_KEY,
                },
            });
            const songs = response.data.items.map((item) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.default.url,
            }));
            setSongs(songs);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchSongs();
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input 
                type="text" 
                placeholder="Search for songs..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;
