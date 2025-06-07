import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faLightbulb, faRocket, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const { currentUser, isAuthenticated } = useAuth();

  // Mock data for logged-in user
  const mockLearningPath = [
    { id: 1, title: 'Introduction to Machine Learning', progress: 75 },
    { id: 2, title: 'Data Visualization Techniques', progress: 40 },
    { id: 3, title: 'Advanced Neural Networks', progress: 10 }
  ];

  return (
    <div className="container py-5">
      {isAuthenticated ? (
        // Logged-in user view
        <div>
          <div className="row mb-5">
            <div className="col-12">
              <div className="card shadow-sm border-0 rounded-lg">
                <div className="card-body p-4">
                  <h2 className="mb-3">Welcome back, {currentUser.name}!</h2>
                  <p className="lead text-muted">
                    Based on your recent progress, we've updated your personalized learning path.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="mb-4">Your Learning Path</h3>
          
          <div className="row mb-4">
            {mockLearningPath.map(course => (
              <div className="col-md-4 mb-4" key={course.id}>
                <div className="card h-100 shadow-sm border-0 rounded-lg">
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <div className="progress mb-3">
                      <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{ width: `${course.progress}%`, backgroundColor: '#5e72e4' }} 
                        aria-valuenow={course.progress} 
                        aria-valuemin="0" 
                        aria-valuemax="100">
                        {course.progress}%
                      </div>
                    </div>
                    <Link to={`/course/${course.id}`} className="btn btn-primary">
                      {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <Link to="/courses" className="btn btn-lg btn-outline-primary">
              Explore More Courses <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </Link>
          </div>
        </div>
      ) : (
        // Logged-out user view
        <div>
          {/* Hero Section */}
          <div className="row align-items-center mb-5 py-5">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">Welcome to AI-Powered Learning Pathways</h1>
              <p className="lead mb-4">
                Tailored learning paths to help you achieve your goals efficiently. Our AI-powered platform
                analyzes your strengths and areas for improvement to create a personalized learning experience.
              </p>
              <Link to="/signup" className="btn btn-primary btn-lg px-4 me-3">
                Get Started
              </Link>
              <Link to="/about" className="btn btn-outline-secondary btn-lg px-4">
                Learn More
              </Link>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                alt="Learning Illustration" 
                className="img-fluid rounded shadow-lg" 
              />
            </div>
          </div>
          
          {/* Features Section */}
          <div className="row py-5">
            <div className="col-12 text-center mb-5">
              <h2 className="fw-bold">Why Choose Our Platform?</h2>
              <p className="lead text-muted">Discover the benefits of AI-powered learning</p>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm rounded-lg">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <FontAwesomeIcon icon={faLightbulb} size="2x" className="text-primary" />
                  </div>
                  <h4>Personalized Learning Paths</h4>
                  <p className="text-muted">
                    Our AI analyzes your learning style and progress to create custom pathways tailored just for you.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm rounded-lg">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-success bg-opacity-10 p-3 d-inline-flex mb-3">
                    <FontAwesomeIcon icon={faRocket} size="2x" className="text-success" />
                  </div>
                  <h4>AI-Based Course Recommendations</h4>
                  <p className="text-muted">
                    Get intelligent course suggestions based on your interests, goals, and performance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm rounded-lg">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-info bg-opacity-10 p-3 d-inline-flex mb-3">
                    <FontAwesomeIcon icon={faChartLine} size="2x" className="text-info" />
                  </div>
                  <h4>Real-Time Progress Tracking</h4>
                  <p className="text-muted">
                    Monitor your advancement with detailed analytics and insights to keep you motivated.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="row py-5">
            <div className="col-12 text-center">
              <div className="card bg-primary text-white shadow rounded-lg">
                <div className="card-body p-5">
                  <h2 className="fw-bold mb-3">Ready to Start Your Learning Journey?</h2>
                  <p className="lead mb-4">Join thousands of students already benefiting from our AI-powered platform.</p>
                  <Link to="/signup" className="btn btn-light btn-lg px-5">
                    Sign Up Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
