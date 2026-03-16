import { createContext, useState, useRef } from "react";

export const SongContext = createContext()

export function SongProvider({children}) {
    
    const [loading, setLoading] = useState(false)
    const [currentSong, setCurrentSong] = useState(null)
    const [playlist, setPlaylist] = useState(null)
    
    // Player state
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(70)
    const [isFavorite, setIsFavorite] = useState(false)
    const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0)
    
    // Audio ref
    const audioRef = useRef(new Audio())
    
    return(
        <SongContext.Provider value={{
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
        }}>
            {children}
        </SongContext.Provider>
    )
}