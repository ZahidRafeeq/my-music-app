import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import AppNavbar from './AppNavbar';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleDiscoverClick = () => {
    navigate('/discover');
  };

  return (
    <div className="hero-section text-white position-relative overflow-hidden d-flex align-items-start align-items-md-center pt-5 pt-md-6 pb-4 pb-md-5 rounded-4">
      <div className="hero-navbar-wrapper">
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
                This music streaming website is developed as a final project for the 4th semester at The Islamia University of Bahawalpur. Submitted to Sir Omer Ajmal, it highlights my skills in frontend development by offering a smooth and modern interface for streaming popular and newly released songs.
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
