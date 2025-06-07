import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, faClock, faCheckCircle, faExclamationTriangle,
  faArrowRight, faAdjust, faChartLine, faLightbulb, faSync,
  faFileAlt, faBell, faGraduationCap, faBook
} from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Schedule() {
  const { currentUser } = useAuth();
  const [viewMode, setViewMode] = useState('daily'); // 'daily' or 'weekly'
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Student's interests and strengths/weaknesses (for personalized scheduling)
  const studentProfile = {
    name: "John Doe",
    interests: ["Machine Learning", "Data Science", "Web Development"],
    strengths: ["Programming", "Mathematics"],
    weaknesses: ["Statistics", "Theoretical Concepts"],
    availableHours: 5, // hours available per day
    preferredLearningStyle: "visual" // visual, auditory, reading/writing, kinesthetic
  };

  // Content recommendations based on subject and learning style
  const contentRecommendations = {
    "Machine Learning Fundamentals": [
      { type: "document", title: "Google Doc: Introduction to ML Algorithms", url: "https://docs.google.com/document/d/example1" },
      { type: "video", title: "YouTube: Understanding Supervised Learning", url: "https://youtube.com/watch?v=example1" }
    ],
    "Data Structures": [
      { type: "document", title: "Google Doc: Binary Trees and Graph Traversal", url: "https://docs.google.com/document/d/example2" },
      { type: "video", title: "YouTube: Visualizing Data Structures", url: "https://youtube.com/watch?v=example2" }
    ],
    "Web Development": [
      { type: "document", title: "Google Doc: React Components and State", url: "https://docs.google.com/document/d/example3" },
      { type: "video", title: "YouTube: Building Responsive Dashboards", url: "https://youtube.com/watch?v=example3" }
    ],
    "Statistics for Data Science": [
      { type: "document", title: "Google Doc: Probability Distributions Explained", url: "https://docs.google.com/document/d/example4" },
      { type: "video", title: "YouTube: Hypothesis Testing Made Simple", url: "https://youtube.com/watch?v=example4" }
    ]
  };

  // Study reminders based on schedule and performance
  const studyReminders = [
    { subject: "Machine Learning Fundamentals", message: "Focus on supervised vs. unsupervised learning concepts today", priority: "high" },
    { subject: "Data Structures", message: "Practice implementing binary trees for tomorrow's quiz", priority: "medium" },
    { subject: "Web Development", message: "Complete the React dashboard component by end of day", priority: "medium" },
    { subject: "Statistics for Data Science", message: "Review hypothesis testing concepts before Friday's test", priority: "low" }
  ];

  // Mock data for schedule
  const mockSchedule = {
    daily: [
      {
        id: 1,
        subject: 'Machine Learning Fundamentals',
        startTime: '09:00',
        endTime: '10:30',
        duration: 90, // in minutes
        completed: true,
        priority: 'high',
        progress: 100,
        type: 'Video Lecture',
        description: 'Introduction to supervised learning algorithms'
      },
      {
        id: 2,
        subject: 'Data Structures',
        startTime: '11:00',
        endTime: '12:30',
        duration: 90,
        completed: true,
        priority: 'medium',
        progress: 100,
        type: 'Practice Problems',
        description: 'Binary trees and graph traversal algorithms'
      },
      {
        id: 3,
        subject: 'Web Development',
        startTime: '14:00',
        endTime: '15:30',
        duration: 90,
        completed: false,
        priority: 'medium',
        progress: 0,
        type: 'Project Work',
        description: 'Building a responsive dashboard with React'
      },
      {
        id: 4,
        subject: 'Statistics for Data Science',
        startTime: '16:00',
        endTime: '17:00',
        duration: 60,
        completed: false,
        priority: 'low',
        progress: 0,
        type: 'Reading',
        description: 'Probability distributions and hypothesis testing'
      }
    ],
    weekly: [
      { 
        day: 'Monday',
        subjects: [
          { name: 'Machine Learning', duration: 120, priority: 'high' },
          { name: 'Data Structures', duration: 90, priority: 'medium' }
        ],
        totalHours: 3.5,
        completed: true
      },
      { 
        day: 'Tuesday',
        subjects: [
          { name: 'Web Development', duration: 120, priority: 'medium' },
          { name: 'Statistics', duration: 60, priority: 'low' }
        ],
        totalHours: 3,
        completed: false
      },
      { 
        day: 'Wednesday',
        subjects: [
          { name: 'Machine Learning', duration: 120, priority: 'high' },
          { name: 'Algorithms', duration: 90, priority: 'high' }
        ],
        totalHours: 3.5,
        completed: false
      },
      { 
        day: 'Thursday',
        subjects: [
          { name: 'Web Development', duration: 150, priority: 'medium' },
          { name: 'Database Systems', duration: 60, priority: 'medium' }
        ],
        totalHours: 3.5,
        completed: false
      },
      { 
        day: 'Friday',
        subjects: [
          { name: 'Statistics', duration: 90, priority: 'low' },
          { name: 'Machine Learning', duration: 120, priority: 'high' }
        ],
        totalHours: 3.5,
        completed: false
      },
      { 
        day: 'Saturday',
        subjects: [
          { name: 'Project Work', duration: 180, priority: 'high' }
        ],
        totalHours: 3,
        completed: false
      },
      { 
        day: 'Sunday',
        subjects: [],
        totalHours: 0,
        completed: false,
        rest: true
      }
    ]
  };

  // Calculate overall progress
  const calculateOverallProgress = () => {
    if (viewMode === 'daily') {
      const totalSessions = mockSchedule.daily.length;
      const completedSessions = mockSchedule.daily.filter(session => session.completed).length;
      return Math.round((completedSessions / totalSessions) * 100);
    } else {
      const totalDays = mockSchedule.weekly.filter(day => !day.rest).length;
      const completedDays = mockSchedule.weekly.filter(day => day.completed).length;
      return Math.round((completedDays / totalDays) * 100);
    }
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Navigate to previous/next day or week
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (viewMode === 'daily') {
      newDate.setDate(newDate.getDate() + direction);
    } else {
      newDate.setDate(newDate.getDate() + (direction * 7));
    }
    setCurrentDate(newDate);
  };

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

  // Mark session as complete
  const markAsComplete = (id) => {
    // In a real app, this would update the backend
    console.log(`Marking session ${id} as complete`);
    // For demo, we'd update state here
  };

  // Generate time slots for daily view
  const renderDailySchedule = () => {
    return (
      <div className="daily-schedule">
        {mockSchedule.daily.map(session => (
          <div 
            key={session.id} 
            className={`card mb-3 border-${session.completed ? 'success' : getPriorityColor(session.priority)}`}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">{session.subject}</h5>
                <span className={`badge bg-${getPriorityColor(session.priority)}`}>
                  {session.priority.charAt(0).toUpperCase() + session.priority.slice(1)} Priority
                </span>
              </div>
              
              <div className="d-flex mb-3">
                <div className="me-3">
                  <FontAwesomeIcon icon={faClock} className="me-1 text-muted" />
                  <small className="text-muted">{session.startTime} - {session.endTime}</small>
                </div>
                <div>
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-1 text-muted" />
                  <small className="text-muted">{session.duration} minutes</small>
                </div>
              </div>
              
              <p className="card-text">{session.description}</p>
              
              {/* Content recommendations */}
              {renderContentRecommendations(session.subject)}
              
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="badge bg-secondary">{session.type}</div>
                {session.completed ? (
                  <span className="text-success">
                    <FontAwesomeIcon icon={faCheckCircle} /> Completed
                  </span>
                ) : (
                  <button 
                    className="btn btn-sm btn-outline-success"
                    onClick={() => markAsComplete(session.id)}
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Generate weekly schedule view
  const renderWeeklySchedule = () => {
    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Day</th>
              <th>Subjects</th>
              <th>Total Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockSchedule.weekly.map((day, index) => (
              <tr key={index} className={day.completed ? 'table-success' : ''}>
                <td className="fw-bold">{day.day}</td>
                <td>
                  {day.rest ? (
                    <span className="text-muted">Rest Day</span>
                  ) : (
                    <ul className="list-unstyled mb-0">
                      {day.subjects.map((subject, idx) => (
                        <li key={idx} className="mb-1">
                          <span className={`badge bg-${getPriorityColor(subject.priority)} me-2`}></span>
                          {subject.name} ({subject.duration} min)
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td>{day.totalHours} hrs</td>
                <td>
                  {day.completed ? (
                    <span className="text-success">
                      <FontAwesomeIcon icon={faCheckCircle} /> Completed
                    </span>
                  ) : day.rest ? (
                    <span className="text-muted">N/A</span>
                  ) : (
                    <span className="text-warning">
                      <FontAwesomeIcon icon={faExclamationTriangle} /> Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render content recommendations for a subject
  const renderContentRecommendations = (subject) => {
    const recommendations = contentRecommendations[subject] || [];
    if (recommendations.length === 0) return null;
    
    return (
      <div className="mt-3">
        <h6 className="text-primary mb-2">Recommended Resources:</h6>
        <ul className="list-group list-group-flush">
          {recommendations.map((item, index) => (
            <li key={index} className="list-group-item px-0 py-2 border-0">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                <FontAwesomeIcon 
                  icon={item.type === "video" ? faYoutube : faFileAlt} 
                  className={`me-2 ${item.type === "video" ? "text-danger" : "text-primary"}`} 
                />
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Render study reminders
  const renderStudyReminders = () => {
    return (
      <div className="card border-warning mb-4">
        <div className="card-header bg-warning bg-opacity-10 d-flex align-items-center">
          <FontAwesomeIcon icon={faBell} className="me-2 text-warning" />
          <h5 className="mb-0">Today's Study Reminders</h5>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {studyReminders.map((reminder, index) => (
              <li key={index} className="list-group-item d-flex align-items-start px-0">
                <div className={`badge bg-${getPriorityColor(reminder.priority)} me-3 mt-1`}>
                  {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)}
                </div>
                <div>
                  <strong>{reminder.subject}:</strong> {reminder.message}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // AI recommendations based on performance
  const renderAIRecommendations = () => {
    return (
      <div className="card border-primary mb-4">
        <div className="card-header bg-primary text-white">
          <FontAwesomeIcon icon={faLightbulb} className="me-2" />
          AI-Powered Schedule Recommendations
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex">
              <FontAwesomeIcon icon={faAdjust} className="me-3 mt-1 text-primary" />
              <div>
                <strong>Adjusted Focus:</strong> We've increased time for Data Structures based on your recent quiz performance.
              </div>
            </li>
            <li className="list-group-item d-flex">
              <FontAwesomeIcon icon={faChartLine} className="me-3 mt-1 text-primary" />
              <div>
                <strong>Progress Insight:</strong> Your progress in Machine Learning has been excellent. Consider taking the optional advanced module.
              </div>
            </li>
            <li className="list-group-item d-flex">
              <FontAwesomeIcon icon={faSync} className="me-3 mt-1 text-primary" />
              <div>
                <strong>Schedule Optimization:</strong> Your productivity peaks in the morning. We've scheduled challenging topics earlier in the day.
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="mb-3">Your Learning Schedule</h1>
          <p className="text-muted">
            Personalized schedule based on your learning goals, available time, and performance analytics.
          </p>
        </div>
        <div className="col-md-4 text-md-end">
          <div className="btn-group" role="group">
            <button 
              type="button" 
              className={`btn ${viewMode === 'daily' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setViewMode('daily')}
            >
              Daily View
            </button>
            <button 
              type="button" 
              className={`btn ${viewMode === 'weekly' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setViewMode('weekly')}
            >
              Weekly View
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0">
                    {viewMode === 'daily' ? 'Daily Schedule' : 'Weekly Overview'}
                  </h5>
                  <small className="text-muted">{formatDate(currentDate)}</small>
                </div>
                <div>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => navigateDate(-1)}
                  >
                    {viewMode === 'daily' ? 'Previous Day' : 'Previous Week'}
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => navigateDate(1)}
                  >
                    {viewMode === 'daily' ? 'Next Day' : 'Next Week'}
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              {viewMode === 'daily' ? renderDailySchedule() : renderWeeklySchedule()}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* Study Reminders */}
          {renderStudyReminders()}
          
          {/* Progress Tracker */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Progress Tracker</h5>
            </div>
            <div className="card-body">
              <div className="text-center mb-3">
                <div className="display-4 fw-bold text-primary">{calculateOverallProgress()}%</div>
                <p className="text-muted">Schedule Completion</p>
              </div>
              
              <div className="progress mb-4" style={{ height: '20px' }}>
                <div 
                  className="progress-bar bg-primary" 
                  role="progressbar" 
                  style={{ width: `${calculateOverallProgress()}%` }}
                  aria-valuenow={calculateOverallProgress()} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                >
                  {calculateOverallProgress()}%
                </div>
              </div>
              
              <div className="d-grid">
                <button className="btn btn-outline-primary">
                  <FontAwesomeIcon icon={faArrowRight} className="me-2" />
                  View Detailed Analytics
                </button>
              </div>
            </div>
          </div>
          
          {/* AI Recommendations */}
          {renderAIRecommendations()}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
