import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import "./AppNavbar.css";

const AppNavbar = ({ user, onLogout, onLogin, onSearch }) => {
  const handleSearchChange = (e) => {
    const query = e.target.value;
    if (onSearch && typeof onSearch === "function") {
      onSearch(query);
    }
  };
  const scrollToFooter = (e) => {
    e.preventDefault();
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Navbar
      expand="lg"
      className="navbar-custom py-3 d-none d-lg-flex"
      sticky="top"
    >
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Form
          className="search-form d-flex flex-grow-1 me-lg-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <FormControl
            type="search"
            placeholder="Search for music, artists..."
            className="search-input"
            onChange={handleSearchChange}
          />
        </Form>

        <Nav className="ms-auto align-items-center gap-3 text-center text-lg-start">
          <Nav.Link
            href="#footer"
            className="text-white simple-hover-link"
            onClick={scrollToFooter}
          >
            About Us
          </Nav.Link>
          <Nav.Link
            href="#footer"
            className="text-white simple-hover-link"
            onClick={scrollToFooter}
          >
            Contact
          </Nav.Link>
          <Nav.Link href="#" className="premium-link">
            Premium
          </Nav.Link>

          {!user ? (
            <Nav.Link
              className="text-white d-flex align-items-center p-0 login-icon-link"
              onClick={onLogin}
            >
              <PersonCircle size={28} />
            </Nav.Link>
          ) : (
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                className="d-flex align-items-center gap-2 text-white p-0 login-icon-link"
              >
                <PersonCircle size={28} />
                <span>{user.username || user.name || "User"}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
