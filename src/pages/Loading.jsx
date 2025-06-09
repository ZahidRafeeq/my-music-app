import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="melodies-loading d-flex flex-column justify-content-center align-items-center vh-100 bg-black text-white">
      <div className="circle-container position-relative d-flex flex-column align-items-center">
        <div className="spinner-ring position-absolute"></div>
        <div className="brush-circle d-flex flex-column justify-content-center align-items-center position-relative">
          <div className="music-note mb-2">🎵</div>
          <div className="brand-text text-center">
            <h3 className="brand-name m-0">Music By ZR</h3>
            <p className="tagline m-0 mt-1">Free Songs</p>
          </div>
        </div>
        <div className="loading-text mt-4">
          Loading <span className="spinner ms-2">⏳</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;