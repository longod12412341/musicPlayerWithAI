import React from 'react';

const Equalizer = ({ audioRef }) => {
    const applyPreset = (preset) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const track = audioContext.createMediaElementSource(audioRef.current);

        const bassBoost = audioContext.createBiquadFilter();
        bassBoost.type = "lowshelf";
        bassBoost.frequency.setValueAtTime(500, audioContext.currentTime);

        const trebleBoost = audioContext.createBiquadFilter();
        trebleBoost.type = "highshelf";
        trebleBoost.frequency.setValueAtTime(3000, audioContext.currentTime);

        track.connect(bassBoost).connect(trebleBoost).connect(audioContext.destination);

        if (preset === "bass") {
            bassBoost.gain.setValueAtTime(10, audioContext.currentTime);
            trebleBoost.gain.setValueAtTime(0, audioContext.currentTime);
        } else if (preset === "treble") {
            bassBoost.gain.setValueAtTime(0, audioContext.currentTime);
            trebleBoost.gain.setValueAtTime(10, audioContext.currentTime);
        } else {
            bassBoost.gain.setValueAtTime(0, audioContext.currentTime);
            trebleBoost.gain.setValueAtTime(0, audioContext.currentTime);
        }
    };

    return (
        <div className="equalizer">
            <button onClick={() => applyPreset("bass")}>Bass Boost</button>
            <button onClick={() => applyPreset("treble")}>Treble Boost</button>
            <button onClick={() => applyPreset("none")}>Normal</button>
        </div>
    );
};

export default Equalizer;
