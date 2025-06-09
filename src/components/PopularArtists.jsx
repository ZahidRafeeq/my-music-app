import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import C1 from "../assets/imgs/C1.png";
import PlusIcon from "../assets/svgs/PlusIcon.svg";
import './PopularArtists.css';

const PopularArtists = () => {
  const artists = [
    { id: 1, name: 'Adele', image: C1 },
    { id: 2, name: 'Eminem', image: C1 },
    { id: 3, name: 'Imagine Dragons', image: C1 },
    { id: 4, name: 'The Weeknd', image: C1 },
    { id: 5, name: 'Taylor Swift', image: C1 },
    { id: 6, name: 'Måneskin', image: C1 },
  ];

  return (
    <Container fluid className="popular-artists-section">
      <div className="d-flex justify-content-between align-items-center mb-3 d-md-none">
        <h3 className="mb-0">
          Popular <span className="text-pink">Artists</span>
        </h3>
        <a href="#view-all" className="view-all-text-only">View All</a>
      </div>

      <h2 className="d-none d-md-block mb-4">
        Popular <span className="text-pink">Artists</span>
      </h2>

      <Row className="g-4">
        {artists.slice(0, 3).map((artist) => (
          <Col key={artist.id} xs={4} sm={4} md={3} lg={2}>
            <div className="artist-wrapper">
              <img src={artist.image} alt={artist.name} className="artist-image" />
              <div className="artist-name">{artist.name}</div>
            </div>
          </Col>
        ))}

        {artists.length > 3 && (
          <>
            <Col className="d-none d-md-block" md={3} lg={2}>
              <div className="artist-wrapper">
                <img src={artists[3].image} alt={artists[3].name} className="artist-image" />
                <div className="artist-name">{artists[3].name}</div>
              </div>
            </Col>
            <Col className="d-none d-lg-block" lg={2}>
              <div className="artist-wrapper">
                <img src={artists[4].image} alt={artists[4].name} className="artist-image" />
                <div className="artist-name">{artists[4].name}</div>
              </div>
            </Col>
          </>
        )}

        <Col xs={12} sm={6} md={4} lg={2} className="d-none d-lg-flex flex-column align-items-center justify-content-center">
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

export default PopularArtists;
