import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { List, X } from "react-bootstrap-icons";
import { useLocation, useNavigate, Link } from "react-router-dom";

import logo from "../assets/imgs/logo.png";
import "./Sidebar.css";

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
    if (onLogout) {
      onLogout();
    } else {
      localStorage.clear();
      navigate("/login");
    }
    closeSidebar();
  };

  const navItems = [
    { label: "Home", icon: HomeIcon, path: "/" },
    { label: "Discover", icon: DiscoverIcon, path: "/discover" },
    { label: "Albums", icon: Album, path: "/albums" },
    { label: "Artists", icon: Artist, path: "/artists" },
    { label: "Recently Added", icon: Time, path: "/recent" },
    { label: "Most Played", icon: Repeattime, path: "/most-played" },
    { label: "Your Favourites", icon: Favourite, path: "/favourites" },
    { label: "Your Playlist", icon: Playlist, path: "/playlist" },
    { label: "Add Playlist", icon: Playlistadd, path: "/playlist/add" },
  ];

  const renderNavLink = (item, index) => {
    const isActive = location.pathname === item.path;
    return (
      <Nav.Link
        key={index}
        as={Link}
        to={item.path}
        className={`nav-link d-flex align-items-center px-3 py-2 ${isActive ? "active" : ""}`}
        onClick={closeSidebar}
      >
        <img src={item.icon} alt={item.label} className="sidebar-icon me-2" />
        {item.label}
      </Nav.Link>
    );
  };

  const sidebarContent = (
    <>
      <div className="sidebar-logo d-flex align-items-center gap-2 mb-4">
        <Nav.Link
          as={Link}
          to="/"
          className="p-0 no-hover"
          onClick={closeSidebar}
        >
          <img src={logo} alt="Logo" className="logo-circle" />
        </Nav.Link>
        <h5 className="mb-0 gradient-logo">Music By Zahid Rafeeq</h5>
      </div>

      <Nav className="flex-column">
        <div className="menu-heading px-3 py-2">Menu</div>
        {navItems.slice(0, 4).map(renderNavLink)}

        <div className="menu-heading px-3 py-2">Library</div>
        {navItems.slice(4, 6).map(renderNavLink)}

        <div className="menu-heading px-3 py-2">Playlist And Favourites</div>
        {navItems.slice(6, 9).map(renderNavLink)}

        <div className="menu-heading px-3 py-2">Account</div>
        <Nav.Link
          as={Link}
          to="/settings"
          className={`nav-link d-flex align-items-center px-3 py-2 ${
            location.pathname === "/settings" ? "active" : ""
          }`}
          onClick={closeSidebar}
        >
          <img src={Setting} alt="Setting" className="sidebar-icon me-2" />{" "}
          Setting
        </Nav.Link>
        <Nav.Link
          as="button"
          className="logout-button d-flex align-items-center mt-2"
          onClick={handleLogout}
        >
          <img src={Logout} alt="Logout" className="sidebar-icon me-2" /> Log Out
        </Nav.Link>
      </Nav>
    </>
  );

  return (
    <>
      {!isOpen && (
        <button
          className="sidebar-toggle d-lg-none btn btn-link p-2"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <List color="hotpink" size={28} />
        </button>
      )}

      {/* Desktop Sidebar */}
      <div className="sidebar d-none d-lg-flex text-white flex-column p-3">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <div className={`sidebar-mobile text-white flex-column p-3 ${isOpen ? "open" : ""}`}>
        <button
          className="sidebar-toggle-mobile"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        >
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
