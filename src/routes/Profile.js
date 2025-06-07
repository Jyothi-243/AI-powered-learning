import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faGraduationCap, faMedal, faCog, 
  faEdit, faChartLine, faCheckCircle, faRocket,
  faCalendarCheck, faCompass, faBell, faCalendarAlt,
  faFileAlt, faBook, faLightbulb, faClock
} from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { getStudentData, getSubjectProgress, getContentRecommendations, updateSubjectProgress } from '../utils/aiService';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // Get real-time student data from AI service
  const studentInfo = getStudentData();

  // State for dynamic study sessions, recommendations, and reminders
  const [studySessions, setStudySessions] = useState([]);
  const [studyReminders, setStudyReminders] = useState([]);

  // Load AI-generated data on component mount
  useEffect(() => {
    // Get subject progress data
    const progressData = getSubjectProgress();
    setStudySessions(progressData);

    // Generate study reminders based on student performance
    // Using the same reminders from the Schedule page for consistency
    const { subjects } = studentInfo;
    const reminders = Object.keys(subjects).map(subject => {
      const subjectData = subjects[subject];
      const priority = getPriorityFromScore(subjectData.averageScore);

      // Create reminder based on subject performance
      let message = '';
      if (subjectData.averageScore < 70) {
        message = `Focus on ${subjectData.weaknesses[0]} concepts to improve your score`;
      } else if (subjectData.averageScore < 85) {
        message = `Continue practicing ${subjectData.weaknesses[0]} to master the concepts`;
      } else {
        message = `Review ${subjectData.strengths[0]} to maintain your excellent progress`;
      }

      return {
        subject,
        message,
        priority,
        hours: subjectData.recommendedHours
      };
    });

    setStudyReminders(reminders);
  }, []);

  // Helper function to determine priority based on score
  const getPriorityFromScore = (score) => {
    if (score < 70) return 'high';
    if (score < 85) return 'medium';
    return 'low';
  };

  // Mock data for user profile - enhanced with real-time AI data
  const mockUserData = {
    name: currentUser?.name || studentInfo.name,
    email: currentUser?.email || 'john.doe@example.com',
    profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
    overallProgress: studentInfo.overallProgress,
    learningPath: studySessions,
    achievements: [
      { id: 1, title: 'Fast Learner', description: 'Completed 5 courses in one month', icon: faRocket },
      { id: 2, title: 'Perfect Score', description: 'Achieved 100% on a quiz', icon: faCheckCircle },
      { id: 3, title: 'Consistent Learner', description: 'Logged in for 7 consecutive days', icon: faCalendarCheck },
      { id: 4, title: 'Knowledge Explorer', description: 'Completed courses from 3 different categories', icon: faCompass }
    ],
    skills: [
      { name: 'Python Programming', level: 80 },
      { name: 'Data Analysis', level: 65 },
      { name: 'Machine Learning', level: 45 },
      { name: 'Neural Networks', level: 30 }
    ]
  };

  // Render the appropriate content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <img 
                  src={mockUserData.profilePicture} 
                  alt="Profile" 
                  className="rounded-circle img-fluid" 
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }} 
                />
                <h3 className="mt-3">{mockUserData.name}</h3>
                <p className="text-muted">{mockUserData.email}</p>
                <button className="btn btn-sm btn-outline-primary">
                  <FontAwesomeIcon icon={faEdit} className="me-2" />
                  Edit Profile
                </button>
              </div>
              
              <h4 className="mb-3">Skills Analysis</h4>
              {mockUserData.skills.map((skill, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="progress" style={{ height: '10px' }}>
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ width: `${skill.level}%`, backgroundColor: getSkillColor(skill.level) }} 
                      aria-valuenow={skill.level} 
                      aria-valuemin="0" 
                      aria-valuemax="100">
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4">
                <h4 className="mb-3">AI-Powered Insights</h4>
                <div className="card bg-light border-0">
                  <div className="card-body">
                    {Object.keys(studentInfo.subjects).map((subject, idx) => (
                      <div key={idx} className="mb-2">
                        <p className="mb-1">
                          <strong>{subject} Analysis:</strong>
                        </p>
                        <p className="mb-1 ms-3">
                          <strong>Strengths:</strong> {studentInfo.subjects[subject].strengths.join(', ')}
                        </p>
                        <p className="mb-1 ms-3">
                          <strong>Areas for Improvement:</strong> {studentInfo.subjects[subject].weaknesses.join(', ')}
                        </p>
                        <p className="mb-1 ms-3">
                          <strong>Average Score:</strong> {studentInfo.subjects[subject].averageScore}%
                        </p>
                      </div>
                    ))}
                    <div className="mt-3">
                      <h6 className="mb-2">Study Reminders:</h6>
                      <ul className="list-group list-group-flush">
                        {studyReminders.map((reminder, index) => (
                          <li key={index} className="list-group-item d-flex align-items-start px-0 py-2 border-0">
                            <div className={`badge bg-${getPriorityColor(reminder.priority)} me-3 mt-1`}>
                              {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)}
                            </div>
                            <div>
                              <strong>{reminder.subject}:</strong> {reminder.message}
                              <div><small className="text-muted">Recommended: {reminder.hours} hours</small></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'learning-path':
        return (
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h4 className="mb-4">Learning Path</h4>
              
              {/* AI-Powered Study Progress Section */}
              <div className="mb-4">
                <h5 className="mb-3">Study Progress</h5>
                {studySessions.map((session, index) => (
                  <div key={index} className="card mb-3 border-left-accent" style={{ borderLeft: `4px solid ${getSkillColor(session.progress)}` }}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0">{session.subject}</h6>
                        <span className="badge bg-info">{session.progress}% Complete</span>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar" 
                          role="progressbar" 
                          style={{ width: `${session.progress}%`, backgroundColor: getSkillColor(session.progress) }} 
                          aria-valuenow={session.progress} 
                          aria-valuemin="0" 
                          aria-valuemax="100">
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <small className="text-muted">
                          <FontAwesomeIcon icon={faClock} className="me-1" /> 
                          {session.completedMinutes} of {session.totalMinutes} minutes
                        </small>
                        <small className="text-muted">
                          <FontAwesomeIcon icon={faCalendarAlt} className="me-1" /> 
                          Last studied: {session.lastStudied}
                        </small>
                      </div>
                      
                      {/* AI-Powered Content Recommendations */}
                      <div className="mt-3">
                        <h6 className="text-primary">
                          <FontAwesomeIcon icon={faLightbulb} className="me-2" />
                          Recommended Resources:
                        </h6>
                        <ul className="list-group list-group-flush">
                          {getContentRecommendations(session.subject).slice(0, 2).map((item, idx) => (
                            <li key={idx} className="list-group-item px-0 py-2 border-0">
                              <FontAwesomeIcon 
                                icon={item.type === 'document' ? faFileAlt : faYoutube} 
                                className={`me-2 ${item.type === 'document' ? 'text-primary' : 'text-danger'}`} 
                              />
                              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                {item.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Original Learning Path Courses */}
              <h5 className="mb-3">Available Courses</h5>
              {mockUserData.learningPath.map((course, index) => (
                <div key={index} className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">{course.subject}</h6>
                      <span className="badge bg-info">{course.progress}% Complete</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{ width: `${course.progress}%`, backgroundColor: '#5e72e4' }} 
                        aria-valuenow={course.progress} 
                        aria-valuemin="0" 
                        aria-valuemax="100">
                      </div>
                    </div>
                    <div className="mt-3">
                      <Link to={`/course/${index+1}`} className="btn btn-sm btn-primary">
                        {course.progress > 0 ? 'Continue' : 'Start'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4">
                <h5 className="mb-3">AI-Powered Recommendations</h5>
                <div className="card bg-light border-0">
                  <div className="card-body">
                    <p className="mb-2">
                      <strong>Based on your performance, we recommend:</strong>
                    </p>
                    <ul className="mb-0">
                      {Object.keys(studentInfo.subjects).map((subject, idx) => {
                        const subjectData = studentInfo.subjects[subject];
                        let recommendation = '';
                        
                        if (subjectData.averageScore < 70) {
                          recommendation = `Focus on ${subject} (${subjectData.recommendedHours} hours/day) to improve your ${subjectData.weaknesses[0]} skills`;
                        } else if (subjectData.averageScore < 85) {
                          recommendation = `Continue with ${subject} (${subjectData.recommendedHours} hours/week) to master ${subjectData.weaknesses[0]}`;
                        } else {
                          recommendation = `Maintain your excellent progress in ${subject} with advanced exercises`;
                        }
                        
                        return <li key={idx}>{recommendation}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'achievements':
        return (
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h4 className="mb-4">Your Achievements</h4>
              
              <div className="row">
                {mockUserData.achievements.map((achievement, index) => (
                  <div key={index} className="col-md-6 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body text-center p-4">
                        <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                          <FontAwesomeIcon icon={achievement.icon || faMedal} size="2x" className="text-primary" />
                        </div>
                        <h5>{achievement.title}</h5>
                        <p className="text-muted small mb-0">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-4">
                <p className="text-muted">Complete more courses to unlock additional achievements!</p>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h4 className="mb-4">Account Settings</h4>
              
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    defaultValue={mockUserData.name} 
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    defaultValue={mockUserData.email} 
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">New Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="Leave blank to keep current password" 
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    id="profilePicture" 
                  />
                </div>
                
                <h5 className="mb-3">Preferences</h5>
                
                <div className="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="emailNotifications" 
                    defaultChecked 
                  />
                  <label className="form-check-label" htmlFor="emailNotifications">
                    Receive email notifications
                  </label>
                </div>
                
                <div className="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="progressReminders" 
                    defaultChecked 
                  />
                  <label className="form-check-label" htmlFor="progressReminders">
                    Receive weekly progress reminders
                  </label>
                </div>
                
                <div className="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="courseRecommendations" 
                    defaultChecked 
                  />
                  <label className="form-check-label" htmlFor="courseRecommendations">
                    Receive course recommendations
                  </label>
                </div>
                
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </form>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Helper function to determine skill level color
  const getSkillColor = (level) => {
    if (level < 30) return '#f5365c'; // red
    if (level < 60) return '#fb6340'; // orange
    if (level < 80) return '#ffd600'; // yellow
    return '#2dce89'; // green
  };
  
  // Helper function to determine priority color
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'info';
    }
  };

  // Icons are now properly imported at the top of the file

  return (
    <div className="container py-5">
      <div className="row">
        {/* Sidebar Navigation */}
        <div className="col-lg-3 mb-4 mb-lg-0">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FontAwesomeIcon icon={faUser} className="me-2" /> Profile
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'learning-path' ? 'active' : ''}`}
                  onClick={() => setActiveTab('learning-path')}
                >
                  <FontAwesomeIcon icon={faGraduationCap} className="me-2" /> Learning Path
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'achievements' ? 'active' : ''}`}
                  onClick={() => setActiveTab('achievements')}
                >
                  <FontAwesomeIcon icon={faMedal} className="me-2" /> Achievements
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="col-lg-9">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default Profile;
