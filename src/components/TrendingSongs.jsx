import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./TrendingSongs.css";
import DefaultCover from "../assets/imgs/C1.png";

const TrendingSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch('/trendingsongs.json');
        if (!res.ok) throw new Error("Failed to fetch songs.");
        const data = await res.json();
        setSongs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center text-white">
        <Spinner animation="border" variant="light" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center text-white">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  const displayedSongs = songs.slice(0, 10);

  const handleViewAll = () => {
    navigate('/albums', { state: { songs } });
  };

  const handleSongClick = (index) => {
    navigate(`/music/${songs[index].id}`, {
      state: { songs, currentIndex: index },
    });
  };

  return (
    <Container className="trending-songs">
      <h2>
        Trending <span className="text-pink">Songs</span>
      </h2>

      <Row className="header-row mb-3 px-3">
        <Col xs={2}>Rank</Col>
        <Col xs={10}>Title / Artist</Col>
      </Row>

      {displayedSongs.map((song, index) => (
        <Card
          key={song.id || index}
          className="mb-3 song-card d-flex flex-row align-items-center"
          style={{ cursor: "pointer" }}
          onClick={() => handleSongClick(index)}
        >
          <div className="rank-col d-flex align-items-center justify-content-center">
            <span className="rank">{`#${index + 1}`}</span>
          </div>

          <Card.Body className="flex-grow-1 px-3">
            <Row className="align-items-center">
              <Col xs={12} sm={8} className="d-flex align-items-center">
                {/* Image hidden on xs */}
                <img
                  src={song.image || DefaultCover}
                  onError={(e) => { e.target.src = DefaultCover; }}
                  alt="song cover"
                  className="song-img me-3 d-none d-sm-block"
                />
                <div>
                  <div className="song-title">{song.title || song.songTitle}</div>
                  <div className="song-artist">{song.artist}</div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      <div className="view-all text-center mt-3">
        <button className="btn btn-link text-pink" onClick={handleViewAll}>
          View All
        </button>
      </div>
    </Container>
  );
};

export default TrendingSongs;
