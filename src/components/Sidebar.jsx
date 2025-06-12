import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { List, X } from "react-bootstrap-icons";
import { useLocation, useNavigate, Link } from "react-router-dom";

import logo from "../assets/imgs/logo.png";
import "./Sidebar.css";

// SVG Icons
import HomeIcon from "../assets/svgs/Home.svg";
import DiscoverIcon from "../assets/svgs/discover.svg";
import Album from "../assets/svgs/Album.svg";
import Artist from "../assets/svgs/Artist.svg";
import Repeattime from "../assets/svgs/Repeattime.svg";
import Playlist from "../assets/svgs/Playlist.svg";
import Playlistadd from "../assets/svgs/Playlistadd.svg";
import Time from "../assets/svgs/Time.svg";
import Favourite from "../assets/svgs/Favourite.svg";
import Setting from "../assets/svgs/Setting.svg";
import Logout from "../assets/svgs/Logout.svg";

const Sidebar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    closeSidebar();
    setTimeout(() => {
      if (onLogout) {
        onLogout();
      } else {
        localStorage.clear();
        navigate("/login");
      }
    }, 200);
  };

  const handleArtistClick = () => {
    if (location.pathname === "/") {
      const el = document.getElementById("popular-artists");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        closeSidebar();
      }
    } else {
      navigate("/#popular-artists");
      closeSidebar();
    }
  };

  const navItems = [
    { label: "Home", icon: HomeIcon, path: "/" },
    { label: "Discover", icon: DiscoverIcon, path: "/discover" },
    { label: "Albums", icon: Album, path: "/albums" },
    { label: "Recently Added", icon: Time, path: "/recent" },
    { label: "Most Played", icon: Repeattime, path: "/most-played" },
    { label: "Your Favourites", icon: Favourite, path: "/favourites" },
    { label: "Your Playlist", icon: Playlist, path: "/playlist" },
    { label: "Add Playlist", icon: Playlistadd, path: "/playlist/add" },
  ];

  const renderNavLink = ({ label, icon, path }) => {
    const isActive = location.pathname === path;
    return (
      <Nav.Link
        key={path}
        as={Link}
        to={path}
        className={`nav-link d-flex align-items-center px-3 py-2 ${isActive ? "active" : ""}`}
        onClick={closeSidebar}
      >
        <img src={icon} alt={label} className="sidebar-icon me-2" />
        {label}
      </Nav.Link>
    );
  };

  const sidebarContent = (
    <>
      <div className="sidebar-logo d-flex align-items-center gap-2 mb-4">
        <Nav.Link as={Link} to="/" className="p-0 no-hover" onClick={closeSidebar}>
          <img src={logo} alt="Logo" className="logo-circle" />
        </Nav.Link>
        <h5 className="mb-0 gradient-logo">Music By Zahid Rafeeq</h5>
      </div>

      <Nav className="flex-column">
        <div className="menu-heading px-3 py-2">Menu</div>
        {navItems.slice(0, 3).map(renderNavLink)}

        <Nav.Link
          as="button"
          className="nav-link d-flex align-items-center px-3 py-2"
          onClick={handleArtistClick}
        >
          <img src={Artist} alt="Artists" className="sidebar-icon me-2" />
          Artists
        </Nav.Link>

        <div className="menu-heading px-3 py-2">Library</div>
        {navItems.slice(3, 5).map(renderNavLink)}

        <div className="menu-heading px-3 py-2">Playlist And Favourites</div>
        {navItems.slice(5, 8).map(renderNavLink)}

        <div className="menu-heading px-3 py-2">Account</div>
        <Nav.Link
          as={Link}
          to="/settings"
          className={`nav-link d-flex align-items-center px-3 py-2 ${
            location.pathname === "/settings" ? "active" : ""
          }`}
          onClick={closeSidebar}
        >
          <img src={Setting} alt="Setting" className="sidebar-icon me-2" />
          Setting
        </Nav.Link>
        <button
          type="button"
          className="logout-button d-flex align-items-center mt-2"
          onClick={handleLogout}
        >
          <img src={Logout} alt="Logout" className="sidebar-icon me-2" />
          Log Out
        </button>
      </Nav>
    </>
  );

  return (
    <>
      {/* Toggle Button (Mobile) */}
      <div className="sidebar-toggle-wrapper d-md-none">
        {!isOpen && (
          <button type="button" className="sidebar-toggle btn btn-link p-2" onClick={toggleSidebar}>
            <List color="hotpink" size={28} />
          </button>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="sidebar d-none d-md-flex text-white flex-column p-3">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <div className={`sidebar-mobile text-white flex-column p-3 ${isOpen ? "open" : ""}`}>
        <button type="button" className="sidebar-toggle-mobile" onClick={closeSidebar}>
          <X color="hotpink" size={28} />
        </button>
        {sidebarContent}
      </div>

      {/* Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={closeSidebar} />}
    </>
  );
};

export default Sidebar;
