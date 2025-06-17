Name : Zahid Rafeeq
Roll No : F23BDOCS1M01183
Section : 2M
Project : Music Streaming App



# My Music Streaming App

A full-featured music streaming web application built using React, Bootstrap 5, and JSON. Songs and media are locally stored, and the application provides dynamic music playback, artist-based filtering, and a responsive user interface.

---

## Tech Stack

* **Frontend:** React (with Vite)
* **Styling:** Bootstrap 5 + Custom CSS
* **Backend:** None (local JSON files used for data)
* **Routing:** React Router
* **Audio Playback:** WaveSurfer.js
* **Media:** Locally stored in folders (e.g., `public/songs`, `public/images`)

---

## Folder Structure

```
my-music-app/
├── public/
│   ├── songs/
│   └── images/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── db/
│   ├── trending.json
│   ├── weeklytop.json
│   └── newrelease.json
└── README.md
```

---

## Key Features

* Browse songs by categories: Trending, Weekly Top, and New Releases
* View popular artists and their dedicated pages
* Waveform-based audio player with interactive controls
* Responsive design for mobile, tablet, and desktop
* Protected routes based on login/auth state
* Songs and images loaded dynamically from local files

---

## How to Run the Project

### 1. Frontend Setup (React)

```bash
npm install
npm run dev
```

### 2. Access App

```
Frontend: http://localhost:5173/
```

Make sure your `songs/` and `images/` are properly placed in the `public/` directory.

---

## Example JSON Format

### newrelease.json

```json
[
  {
    "id": 1,
    "title": "Song Title",
    "artist": "Artist Name",
    "cover": "/images/song-cover.jpg",
    "audio": "/songs/song.mp3"
  }
]
```

---

## Future Improvements

* Add playlists and user favorites
* Integrate backend for full CRUD operations
* Add search, filter, and sort features
* Upload media through a form (admin panel)
* Host app and media on a public server

---

## Notes

* Use `.gitignore` to exclude `songs/` and `images/` folders from GitHub
* Compress media files for faster load time
* Keep JSON files clean and properly formatted

---

## Author

**Zahid Rafeeq**
[Facebook - Z Develops](https://facebook.com/zdevelops)
