import React, { useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PlusIcon from "../assets/svgs/PlusIcon.svg";
import './NewReleaseSongs.css';

const NewReleaseSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch('/newreleasesongs.json');
        if (!res.ok) throw new Error('Failed to fetch songs.');
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

  const handleViewAll = useCallback(() => {
    navigate('/albums', { state: { songs } });
  }, [navigate, songs]);

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

  const fallbackImage = "/imgs/default.png";
  const displayedMobileSongs = songs.slice(0, 2);
  const displayedTabletSongs = songs.slice(0, 3);
  const displayedDesktopSongs = songs.slice(0, 5);

  return (
    <Container fluid className="new-release-songs">
      {/* Mobile + Tablet Heading */}
      <div className="d-flex justify-content-between align-items-center mb-3 d-md-none">
        <h6 className="mb-0 text-white">New Release <span className="text-pink">Songs</span></h6>
        <span className="view-all-text-only" onClick={handleViewAll}>View All</span>
      </div>

      {/* Desktop Heading */}
      <h2 className="d-none d-md-block mb-4">New Release <span className="text-pink">Songs</span></h2>

      {/* Mobile view */}
      <div className="d-flex d-sm-none w-100 justify-content-between no-scroll">
        {displayedMobileSongs.map((song, i) => (
          <div key={song.id} className="song-card-wrapper">
            <Link to={`/music/${song.id}`} state={{ songs, currentIndex: i }} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card className="song-card h-100">
                <Card.Img variant="top" src={song.image || fallbackImage} className="card-image" onError={(e) => { e.target.src = fallbackImage; }} />
                <Card.Body className="card-body-dark text-white text-center">
                  <Card.Title className="song-title mb-1">{song.title || 'No Title'}</Card.Title>
                  <Card.Subtitle className="artist-name text-muted">{song.artist || 'Unknown Artist'}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </div>

      {/* Tablet view */}
      <Row className="g-3 d-none d-sm-flex d-md-none">
        {displayedTabletSongs.map((song, i) => (
          <Col key={song.id} sm={4}>
            <Link to={`/music/${song.id}`} state={{ songs, currentIndex: i }} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card className="song-card h-100">
                <Card.Img variant="top" src={song.image || fallbackImage} className="card-image" onError={(e) => { e.target.src = fallbackImage; }} />
                <Card.Body className="card-body-dark text-white text-center">
                  <Card.Title className="song-title mb-1">{song.title || 'No Title'}</Card.Title>
                  <Card.Subtitle className="artist-name text-muted">{song.artist || 'Unknown Artist'}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Desktop view */}
      <Row className="g-3 d-none d-md-flex">
        {displayedDesktopSongs.map((song, i) => (
          <Col key={song.id} md={2}>
            <Link to={`/music/${song.id}`} state={{ songs, currentIndex: i }} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card className="song-card h-100">
                <Card.Img variant="top" src={song.image || fallbackImage} className="card-image" onError={(e) => { e.target.src = fallbackImage; }} />
                <Card.Body className="card-body-dark text-white text-center">
                  <Card.Title className="song-title mb-1">{song.title || 'No Title'}</Card.Title>
                  <Card.Subtitle className="artist-name text-muted">{song.artist || 'Unknown Artist'}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
        {/* View All Button */}
        <Col md={2} className="d-flex flex-column align-items-center justify-content-center" style={{ cursor: 'pointer' }} onClick={handleViewAll}>
          <div className="view-all-wrapper text-center">
            <div className="plus-circle">
              <img src={PlusIcon} alt="Plus" className="plus-icon" />
            </div>
            <div className="view-all-text">View All</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NewReleaseSongs;
