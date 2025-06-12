import React from "react";
import "./Footer.css";
import FacebookIcon from "../assets/svgs/Facebook.svg";
import InstagramIcon from "../assets/svgs/Instagram.svg";
import TwitterIcon from "../assets/svgs/Twitter.svg";
import PhoneIcon from "../assets/svgs/Call.svg";

const Footer = () => {
  return (
    <footer id="footer" className="melodies-footer py-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-12 col-md-4">
            <h1>About</h1>
            <p>
              <strong>Melodies</strong> is a music streaming web application
              developed as a final project for the 4th semester of BS Computer
              Science at The Islamia University of Bahawalpur. Created by{" "}
              <span className="pink-text">Zahid Rafeeq</span>, this project
              demonstrates frontend development skills with a modern user
              interface, smooth navigation, and an engaging music experience for
              users.
            </p>
          </div>

          <div className="col-12 col-md-5">
            <div className="row text-center text-md-start">
              <div className="col-4">
                <h5>Melodies</h5>
                <hr />
                <ul className="list-unstyled">
                  <li><a href="#">Songs</a></li>
                  <li><a href="#">Radio</a></li>
                  <li><a href="#">Podcast</a></li>
                </ul>
              </div>
              <div className="col-4">
                <h5>Access</h5>
                <hr />
                <ul className="list-unstyled">
                  <li><a href="#">Explore</a></li>
                  <li><a href="#">Artists</a></li>
                  <li><a href="#">Playlists</a></li>
                  <li><a href="#">Albums</a></li>
                  <li><a href="#">Trending</a></li>
                </ul>
              </div>
              <div className="col-4">
                <h5>Contact</h5>
                <hr />
                <ul className="list-unstyled">
                  <li><a href="#">About</a></li>
                  <li><a href="#">Policy</a></li>
                  <li><a href="#">Social Media</a></li>
                  <li><a href="#">Support</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-3 text-center text-md-start">
            <div className="gradient-logo">Zahid Rafeeq</div>
            <div className="footer-icons d-flex justify-content-center justify-content-md-start gap-3 mt-3">
              <img src={FacebookIcon} alt="Facebook" width="20" height="20" />
              <img src={InstagramIcon} alt="Instagram" width="20" height="20" />
              <img src={TwitterIcon} alt="Twitter" width="20" height="20" />
              <img src={PhoneIcon} alt="Phone" width="20" height="20" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
