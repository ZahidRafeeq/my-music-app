// src/components/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaMusic } from 'react-icons/fa';
import Logo from "../assets/imgs/logo.png";
import "./Login.css";

const Signup = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (!termsAccepted) {
      alert("You must accept the terms and conditions");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onSignup({ email, name });
      navigate('/dashboard');
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
                <h1 className="gradient-logo">Music By Zahid Rafeeq</h1>
                <p className="mb-0 fs-5 text-white">Create Your Account</p>
              </div>

              <Card.Body className="p-4 p-md-5">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold text-light">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="custom-input"
                    />
                  </Form.Group>

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
                      placeholder="Create a Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="custom-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold text-light">Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Your Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="custom-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4 text-light">
                    <Form.Check
                      type="checkbox"
                      id="terms"
                      label={
                        <span>
                          I agree to the{" "}
                          <Link to="#" className="text-decoration-none text-info">
                            Terms and Conditions
                          </Link>
                        </span>
                      }
                      checked={termsAccepted}
                      onChange={() => setTermsAccepted(!termsAccepted)}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
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
                        Creating account...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>

                  <div className="text-center mt-4">
                    <p className="mb-2 text-pink">Already have an account?</p>
                    <Link
                      to="/login"
                      className="btn rounded-pill fw-bold px-4 shadow-sm gradient-button"
                    >
                      Login Here
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
                    width: '6px',
                    height: `${20 + Math.random() * 30}px`,
                    animation: `barAnimation ${1 + Math.random()}s infinite ease-in-out`,
                    animationDelay: `${i * 0.2}s`,
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

export default Signup;
