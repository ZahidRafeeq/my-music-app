// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import Sidebar from "../components/Sidebar";
import HeroSection from '../components/HeroSection';
import WeeklyTopSongs from '../components/WeeklyTopSongs';
import NewReleaseSongs from '../components/NewReleaseSongs';
import TrendingSongs from '../components/TrendingSongs';
import PopularArtists from '../components/PopularArtists';
import SignUpForm from '../components/SignUpForm';
import Footer from '../components/Footer';

const HomePage = ({ onLogout }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  // Auto scroll to PopularArtists section if #popular-artists is in URL
  useEffect(() => {
    if (location.hash === '#popular-artists') {
      const el = document.getElementById("popular-artists");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // delay to ensure component mounts
      }
    }
  }, [location]);

  return (
    <div className="app-container">
      {/* Sidebar for mobile (offcanvas) */}
      <Sidebar
        show={showSidebar}
        handleClose={() => setShowSidebar(false)}
        isOffcanvas
        onLogout={onLogout}
      />

      <Container fluid>
        <Row className="flex-nowrap">
          {/* Sidebar for desktop */}
          <Col md={3} className="d-none d-md-block sidebar-col">
            <Sidebar onLogout={onLogout} />
          </Col>

          <Col xs={12} md={9} className="main-col">
            <div className="content-wrapper">
              <HeroSection handleShowSidebar={() => setShowSidebar(true)} />

              <WeeklyTopSongs />
              <NewReleaseSongs />
              <TrendingSongs />
              <div id="popular-artists">
                <PopularArtists />
              </div>

              <SignUpForm />
              <Footer />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
