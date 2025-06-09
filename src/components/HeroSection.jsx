import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // <-- import kiya
import './HeroSection.css';
import AppNavbar from './AppNavbar';

const HeroSection = () => {
  const navigate = useNavigate(); // <-- navigate function

  const handleDiscoverClick = () => {
    navigate('/discover'); // <-- jab click ho, albums page pe jao
  };

  return (
    <div className="hero-section text-white position-relative overflow-hidden d-flex align-items-start align-items-md-center pt-5 pt-md-6 pb-4 pb-md-5 rounded-4">
      <div className="hero-navbar-wrapper position-absolute top-0 start-0 w-100">
        <AppNavbar />
      </div>

      <div className="hero-overlay py-5 w-100">
        <Container>
          <Row className="align-items-start">
            <Col xs={12} md={10} lg={8}>
              <h1 className="display-5 fw-bold">
                All the <span className="text-pink">Best Songs</span><br /> in One Place
              </h1>
              <p className="lead mt-3">
                On our website, you can stream an amazing collection of popular and new songs.
                Share your favorite tracks in high quality and enjoy without interruptions.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 mt-3 mt-sm-4 justify-content-center justify-content-md-start">
                <Button className="btn-discover" onClick={handleDiscoverClick}>
                  Discover Now
                </Button>
                <Button className="btn-playlist">
                  Create Playlist
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;
