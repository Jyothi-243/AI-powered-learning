import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isLogin && !name) {
      setError('Please enter your name.');
      return;
    }

    try {
      // For demo purposes, we'll simulate authentication
      if (isLogin) {
        // Simulate login
        login({ name: 'Demo User', email });
        navigate('/');
      } else {
        // Simulate signup
        login({ name, email });
        navigate('/');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-lg rounded-lg">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">
                {isLogin ? (
                  <><FontAwesomeIcon icon={faSignInAlt} className="me-2" /> Login</>
                ) : (
                  <><FontAwesomeIcon icon={faUserPlus} className="me-2" /> Sign Up</>
                )}
              </h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                )}
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isLogin ? "Enter your password" : "Create a password"}
                      required
                    />
                  </div>
                  {isLogin && (
                    <div className="text-end mt-2">
                      <Link to="/forgot-password" className="text-decoration-none small">
                        Forgot Password?
                      </Link>
                    </div>
                  )}
                </div>
                
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    {isLogin ? 'Login' : 'Sign Up'}
                  </button>
                </div>
              </form>
              
              <div className="text-center mt-4">
                {isLogin ? (
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <button 
                      className="btn btn-link p-0" 
                      onClick={() => setIsLogin(false)}
                    >
                      Sign Up
                    </button>
                  </p>
                ) : (
                  <p className="mb-0">
                    Already have an account?{' '}
                    <button 
                      className="btn btn-link p-0" 
                      onClick={() => setIsLogin(true)}
                    >
                      Login
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-muted small">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-decoration-none">Terms of Service</Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-decoration-none">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
