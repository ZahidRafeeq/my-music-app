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
        <Row className="flex-nowrap">
          <Col md={3} className="d-none d-md-block sidebar-col">
            <Sidebar />
          </Col>
          <Col xs={12} md={9} className="main-col d-flex flex-column">
            {/* Album Header */}
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
                  <Row className="d-none d-md-flex fw-bold border-bottom pb-2 mb-3">
                    <Col md={1}>#</Col>
                    <Col md={7}>Title</Col>
                    <Col md={4}>Artist</Col>
                  </Row>
                  {songs.map((song, index) => (
                    <div
                      key={song.id ?? index}
                      className="song-row py-3 border-bottom border-secondary"
                      style={{ cursor: "pointer" }}
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        navigate(`/music/${song.id}`, {
                          state: {
                            songs,
                            currentIndex: index
                          },
                        })
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          navigate(`/music/${song.id}`, {
                            state: {
                              songs,
                              currentIndex: index,
                            },
                          });
                        }
                      }}
                    >
                      <Row className="align-items-center">
                        <Col xs={2} md={1} className="text-muted">
                          #{index + 1}
                        </Col>
                        <Col xs={10} md={7} className="text-white text-truncate">
                          {song.songTitle || song.title || "Untitled"}
                        </Col>
                        <Col
                          xs={12}
                          md={4}
                          className="text-muted mt-1 mt-md-0 text-truncate"
                        >
                          {song.artist || "Unknown Artist"}
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            )}
            <Footer />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Album;
