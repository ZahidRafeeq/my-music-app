import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PlusIcon from "../assets/svgs/PlusIcon.svg";
import './WeeklyTopSongs.css';

const WeeklyTopSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch('/weeklytopsongs.json');
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

  const maxSongsToShow = 5;

  return (
    <Container fluid className="weekly-top-songs">
      <div className="d-flex justify-content-between align-items-center mb-3 d-md-none">
        <h6 className="mb-0">Weekly Top <span className="text-pink">Songs</span></h6>
        <span
          className="view-all-text-only"
          onClick={() => navigate('/albums', { state: { songs } })}
          style={{ cursor: 'pointer' }}
        >
          View All
        </span>
      </div>

      <h2 className="d-none d-md-block mb-4">Weekly Top <span className="text-pink">Songs</span></h2>

      <Row className="g-4">
        {songs.slice(0, maxSongsToShow).map((song, index) => (
          <Col
            key={song.id}
            xs={index < 3 ? 4 : 'auto'}
            sm={index < 4 ? 3 : 'auto'}
            md={2}
            className={`
              ${index >= 3 ? 'd-none d-sm-block' : ''}
              ${index >= 4 ? 'd-none d-md-block' : ''}
            `}
          >
            <Link
              to={`/music/${song.id}`}
              state={{ songs, currentIndex: index }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card className="song-card h-100">
                <Card.Img variant="top" src={song.image} className="card-image" />
                <Card.Body className="card-body-dark text-white text-center">
                  <Card.Title className="song-title mb-1">{song.songTitle}</Card.Title>
                  <Card.Subtitle className="artist-name text-muted">{song.artist}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}

        {/* View All Button for Large Screens */}
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={2}
          className="d-none d-lg-flex flex-column align-items-center justify-content-center"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/albums', { state: { songs } })}
        >
          <div className="text-center view-all-wrapper">
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

export default WeeklyTopSongs;
