// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
              <PopularArtists />
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
