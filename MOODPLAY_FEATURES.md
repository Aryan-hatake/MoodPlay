# MoodPlay - Face Detection & Music Player Integration

## 🎭 Overview

This document outlines the new features added to MoodPlay:
- **Protected Face Detection UI** - AI-powered mood detection with beautiful UI
- **Intelligent Music Player** - Plays mood-based songs with full player controls
- **Authentication System** - Only authenticated users can access mood detection

## ✨ Features

### 1. **Face Detection Page** (`/mood-detection`)
- Real-time facial emotion recognition using MediaPipe
- Detects 5 moods: Happy, Angry, Sad, Surprised, Neutral
- Beautiful glassmorphic UI with animations
- Live detection status indicator
- Responsive design for all screen sizes

**Mood Detection Logic:**
- **Happy** - Smile score > 0.8
- **Angry** - Brow down > 1 AND (eye squint > 0.6 OR mouth press > 0.6)
- **Sad** - Frown > 0.02 AND frown > 0.2
- **Surprised** - Jaw open > 0.06
- **Neutral** - Default/no emotion detected

### 2. **Music Player Component**
- **Features:**
  - Display album poster fetched from database
  - Play/pause controls
  - Full progress bar with time display
  - ⏪ 5-second backward skip
  - ⏩ 5-second forward skip
  - Volume control with percentage display
  - Mood badge display
  - Responsive and touch-friendly design
  - Smooth animations and transitions

- **Styling:**
  - Gradient backgrounds (purple to pink)
  - Glassmorphic card design
  - Hover effects and animations
  - Mobile-optimized controls

### 3. **Protected Routes**
- Authentication check before accessing mood detection
- Automatic redirect to login if not authenticated
- Loading state during authentication verification

## 🗂️ Project Structure

```
frontend/src/
├── features/
│   ├── FaceExpression/
│   │   ├── components/
│   │   │   └── MusicPlayer.jsx
│   │   ├── pages/
│   │   │   ├── FaceDetection.jsx (original)
│   │   │   └── FaceDetectionPage.jsx (new)
│   │   ├── services/
│   │   │   └── song.api.js
│   │   ├── styles/
│   │   │   ├── FaceDetection.css
│   │   │   └── MusicPlayer.css
│   │   └── utils/
│   │       └── utils.js
│   └── auth/
│       ├── components/
│       │   └── ProtectedRoute.jsx (new)
│       └── ...
├── app.routes.jsx (updated)
└── ...
```

## 🚀 Usage

### Accessing the Mood Detection Page

1. **Login/Register** - Navigate to `/login` or `/register`
2. **Go to Mood Detection** - Navigate to `/mood-detection`
3. **Start Detection** - Click the "🎬 Start Detection" button
4. **Allow Camera Access** - Grant camera permissions in your browser
5. **Position Your Face** - Center your face in the detection circle
6. **Automatic Music** - Once mood is detected, a matching song will play automatically

### Music Player Controls

| Control | Description |
|---------|------------|
| ⏸️ Play/Pause | Start or pause the song |
| ⏪ -5s | Skip backward 5 seconds |
| ⏩ +5s | Skip forward 5 seconds |
| 🔊 Volume Slider | Adjust volume (0-100%) |
| Progress Bar | Click to seek to specific position |

## 📋 API Endpoints Required

The backend should implement the following endpoint:

```javascript
GET /api/songs?mood=Happy
```

**Expected Response:**
```json
{
  "song": {
    "_id": "...",
    "songTitle": "Happy Song Name",
    "songUrl": "https://cdn.example.com/song.mp3",
    "posterUrl": "https://cdn.example.com/poster.jpg",
    "mood": "Happy"
  }
}
```

## 🎨 Styling Features

### Color Scheme
- **Primary Gradient:** Purple (#667eea) to Pink (#764ba2)
- **Secondary Gradient:** Pink (#f093fb) to Red (#f5576c)
- **Background:** Dark navy (#0f172a to #1e293b)
- **Text:** Light colors for contrast

### Animations
- `fadeIn` - Smooth entrance animations
- `bounce` - Mood emoji bouncing effect
- `pulse` - Status indicator pulsing
- `float` - Background elements floating
- `slideIn` - Page and card entrance animations

## 🔐 Security Features

1. **Protected Route** - Authentication required for `/mood-detection`
2. **Loading States** - Proper loading indicators during model initialization
3. **Error Handling** - Graceful error messages for camera and API failures
4. **Token Management** - Auth token sent with API requests

## 📱 Responsive Design

- **Desktop** (>1024px) - Two-column layout with side-by-side detection and player
- **Tablet** (768px - 1024px) - Single column with adjusted sizing
- **Mobile** (<768px) - Full vertical layout with optimized controls

## 🔧 Environment Configuration

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### Camera Not Working
- Check browser permissions
- Ensure HTTPS (required by browsers for camera access)
- Try a different browser
- Restart the browser

### Songs Not Loading
- Verify backend API is running
- Check network tab in browser DevTools
- Ensure songs exist in database for the detected mood
- Check console for API errors

### Face Detection Not Working
- Ensure good lighting
- Position face clearly in the circle
- Check MediaPipe model is loading
- Clear browser cache if models not updating

## 📚 Component API

### MusicPlayer Props

```javascript
<MusicPlayer
  songData={{
    _id: "string",
    songTitle: "string",
    songUrl: "string",
    posterUrl: "string",
    mood: "string"
  }}
/>
```

### ProtectedRoute Props

```javascript
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

## 🎯 Future Enhancements

- [ ] Queue and playlist management
- [ ] Song recommendations based on multiple mood detections
- [ ] User mood history tracking
- [ ] Sharing mood playlists with friends
- [ ] Offline mode with cached songs
- [ ] Advanced audio controls (equalizer, bass boost)
- [ ] Lyrics display integration
- [ ] Social sharing features

## 📝 Notes

- Face detection runs continuously after starting
- Songs are selected randomly from the mood category
- Volume persists during the session
- Back button stops detection automatically
- Closing the page stops the camera stream
