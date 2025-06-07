import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faRocket, faChartLine, faUsers, faUserGraduate, faRobot, faBrain } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
  // Mock team data
  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'AI Research Lead',
      bio: 'PhD in Machine Learning with 10+ years of experience in educational technology.',
      image: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer',
      bio: 'Full-stack developer specializing in educational platforms and AI integration.',
      image: 'https://randomuser.me/api/portraits/men/44.jpg'
    },
    {
      name: 'Priya Patel',
      role: 'Education Specialist',
      bio: 'Former teacher with expertise in curriculum design and learning assessment.',
      image: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      name: 'James Wilson',
      role: 'UX/UI Designer',
      bio: 'Passionate about creating intuitive and accessible learning experiences.',
      image: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
  ];

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold mb-4">About Us</h1>
          <p className="lead mb-5 text-muted mx-auto" style={{ maxWidth: '800px' }}>
            Empowering students with personalized learning experiences through the power of artificial intelligence
            and data-driven education.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="row align-items-center mb-5 py-4">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" 
            alt="Students collaborating" 
            className="img-fluid rounded shadow" 
          />
        </div>
        <div className="col-lg-6">
          <h2 className="fw-bold mb-4">Our Mission</h2>
          <p className="mb-4">
            Our AI-powered learning system provides personalized recommendations based on your 
            performance scores. The system analyzes your current level and suggests the most 
            appropriate courses to help you advance your skills effectively.
          </p>
          <p>
            By using machine learning algorithms, we can identify patterns in learning behavior 
            and create customized pathways that adapt to your specific needs and learning style.
            This approach ensures that every student receives a tailored education experience that
            maximizes their potential and accelerates their progress.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="row py-5 bg-light rounded-3 mb-5">
        <div className="col-12 text-center mb-5">
          <h2 className="fw-bold">How It Works</h2>
          <p className="text-muted">Our AI-powered platform simplifies the learning process</p>
        </div>
        
        <div className="col-md-3 mb-4 mb-md-0">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                <FontAwesomeIcon icon={faUserGraduate} size="2x" className="text-primary" />
              </div>
              <h5>1. Create Your Profile</h5>
              <p className="text-muted small">Sign up and complete your learning profile with your goals and current skills</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-4 mb-md-0">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 d-inline-flex mb-3">
                <FontAwesomeIcon icon={faRobot} size="2x" className="text-success" />
              </div>
              <h5>2. AI Analysis</h5>
              <p className="text-muted small">Our AI analyzes your performance and learning style</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-4 mb-md-0">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 d-inline-flex mb-3">
                <FontAwesomeIcon icon={faBrain} size="2x" className="text-info" />
              </div>
              <h5>3. Personalized Path</h5>
              <p className="text-muted small">Receive a customized learning pathway tailored to your needs</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="rounded-circle bg-warning bg-opacity-10 p-3 d-inline-flex mb-3">
                <FontAwesomeIcon icon={faChartLine} size="2x" className="text-warning" />
              </div>
              <h5>4. Track Progress</h5>
              <p className="text-muted small">Monitor your advancement with real-time feedback and adjustments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="row mb-5">
        <div className="col-12 text-center mb-5">
          <h2 className="fw-bold">Key Features</h2>
          <p className="text-muted">What makes our platform unique</p>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="d-flex">
            <div className="flex-shrink-0">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex">
                <FontAwesomeIcon icon={faBrain} className="text-primary" />
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <h4>Personalized Learning Paths</h4>
              <p className="text-muted">
                Custom learning journeys that adapt to your pace, preferences, and progress.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="d-flex">
            <div className="flex-shrink-0">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 d-inline-flex">
                <FontAwesomeIcon icon={faRobot} className="text-success" />
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <h4>AI-Powered Recommendations</h4>
              <p className="text-muted">
                Smart course suggestions based on your performance and learning objectives.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="d-flex">
            <div className="flex-shrink-0">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 d-inline-flex">
                <FontAwesomeIcon icon={faChartLine} className="text-info" />
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <h4>Continuous Feedback</h4>
              <p className="text-muted">
                Real-time progress tracking with actionable insights to improve your learning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="row py-5">
        <div className="col-12 text-center mb-5">
          <h2 className="fw-bold">Meet Our Team</h2>
          <p className="text-muted">The experts behind our AI-powered learning platform</p>
        </div>
        
        {team.map((member, index) => (
          <div className="col-md-6 col-lg-3 mb-4" key={index}>
            <div className="card border-0 shadow-sm h-100">
              <img src={member.image} className="card-img-top" alt={member.name} />
              <div className="card-body text-center">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-text text-primary fw-bold small">{member.role}</p>
                <p className="card-text small text-muted">{member.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="row py-5">
        <div className="col-12 text-center">
          <div className="card bg-primary text-white shadow rounded-lg">
            <div className="card-body p-5">
              <h2 className="fw-bold mb-3">Ready to Transform Your Learning Experience?</h2>
              <p className="lead mb-4">Join our platform today and discover the power of AI-driven education.</p>
              <Link to="/signup" className="btn btn-light btn-lg px-5">
                Join Us Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
