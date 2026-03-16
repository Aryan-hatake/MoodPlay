import { useContext, useEffect } from "react";
import { SongContext } from "../store/song.context";
import { fetchSongByMood , fetchPlaylistByMood } from "../services/song.api";


export function useSong() {
    
    const context = useContext(SongContext)

    const {
        loading, setLoading,
        currentSong, setCurrentSong,
        playlist, setPlaylist,
        isPlaying, setIsPlaying,
        progress, setProgress,
        currentTime, setCurrentTime,
        duration, setDuration,
        volume, setVolume,
        isFavorite, setIsFavorite,
        currentPlaylistIndex, setCurrentPlaylistIndex,
        audioRef
    } = context

    // Use playlist if available, fallback to single song
    const songs = playlist?.length > 0 ? playlist : currentSong ? [currentSong] : []
    const activeSong = songs[currentPlaylistIndex] || currentSong

    // Update audio source when activeSong changes
    useEffect(() => {
        const audio = audioRef.current
     if (activeSong?.songUrl) {
         audio.src = activeSong.songUrl
         audio.load()
         audio.volume = volume / 100
         // Set currentTime after metadata is loaded
         audio.onloadedmetadata = () => {
          if (currentTime > 0 && currentTime < audio.duration) {
              audio.currentTime = currentTime
          }
         }
     }
    }, [activeSong, currentPlaylistIndex, audioRef])

    // Handle play/pause state
    useEffect(() => {
        const audio = audioRef.current
        if (isPlaying && audio.src) {
            audio.play().catch(err => console.log('Play error:', err))
        } else {
            audio.pause()
        }
    }, [isPlaying, audioRef,volume])

    // Setup audio event listeners - Fix the dependency array
    useEffect(() => {
        const audio = audioRef.current

        const updateTime = () => {
            setCurrentTime(audio.currentTime)
            if (audio.duration && audio.duration > 0) {
                setProgress((audio.currentTime / audio.duration) * 100)
            }
        }

        const updateDuration = () => {
            if (audio.duration && audio.duration > 0) {
                setDuration(audio.duration)
            }
        }

        const handleSongEnd = () => {
            setCurrentPlaylistIndex((prev) => (prev + 1) % Math.max(songs.length, 1))
            setCurrentTime(0)
            setProgress(0)
            setIsPlaying(false)
        }

        audio.addEventListener('timeupdate', updateTime)
        audio.addEventListener('loadedmetadata', updateDuration)
        audio.addEventListener('ended', handleSongEnd)

        return () => {
            audio.removeEventListener('timeupdate', updateTime)
            audio.removeEventListener('loadedmetadata', updateDuration)
            audio.removeEventListener('ended', handleSongEnd)
        }
    }, [songs.length])

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00'
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    const handlePlayPause = () => {
        const audio = audioRef.current
        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        } else {
            audio.play().catch(err => console.log('Play error:', err))
            setIsPlaying(true)
        }
    }

    const handleNext = () => {
        const audio = audioRef.current
        audio.pause()
        setIsPlaying(false)
        setCurrentPlaylistIndex((prev) => (prev + 1) % songs.length)
        setCurrentTime(0)
        setProgress(0)
        setTimeout(() => {
            audio.currentTime = 0
        }, 100)
    }

    const handlePrevious = () => {
        const audio = audioRef.current
        audio.pause()
        setIsPlaying(false)
        setCurrentTime(0)
        setProgress(0)
        setCurrentPlaylistIndex((prev) => (prev - 1 + songs.length) % songs.length)
        setTimeout(() => {
            audio.currentTime = 0
        }, 100)
    }



    const handleVolumeChange = (e) => {
        const audio = audioRef.current
        const newVolume = e.target.value
        setVolume(newVolume)
        audio.volume = newVolume / 100
    }

    const handleSongClick = (index) => {
        const audio = audioRef.current
        audio.pause()
        setIsPlaying(false)
        setCurrentPlaylistIndex(index)
        setCurrentTime(0)
        setProgress(0)
        setTimeout(() => {
            audio.currentTime = 0
        }, 100)
    }

    const handleGetSong = async(mood)=>{
         setLoading(true)
         const song = await fetchSongByMood(mood)
         setCurrentSong(song)
         setLoading(false)
    }

    const handleGetPlaylist = async(mood)=>{
         setLoading(true)
         const playlistData = await fetchPlaylistByMood(mood)
         setPlaylist(playlistData)
         setLoading(false)
    }
    
    return {
        songs,
        activeSong,
        isPlaying,
        setIsPlaying,
        progress,
        setProgress,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        volume,
        setVolume,
        isFavorite,
        setIsFavorite,
        currentPlaylistIndex,
        setCurrentPlaylistIndex,
        currentSong,
        playlist,
        loading,
        formatTime,
        handlePlayPause,
        handleNext,
        handlePrevious,
        handleVolumeChange,
        handleSongClick,
        handleGetSong,
        handleGetPlaylist,
        audioRef
    }
}