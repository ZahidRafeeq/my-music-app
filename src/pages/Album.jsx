import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Spinner } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./Album.css";

const Album = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [songs, setSongs] = useState(location.state?.songs || []);
  const [loading, setLoading] = useState(!location.state?.songs);

  useEffect(() => {
    if (!location.state?.songs) {
      const fetchSongs = async () => {
        try {
          const res = await fetch("/songs.json");
          if (!res.ok) throw new Error("Failed to fetch songs.");
          const data = await res.json();
          setSongs(data);
        } catch (error) {
          console.error(error);
          setSongs([]);
        } finally {
          setLoading(false);
        }
      };
      fetchSongs();
    } else {
      setLoading(false);
    }
  }, [location.state]);

  if (loading) {
    return (
      <Container className="py-5 text-center text-white">
        <Spinner animation="border" variant="light" role="status" />
        <div>Loading songs...</div>
      </Container>
    );
  }

  return (
    <div className="album-page d-flex flex-column min-vh-100">
      <Container fluid className="flex-grow-1">
        <Row>
          {/* Sidebar for all screen sizes */}
          <Col xs={12} md={3} className="sidebar-col mb-3 mb-md-0">
            <Sidebar />
          </Col>

          {/* Main Content */}
          <Col xs={12} md={9} className="main-col d-flex flex-column">
            {/* Header */}
            <div className="album-header mb-4">
              <h1 className="mb-2">
                <span className="text-white fw-bold">All </span>
                <span className="text-pink fw-bold">Songs</span>
              </h1>
              <p className="text-white mb-3">All songs in this album.</p>
            </div>

            {songs.length === 0 ? (
              <p className="text-white">No songs to display.</p>
            ) : (
              <Card className="border-0 bg-dark text-white mb-4 flex-grow-1">
                <Card.Body>
                  {/* Desktop headers */}
                  <Row className="d-none d-md-flex fw-bold border-bottom pb-2 mb-3">
                    <Col md={1}>#</Col>
                    <Col md={7}>Title</Col>
                    <Col md={4}>Artist</Col>
                  </Row>

                  {/* Song List */}
                  {songs.map((song, index) => (
                    <div
                      key={song.id ?? index}
                      className="song-row"
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        navigate(`/music/${song.id}`, {
                          state: { songs, currentIndex: index },
                        })
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          navigate(`/music/${song.id}`, {
                            state: { songs, currentIndex: index },
                          });
                        }
                      }}
                    >
                      <Row className="align-items-start">
                        {/* Rank */}
                        <Col xs={3} md={1} className="song-rank">
                          #{index + 1}
                        </Col>

                        {/* Title + Artist (mobile stacked) */}
                        <Col xs={9} md={7} className="text-truncate">
                          <div className="song-title text-white">
                            {song.songTitle || song.title || "Untitled"}
                          </div>
                          <div className="artist-name d-md-none">
                            {song.artist || "Unknown Artist"}
                          </div>
                        </Col>

                        {/* Artist (desktop only) */}
                        <Col
                          md={4}
                          className="artist-name d-none d-md-block text-truncate"
                        >
                          {song.artist || "Unknown Artist"}
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            )}

            {/* Footer */}
            <Footer />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Album;
