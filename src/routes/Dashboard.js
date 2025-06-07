import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faUser, faInfoCircle, faCalendarAlt, 
  faSignOutAlt, faChartLine, faBook, faClock, faBell
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  // Static user data
  const userData = {
    name: "John Doe",
    testResults: {
      math: 75,
      science: 85
    },
    progress: 60,
    profileImage: "https://via.placeholder.com/150"
  };

  // Static schedule data
  const scheduleData = [
    {
      subject: "Math",
      duration: "2 hours",
      priority: "high"
    },
    {
      subject: "Science",
      duration: "1 hour",
      priority: "medium"
    },
    {
      subject: "English",
      duration: "30 minutes",
      priority: "low"
    }
  ];

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title mb-3">Welcome to your personalized learning dashboard!</h2>
              <p className="card-text text-muted">
                AI-powered personalized learning paths and recommendations tailored just for you.
                Track your progress, manage your schedule, and achieve your learning goals efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Profile Section */}
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faUser} className="me-2 text-primary" />
                Profile Overview
              </h5>
              <Link to="/profile" className="btn btn-sm btn-outline-primary">View Full Profile</Link>
            </div>
            <div className="card-body">
              <div className="d-flex mb-4">
                <img 
                  src={userData.profileImage} 
                  alt="Profile" 
                  className="rounded-circle me-3" 
                  width="80" 
                  height="80"
                />
                <div>
                  <h4 className="mb-1">{userData.name}</h4>
                  <p className="text-muted mb-0">Student</p>
                </div>
              </div>

              <h6 className="mb-3">Test Results</h6>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Math</span>
                  <span>{userData.testResults.math}%</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div 
                    className="progress-bar bg-primary" 
                    role="progressbar" 
                    style={{ width: `${userData.testResults.math}%` }}
                    aria-valuenow={userData.testResults.math} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <span>Science</span>
                  <span>{userData.testResults.science}%</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div 
                    className="progress-bar bg-success" 
                    role="progressbar" 
                    style={{ width: `${userData.testResults.science}%` }}
                    aria-valuenow={userData.testResults.science} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>

              <h6 className="mb-2">Learning Path Progress</h6>
              <div className="d-flex justify-content-between mb-1">
                <span>Overall Progress</span>
                <span>{userData.progress}%</span>
              </div>
              <div className="progress mb-3" style={{ height: '10px' }}>
                <div 
                  className="progress-bar bg-info" 
                  role="progressbar" 
                  style={{ width: `${userData.progress}%` }}
                  aria-valuenow={userData.progress} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
              <p className="text-muted small">
                <FontAwesomeIcon icon={faChartLine} className="me-1" />
                {userData.progress}% of learning path completed
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faInfoCircle} className="me-2 text-primary" />
                About the Platform
              </h5>
              <Link to="/about" className="btn btn-sm btn-outline-primary">Learn More</Link>
            </div>
            <div className="card-body">
              <p>
                Empowering students with personalized learning experiences powered by AI.
                Our platform adapts to your unique learning style and pace to help you achieve your goals.
              </p>
              <h6 className="mt-4 mb-3">AI Features</h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0">
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-primary" />
                  Personalized study schedules based on your performance
                </li>
                <li className="list-group-item px-0">
                  <FontAwesomeIcon icon={faBook} className="me-2 text-primary" />
                  Content recommendations tailored to your learning style
                </li>
                <li className="list-group-item px-0">
                  <FontAwesomeIcon icon={faChartLine} className="me-2 text-primary" />
                  Real-time progress tracking and performance analytics
                </li>
              </ul>
            </div>
          </div>

          {/* Logout Section */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">Account Management</h5>
              <p className="text-muted mb-4">
                Need to step away? You can safely log out of your account.
              </p>
              <Link to="/" className="btn btn-outline-danger">
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-primary" />
                Today's Learning Schedule
              </h5>
              <Link to="/schedule" className="btn btn-sm btn-outline-primary">View Full Schedule</Link>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-8">
                  {scheduleData.map((item, index) => (
                    <div 
                      key={index} 
                      className={`card mb-3 border-${getPriorityColor(item.priority)}`}
                    >
                      <div className="card-body py-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="card-title mb-1">Study {item.subject}</h5>
                            <p className="card-text text-muted mb-0">
                              <FontAwesomeIcon icon={faClock} className="me-2" />
                              {item.duration} today
                            </p>
                          </div>
                          <span className={`badge bg-${getPriorityColor(item.priority)}`}>
                            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-lg-4">
                  <div className="card bg-light border-0">
                    <div className="card-body">
                      <h6 className="mb-3">
                        <FontAwesomeIcon icon={faBell} className="me-2 text-warning" />
                        Study Reminders
                      </h6>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-3">
                          <small className="text-muted d-block mb-1">Based on your recent performance:</small>
                          <strong>Focus more on Math equations today</strong>
                        </li>
                        <li className="mb-3">
                          <small className="text-muted d-block mb-1">Upcoming test:</small>
                          <strong>Science quiz tomorrow - review chapters 5-7</strong>
                        </li>
                        <li>
                          <small className="text-muted d-block mb-1">Progress milestone:</small>
                          <strong>Complete English assignment to reach 65% progress</strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
