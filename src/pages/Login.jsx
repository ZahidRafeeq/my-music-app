// src/components/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaGoogle, FaFacebookF, FaMusic } from "react-icons/fa";
import "./Login.css";
import Logo from "../assets/imgs/logo.png";
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ email, name: "Demo User" });
      navigate("/HomePage");
    }, 1000);
  };
  return (
    <div className="login-page">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Row className="justify-content-center w-100">
          <Col md={8} lg={6} xl={5}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden login-card">
              <div className="login-header p-5 text-center position-relative">
                <FaMusic className="position-absolute top-0 end-0 fs-2 opacity-75 m-3 deep-pink-icon" />
                <img src={Logo} alt="Logo" className="login-logo mb-3" />
                <h1 className="gradient-logo">Music by Zahid Rafeeq</h1>
                <p className="mb-0 fs-5 text-white">Login To Continue</p>
              </div>
              <Card.Body className="p-4 p-md-5">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold text-light">E-Mail</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Your E-Mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold text-light">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="custom-input"
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      id="remember"
                      label="Remember me"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="text-light"
                    />
                    <Link
                      to="#"
                      className="text-decoration-none text-info deep-pink-icon fw-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Button
                    size="lg"
                    className="w-100 mb-4 fw-bold rounded-pill shadow gradient-button"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <div className="position-relative text-center mb-4">
                    <hr className="my-4" />
                    <span className="position-absolute top-50 start-50 translate-middle bg-dark px-4 text-white">
                      or continue with
                    </span>
                  </div>
                  <div className="d-flex justify-content-center gap-3 mb-4">
                    <Button
                      variant="outline-light"
                      className="rounded-circle p-3 d-flex align-items-center justify-content-center"
                    >
                      <FaGoogle className="fs-5" style={{ color: "#DB4437" }} />
                    </Button>
                    <Button
                      variant="outline-light"
                      className="rounded-circle p-3 d-flex align-items-center justify-content-center"
                    >
                      <FaFacebookF className="fs-5" style={{ color: "#1877F2" }} />
                    </Button>
                  </div>
                  <div className="text-center mt-4">
                    <p className="mb-2 text-pink">Don't Have An Account?</p>
                    <Link
                      to="/signup"
                      className="btn rounded-pill fw-bold px-4 shadow-sm gradient-button"
                    >
                      Sign Up Here
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
            <div className="music-visualizer mt-4 d-flex justify-content-center gap-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="visualizer-bar gradient-bar rounded-top"
                  style={{
                    width: "6px",
                    height: `${20 + Math.random() * 20}px`,
                    animation: `barAnimation ${1 + Math.random()}s infinite ease-in-out`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
