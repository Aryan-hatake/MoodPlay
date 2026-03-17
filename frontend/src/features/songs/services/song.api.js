import axios from 'axios';

const API_BASE_URL = 'https://moodplay-service.onrender.com/api/song';


export const fetchSongByMood = async (mood) => {
  const response = await axios.get(`${API_BASE_URL}/getsong`, {
    params: { mood },
  });
  console.log(response.data)
  return response.data.song;
};
export const fetchPlaylistByMood = async (mood) => {
  const response = await axios.get(`${API_BASE_URL}/getplaylist`, {
    params: { mood },
  });
  console.log(response.data)
  return response.data.playlist;
};


export const uploadSong = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/upload`, formData,);
  return response.data;
};


