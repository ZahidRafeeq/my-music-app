import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import './PopularArtists.css';

import nusratImg from "../assets/artists/Nusrat-Fateh-Ali-Khan.jpeg";
import bPraakImg from "../assets/artists/BPraak.jpeg";
import arijitimg from "../assets/artists/Arijit-Singh.jpeg";
import sonuimg from "../assets/artists/Sonu-Nigam.jpeg";
import shanimg from "../assets/artists/Shantanu-Moitra.jpeg";
import chemmeaimg from "../assets/artists/Cheema-Y.jpeg";
import akonimg from "../assets/artists/akon.jpg";
import guruimg from "../assets/artists/guru-randhawa.jpg";
import sanjuimg from "../assets/artists/sanju-rathod.jpg";

const customArtistImages = {
  'nusrat-fateh-ali-khan': nusratImg,
  'bpraak': bPraakImg,
  'arijit-singh': arijitimg,
  'sonu-nigam': sonuimg,
  'shantanu-moitra': shanimg,
  'cheema-y': chemmeaimg,
  'akon': akonimg,
  'guru-randhawa': guruimg,
  'sanju-rathod': sanjuimg,
};

const getArtistImage = (id) => {
  return customArtistImages[id] || bPraakImg;
};

const PopularArtists = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [nr, wt, tr] = await Promise.all([
          fetch('/newreleasesongs.json'),
          fetch('/weeklytopsongs.json'),
          fetch('/trendingsongs.json'),
        ]);
        if (!nr.ok || !wt.ok || !tr.ok) throw new Error();
        const [newReleases, weeklyTops, trendings] = await Promise.all([
          nr.json(), wt.json(), tr.json()
        ]);
        const all = [...newReleases, ...weeklyTops, ...trendings];
        const map = new Map();

        all.forEach(song => {
          if (!song.artist) return;
          const id = song.artist.toLowerCase().replace(/\s+/g, '-');
          if (!map.has(id)) {
            map.set(id, {
              id,
              name: song.artist,
              image: getArtistImage(id),
              songCount: 1
            });
          } else {
            const x = map.get(id);
            map.set(id, { ...x, songCount: x.songCount + 1 });
          }
        });

        setArtists(
          Array.from(map.values())
            .sort((a, b) => b.songCount - a.songCount)
        );
      } catch (e) {
        console.error(e);
        setArtists([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onClick = artist =>
    navigate(`/artist/${artist.id}`, { state: { artist } });

  if (loading) return (
    <Container fluid className="popular-artists-section text-center py-4">
      <Spinner animation="border" variant="light" />
      <div className="text-white mt-2">Loading artists…</div>
    </Container>
  );

  if (!artists.length) return (
    <Container fluid className="popular-artists-section text-center py-4">
      <div className="text-white">No artists found</div>
    </Container>
  );

  return (
    <Container fluid className="popular-artists-section">
      <h2 className="mb-4">Popular <span className="text-pink">Artists</span></h2>
      <Row className="g-3">
        {artists.map((artist) => (
          <Col key={artist.id} xs={6} sm={3} lg={2} className="d-flex justify-content-center">
            <div
              className="artist-wrapper"
              onClick={() => onClick(artist)}
              role="button"
              tabIndex={0}
              onKeyPress={e => (e.key === 'Enter' || e.key === ' ') && onClick(artist)}
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="artist-image"
                onError={e => { e.currentTarget.src = bPraakImg }}
              />
              <div className="artist-name">{artist.name}</div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularArtists;
