import React from 'react';
import { useSong } from '../../hooks/useSong';
import '../styles/MoodMusicPlayer.css';

export default function MoodMusicPlayer() {
  const {
    activeSong,
    isPlaying,
    progress,
    currentTime,
    duration,
    volume,
    isFavorite,
    currentPlaylistIndex,
    songs,
    loading,
    formatTime,
    handlePlayPause,
    handleNext,
    handlePrevious,
    setVolume,
    handleSongClick,
    setIsFavorite,
    audioRef,
    setCurrentTime,
    setProgress,
    setIsPlaying
  } = useSong()

  
    const handleProgressChange = (e) => {
        const audio = audioRef.current
        if (audio.duration) {
            const newTime = (e.target.value / 100) * audio.duration
            audio.currentTime = newTime
            setCurrentTime(newTime)
            setProgress(e.target.value)
        }
    }

    const handleVolumeChange = (e) => {
        const audio = audioRef.current
        const newVolume = e.target.value
        setVolume(newVolume)
        audio.volume = newVolume / 100
    }
  
  if (loading) {
    return (
      <div className="mood-player-empty">
        <p>🎵 Loading your mood playlist...</p>
      </div>
    );
  }

  if (!activeSong) {
    return (
      <div className="mood-player-empty">
        <p>No songs available for your mood</p>
      </div>
    );
  }

  return (
    <div className="mood-music-player">
      {/* Audio Element */}
      <audio ref={audioRef} crossOrigin="anonymous" />

      {/* Main Player */}
      <div className="player-container">
        {/* Left Section - Album Art */}
        <div className="player-left">
          <div className="album-artwork">
            <div className="album-glow"></div>
            <img
              src={activeSong.posterUrl}
              alt={activeSong.songTitle}
              className={`album-image ${isPlaying ? 'playing' : ''}`}
            />
            <div className={`vinyl-ring ${isPlaying ? 'spinning' : ''}`}></div>
          </div>
        </div>

        {/* Center Section - Info & Controls */}
        <div className="player-center">
          {/* Song Info */}
          <div className="song-details">
            <h2 className="song-title">{activeSong.songTitle}</h2>
            <p className="song-artist">
              {activeSong.mood} • {activeSong._id?.substring(0, 8)}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="progress-section">
            <span className="time-label">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="progress-slider"
            />
            <span className="time-label">{formatTime(duration)}</span>
          </div>

          {/* Main Controls */}
          <div className="controls-main">
            <button
              className={`control-btn favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => setIsFavorite(!isFavorite)}
              title="Add to Favorites"
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>

            <button
              className="control-btn"
              onClick={handlePrevious}
              title="Previous"
            >
              ⏮️
            </button>

            <button
              className={`control-btn play-btn ${isPlaying ? 'playing' : ''}`}
              onClick={handlePlayPause}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>

            <button
              className="control-btn"
              onClick={handleNext}
              title="Next"
            >
              ⏭️
            </button>

            <button className="control-btn shuffle-btn" title="Shuffle">
              🔀
            </button>
          </div>

          {/* Volume Control */}
          <div className="volume-section">
            <span className="volume-icon">🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <span className="volume-value">{volume}</span>
          </div>
        </div>

        {/* Right Section - Playlist */}
        <div className="player-right">
          <div className="playlist-header">
            <h3>Queue</h3>
            <span className="song-count">{songs.length} songs</span>
          </div>

          <div className="playlist-container">
            {songs.map((song, index) => (
              <div
                key={song._id}
                className={`playlist-item ${
                  index === currentPlaylistIndex ? 'active' : ''
                }`}
                onClick={() => handleSongClick(index)}
              >
                <div className="playlist-number">
                  {index === currentPlaylistIndex && isPlaying ? (
                    <span className="playing-indicator">🎵</span>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                <img
                  src={song.posterUrl}
                  alt={song.songTitle}
                  className="playlist-thumbnail"
                />

                <div className="playlist-info">
                  <p className="playlist-title">{song.songTitle}</p>
                  <p className="playlist-mood">{song.mood}</p>
                </div>

                <a
                  href={song.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="song-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  🔗
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}