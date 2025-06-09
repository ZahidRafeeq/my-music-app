import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";

import PlayIcon from "../assets/svgs/play.svg";
import PauseIcon from "../assets/svgs/pause.svg";
import NextIcon from "../assets/svgs/next.svg";
import PrevIcon from "../assets/svgs/previous.svg";
import VolumeIcon from "../assets/svgs/volume.svg";

import "./Music.css";

const Music = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const initialSongs = useMemo(() => location.state?.songs || [], [location.state]);
  const initialIndex = useMemo(() => (location.state?.currentIndex != null ? location.state.currentIndex : 0), [location.state]);

  const [songs, setSongs] = useState(initialSongs);
  const [index, setIndex] = useState(initialSongs.length ? initialIndex : 0);
  const song = songs[index] || null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [desiredVolume, setDesiredVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  const waveformRef = useRef();
  const wsRef = useRef();
  const desiredVolumeRef = useRef(desiredVolume);
  const mutedRef = useRef(muted);

  useEffect(() => {
    desiredVolumeRef.current = desiredVolume;
  }, [desiredVolume]);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    if (!initialSongs.length && id) {
      fetch("/songs.json")
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => {
          setSongs(data);
          const foundIndex = data.findIndex((s) => String(s.id) === id);
          setIndex(foundIndex >= 0 ? foundIndex : 0);
        })
        .catch(() => setSongs([]));
    }
  }, [initialSongs, id]);

  useEffect(() => {
    if (!song?.songUrl || !waveformRef.current) return;

    wsRef.current?.destroy();
    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#bbb",
      progressColor: "#ff4da6",
      cursorColor: "#fff",
      backend: "MediaElement",
      barWidth: 2,
      barGap: 1,
      barRadius: 30,
      splitChannels: false,
      height: 60,
      responsive: true,
      cursorWidth: 1,
      autoCenter: true,
      scrollParent: true,
      minPxPerSec: 30,
    });

    ws.load(song.songUrl);

    ws.on("ready", () => {
      setDuration(ws.getDuration());
      setCurrentTime(0);
      const vol = mutedRef.current ? 0 : desiredVolumeRef.current;
      ws.setVolume(vol);

      ws.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          ws.setVolume(0);
          ws.play()
            .then(() => {
              setIsPlaying(true);
              setTimeout(() => {
                if (!mutedRef.current) {
                  ws.setVolume(desiredVolumeRef.current);
                }
              }, 100);
            })
            .catch(() => setIsPlaying(false));
        });
    });

    ws.on("audioprocess", () => setCurrentTime(ws.getCurrentTime()));
    ws.on("finish", () => {
      setCurrentTime(0);
      setIndex((prevIndex) => (prevIndex + 1) % songs.length);
      setIsPlaying(true);
    });

    wsRef.current = ws;
    return () => ws.destroy();
  }, [song, songs.length]);

  useEffect(() => {
    const ws = wsRef.current;
    if (!ws) return;

    if (isPlaying && !ws.isPlaying()) {
      ws.play().catch(() => setIsPlaying(false));
    } else if (!isPlaying && ws.isPlaying()) {
      ws.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.setVolume(muted ? 0 : desiredVolume);
    }
  }, [muted, desiredVolume]);

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const prevSong = () => {
    if (!songs.length) return;
    setIndex((i) => (i - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };
  const nextSong = () => {
    if (!songs.length) return;
    setIndex((i) => (i + 1) % songs.length);
    setIsPlaying(true);
  };
  const seekTo = (e) => {
    const t = parseFloat(e.target.value);
    wsRef.current.seekTo(t / duration);
    setCurrentTime(t);
  };
  const changeVolume = (e) => {
    const v = parseFloat(e.target.value);
    setDesiredVolume(v);
    if (muted && v > 0) setMuted(false);
  };
  const toggleMute = () => {
    setMuted((m) => !m);
    if (muted && desiredVolume === 0) {
      setDesiredVolume(1);
    }
  };
  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${r < 10 ? "0" : ""}${r}`;
  };

  if (!song?.songUrl) {
    return (
      <div className="text-center p-5">
        <h2 className="gradient-text">Music</h2>
        <p className="gradient-text">No valid song selected.</p>
        <button className="btn btn-outline-light gradient-text" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="music-page" style={{ backgroundImage: `url(${song.image || "/imgs/default.png"})` }}>
      <div className="overlay" />
      <div className="container-fluid px-3 px-sm-4 px-md-5 py-4 content">
        <h2 className="text-center mb-4 gradient-text">Now Playing</h2>
        <div className="row justify-content-center mb-4">
          <div className="col-10 col-sm-8 col-md-6 col-lg-4 text-center">
            <img src={song.image || "/imgs/default.png"} alt={song.songTitle} className="song-image mb-3 img-fluid" />
            <h4 className="mt-2">{song.songTitle}</h4>
            <p className="text-light">{song.artist}</p>
          </div>
        </div>
        <div className="row justify-content-center mb-3">
          <div className="col-12 col-sm-8 col-md-6 waveform-wrapper">
            <div ref={waveformRef} className="waveform w-100" />
          </div>
        </div>
        <div className="row justify-content-center mb-2">
          <div className="col-12 col-sm-8 col-md-6">
            <input
              type="range"
              className="form-range seekbar"
              min="0"
              max={duration}
              step="0.01"
              value={currentTime}
              onChange={seekTo}
            />
          </div>
        </div>
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-sm-8 col-md-6 d-flex justify-content-between time-labels">
            <span className="elapsed">{fmt(currentTime)}</span>
            <span className="remaining">-{fmt(duration - currentTime)}</span>
          </div>
        </div>
        <div className="row justify-content-center mb-4">
          <div className="col-auto d-flex justify-content-center align-items-center gap-3">
            <button onClick={prevSong} className="control-btn" aria-label="Previous" type="button">
              <img src={PrevIcon} alt="Previous" width={24} />
            </button>
            <button onClick={togglePlay} className="control-btn" aria-label={isPlaying ? "Pause" : "Play"} type="button">
              <img src={isPlaying ? PauseIcon : PlayIcon} alt="Play/Pause" width={28} />
            </button>
            <button onClick={nextSong} className="control-btn" aria-label="Next" type="button">
              <img src={NextIcon} alt="Next" width={24} />
            </button>
            <div className="volume-container">
              <button className={`volume-btn ${muted ? "muted" : "unmuted"}`} onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} type="button">
                <img src={VolumeIcon} alt="Volume" width={20} />
              </button>
              <div className="volume-popup">
                <input type="range" min="0" max="1" step="0.01" value={muted ? 0 : desiredVolume} onChange={changeVolume} className="volume-slider-horizontal" />
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            <button className="btn gradient-btn btn-outline-light" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
