import React, { useState } from "react";
import { Google } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./SignUpForm.css"; 

const SignUpForm = () => {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="signup-container d-flex">
      {/* Left side - Description separate from card */}
      <div className="left-description d-flex flex-column justify-content-center p-4">
        <h1 className="signup-title">Join Our Platform</h1>
        <p className="signup-description">
          You can become a member of our platform by simply entering some
          necessary information. Already have an account? Just hit the Login
          button.
        </p>
      </div>

      {/* Right side - Card with form only */}
      <div className="signup-card p-4">
        <div className="auth-options mb-4">
          <button
            className={`auth-btn btn btn-link ${isSignup ? "active" : ""}`}
            onClick={() => setIsSignup(true)}
          >
            Sign Up
          </button>
          <button
            className={`auth-btn btn btn-link ${!isSignup ? "active" : ""}`}
            onClick={() => setIsSignup(false)}
          >
            Login
          </button>
        </div>

        <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
          {isSignup && (
            <div className="form-group mb-3">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Name"
                    required={isSignup}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Number"
                    required={isSignup}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="form-group mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Your E-Mail"
              required
            />
          </div>

          {/* New Password Input */}
          <div className="form-group mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <button type="submit" className="signup-btn btn btn-block">
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <div className="or-divider my-4 text-center">
            <span>Or</span>
          </div>

          <button
            type="button"
            className="google-btn btn w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <Google size={20} />
            {isSignup ? "Sign Up with Google" : "Login with Google"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
