import React from 'react';

function SongList({ songs, setCurrentSong }) {
    return (
        <div className="song-list">
            {songs.map((song) => (
                <div key={song.id} className="song-item" onClick={() => setCurrentSong(song)}>
                    <img src={song.thumbnail} alt={song.title} />
                    <p>{song.title}</p>
                </div>
            ))}
        </div>
    );
}

export default SongList;
