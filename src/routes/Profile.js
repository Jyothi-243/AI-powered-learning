import React, { useState } from 'react';
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
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // Mock data for user profile
  const mockUserData = {
    name: currentUser?.name || 'John Doe',
    email: currentUser?.email || 'john.doe@example.com',
    profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
    learningPath: [
      { id: 1, title: 'Introduction to Machine Learning', progress: 75 },
      { id: 2, title: 'Data Visualization Techniques', progress: 40 },
      { id: 3, title: 'Advanced Neural Networks', progress: 10 }
    ],
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
                  className="rounded-circle img-thumbnail" 
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
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
                    <p className="mb-1">
                      <strong>Strengths:</strong> Python Programming, Data Analysis
                    </p>
                    <p className="mb-1">
                      <strong>Areas for Improvement:</strong> Neural Networks, Deep Learning
                    </p>
                    <p className="mb-0">
                      <strong>Recommendation:</strong> Focus on completing the "Advanced Neural Networks" course to improve your skills in this area.
                    </p>
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
              <h4 className="mb-4">Your Learning Path</h4>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Current Progress</h5>
                  <span className="badge bg-primary">42% Complete</span>
                </div>
                <div className="progress mb-3" style={{ height: '10px' }}>
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ width: '42%', backgroundColor: '#5e72e4' }} 
                    aria-valuenow="42" 
                    aria-valuemin="0" 
                    aria-valuemax="100">
                  </div>
                </div>
                <p className="text-muted small">
                  You're making good progress! Keep going to unlock new achievements.
                </p>
              </div>
              
              <h5 className="mb-3">Courses in Your Path</h5>
              {mockUserData.learningPath.map((course, index) => (
                <div key={index} className="card mb-3 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">{course.title}</h6>
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
                      <Link to={`/course/${course.id}`} className="btn btn-sm btn-primary">
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
                      <strong>Based on your progress, we recommend:</strong>
                    </p>
                    <ul className="mb-0">
                      <li>Focus on completing "Introduction to Machine Learning" first</li>
                      <li>Schedule at least 3 hours per week for "Data Visualization Techniques"</li>
                      <li>Consider taking the "Python for Data Science" supplementary course</li>
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
