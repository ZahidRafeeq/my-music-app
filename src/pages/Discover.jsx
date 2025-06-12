import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from "../components/Sidebar";
import WeeklyTopSongs from '../components/WeeklyTopSongs';
import NewReleaseSongs from '../components/NewReleaseSongs';
import PopularArtists from '../components/PopularArtists';
import Footer from '../components/Footer';
import AppNavbar from '../components/AppNavbar';

const Discover = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="position-relative text-white">
      {/* Inline styles for gradient heading */}
      <style>{`
        .gradient-logo {
          font-size: 26px;
          font-weight: bold;
          background: linear-gradient(to right, #e600ac, #3366ff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        .navbar-area {
          position: absolute;
          top: 0;
          left: 25%;
          width: 75%;
          z-index: 1000;
        }

        @media (max-width: 767.98px) {
          .navbar-area {
            display: none;
          }
        }

        .discover-content {
          padding-top: 70px;
        }
      `}</style>

      {/* AppNavbar only on desktop/tablet in 9 columns area */}
      <div className="navbar-area d-none d-md-block">
        <AppNavbar />
      </div>

      {/* Heading on mobile */}
      <div className="d-block d-md-none text-center mt-3 mb-3">
        <h1 className="gradient-logo">Discover Page</h1>
      </div>

      <Container fluid className="discover-content">
        <Row className="flex-nowrap">
          {/* Sidebar - Desktop only */}
          <Col md={3} className="d-none d-md-block px-0">
            <Sidebar />
          </Col>

          {/* Main content */}
          <Col xs={12} md={9} className="px-3 px-md-4">
            {/* Sidebar for mobile (offcanvas) */}
            <Sidebar show={showSidebar} handleClose={() => setShowSidebar(false)} isOffcanvas />

            <WeeklyTopSongs />
            <NewReleaseSongs />
            <PopularArtists />
            <Footer />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Discover;
