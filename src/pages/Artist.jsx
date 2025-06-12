/// <reference types="vite/client" />
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Card, Row, Col, Spinner } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import defaultArtistImage from "../assets/imgs/C1.png";
import "./Artist.css";

const artistImageModules = import.meta.glob(
  "../assets/artists/*.{png,jpg,jpeg,svg}",
  { eager: true, import: "default" }
);

const getArtistImage = (id) => {
  const exts = ["png", "jpg", "jpeg", "svg"];
  for (const ext of exts) {
    const key = `../assets/artists/${id}.${ext}`;
    if (artistImageModules[key]) {
      return artistImageModules[key];
    }
  }
  return defaultArtistImage;
};

const Artist = () => {
  const { artistId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(location.state?.artist || null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [nrRes, wtRes, trRes] = await Promise.all([
          fetch("/newreleasesongs.json"),
          fetch("/weeklytopsongs.json"),
          fetch("/trendingsongs.json"),
        ]);
        if (!nrRes.ok || !wtRes.ok || !trRes.ok) {
          throw new Error("Fetch error");
        }

        const [newReleases, weeklyTops, trendings] = await Promise.all([
          nrRes.json(),
          wtRes.json(),
          trRes.json(),
        ]);

        const all = [...newReleases, ...weeklyTops, ...trendings];

        if (!location.state?.artist) {
          const sample = all.find(
            (s) =>
              s.artist.toLowerCase().replace(/\s+/g, "-") === artistId
          );
          if (sample) {
            setArtist({
              id: artistId,
              name: sample.artist,
              image: getArtistImage(artistId),
            });
          }
        }

        setSongs(
          all.filter(
            (s) =>
              s.artist.toLowerCase().replace(/\s+/g, "-") === artistId
          )
        );
      } catch (error) {
        console.error("Error fetching artist data:", error);
        setArtist(null);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [artistId, location.state]);

  if (loading) {
    return (
      <Container className="py-5 text-center text-white">
        <Spinner animation="border" variant="light" />
        <div>Loading artist...</div>
      </Container>
    );
  }

  if (!artist) {
    return (
      <Container className="py-5 text-center text-white">
        <div>Artist not found</div>
      </Container>
    );
  }

  return (
    <div className="artist-page d-flex flex-column min-vh-100">
      <Container fluid className="flex-grow-1">
        <Row>
          {/* Sidebar for all screen sizes */}
          <Col xs={12} md={3} className="sidebar-col mb-3 mb-md-0">
            <Sidebar />
          </Col>

          {/* Main Content */}
          <Col xs={12} md={9} className="main-col d-flex flex-column">
            {/* Artist Banner Section */}
            <div
              className="artist-banner text-white text-center d-flex flex-column justify-content-center align-items-center"
              style={{
                backgroundImage: `url(${artist.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "300px",
                position: "relative",
              }}
            >
              <div className="artist-overlay" />
              <div className="z-1 position-relative">
                <h1 className="text-gradient fw-bold">{artist.name}</h1>
                <p>{songs.length} {songs.length === 1 ? "song" : "songs"}</p>
              </div>
            </div>

            {/* Songs List */}
            {songs.length === 0 ? (
              <p className="text-white mt-4">No songs to display.</p>
            ) : (
              <Card className="border-0 bg-dark text-white my-4 flex-grow-1">
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
                        <Col xs={3} md={1} className="song-rank">
                          #{index + 1}
                        </Col>
                        <Col xs={9} md={7} className="text-truncate">
                          <div className="song-title text-white">
                            {song.title}
                          </div>
                          <div className="artist-name d-md-none">
                            {song.artist || "Unknown Artist"}
                          </div>
                        </Col>
                        <Col
                          md={4}
                          className="artist-name d-none d-md-block text-truncate"
                        >
                          {song.artist}
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

export default Artist;
