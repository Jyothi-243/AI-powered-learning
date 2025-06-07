/**
 * AI Service - Simulates AI-powered learning features
 * This service provides functions to generate personalized schedules, recommendations,
 * and study reminders based on student performance data.
 */

// Student performance data (in a real app, this would come from an API)
const studentData = {
  name: "John Doe",
  subjects: {
    Math: {
      testResults: [
        { id: 1, name: "Algebra Quiz", score: 75, date: "2025-05-20" },
        { id: 2, name: "Calculus Test", score: 65, date: "2025-05-28" },
        { id: 3, name: "Geometry Assessment", score: 82, date: "2025-06-05" }
      ],
      averageScore: 74,
      strengths: ["Geometry", "Basic Algebra"],
      weaknesses: ["Calculus", "Advanced Equations"],
      recommendedHours: 2.5,
      progress: 60
    },
    Science: {
      testResults: [
        { id: 1, name: "Physics Quiz", score: 88, date: "2025-05-22" },
        { id: 2, name: "Chemistry Test", score: 72, date: "2025-05-30" },
        { id: 3, name: "Biology Assessment", score: 90, date: "2025-06-04" }
      ],
      averageScore: 83,
      strengths: ["Biology", "Physics Concepts"],
      weaknesses: ["Chemical Equations", "Molecular Structure"],
      recommendedHours: 1.5,
      progress: 85
    },
    English: {
      testResults: [
        { id: 1, name: "Grammar Quiz", score: 65, date: "2025-05-21" },
        { id: 2, name: "Literature Test", score: 78, date: "2025-05-29" },
        { id: 3, name: "Essay Assessment", score: 70, date: "2025-06-03" }
      ],
      averageScore: 71,
      strengths: ["Reading Comprehension", "Literature Analysis"],
      weaknesses: ["Grammar", "Essay Structure"],
      recommendedHours: 2,
      progress: 45
    }
  },
  learningStyle: "visual",
  availableHours: 6,
  lastActive: "2025-06-06",
  overallProgress: 65
};

// Content recommendations based on subject and student performance
const contentRecommendations = {
  Math: {
    general: [
      { type: "document", title: "Google Doc: Algebra Fundamentals", url: "https://docs.google.com/document/d/math-general1" },
      { type: "video", title: "YouTube: Math Concepts Explained", url: "https://youtube.com/watch?v=math-general1" }
    ],
    // Recommendations based on weaknesses
    "Calculus": [
      { type: "document", title: "Google Doc: Calculus Made Simple", url: "https://docs.google.com/document/d/math-calc1" },
      { type: "video", title: "YouTube: Understanding Derivatives", url: "https://youtube.com/watch?v=math-calc1" }
    ],
    "Advanced Equations": [
      { type: "document", title: "Google Doc: Mastering Complex Equations", url: "https://docs.google.com/document/d/math-adv1" },
      { type: "video", title: "YouTube: Solving Advanced Equations Step by Step", url: "https://youtube.com/watch?v=math-adv1" }
    ]
  },
  Science: {
    general: [
      { type: "document", title: "Google Doc: Science Study Guide", url: "https://docs.google.com/document/d/science-general1" },
      { type: "video", title: "YouTube: Science Concepts Overview", url: "https://youtube.com/watch?v=science-general1" }
    ],
    "Chemical Equations": [
      { type: "document", title: "Google Doc: Balancing Chemical Equations", url: "https://docs.google.com/document/d/science-chem1" },
      { type: "video", title: "YouTube: Chemical Equations Explained", url: "https://youtube.com/watch?v=science-chem1" }
    ],
    "Molecular Structure": [
      { type: "document", title: "Google Doc: Understanding Molecular Structures", url: "https://docs.google.com/document/d/science-mol1" },
      { type: "video", title: "YouTube: Visualizing Molecular Structures", url: "https://youtube.com/watch?v=science-mol1" }
    ]
  },
  English: {
    general: [
      { type: "document", title: "Google Doc: English Language Guide", url: "https://docs.google.com/document/d/english-general1" },
      { type: "video", title: "YouTube: English Language Skills", url: "https://youtube.com/watch?v=english-general1" }
    ],
    "Grammar": [
      { type: "document", title: "Google Doc: Grammar Rules Simplified", url: "https://docs.google.com/document/d/english-gram1" },
      { type: "video", title: "YouTube: Grammar Tips and Tricks", url: "https://youtube.com/watch?v=english-gram1" }
    ],
    "Essay Structure": [
      { type: "document", title: "Google Doc: Essay Writing Framework", url: "https://docs.google.com/document/d/english-essay1" },
      { type: "video", title: "YouTube: How to Structure an Essay", url: "https://youtube.com/watch?v=english-essay1" }
    ]
  }
};

/**
 * Generate a personalized study schedule based on student performance
 * @returns {Object} Personalized schedule with daily and weekly views
 */
export const generatePersonalizedSchedule = () => {
  const today = new Date();
  const schedule = {
    daily: [],
    weekly: []
  };

  // Generate daily schedule based on student performance
  Object.keys(studentData.subjects).forEach((subject, index) => {
    const subjectData = studentData.subjects[subject];
    const recommendedHours = subjectData.recommendedHours;
    const recommendedMinutes = recommendedHours * 60;
    const priority = getPriorityFromScore(subjectData.averageScore);
    const startHour = 9 + (index * 2); // Simple time allocation starting from 9 AM
    
    // Create a study session for today
    schedule.daily.push({
      id: index + 1,
      subject: subject,
      startTime: `${startHour < 10 ? '0' + startHour : startHour}:00`,
      endTime: `${startHour + Math.floor(recommendedHours) < 10 ? '0' + (startHour + Math.floor(recommendedHours)) : startHour + Math.floor(recommendedHours)}:${(recommendedHours % 1) * 60 === 0 ? '00' : (recommendedHours % 1) * 60}`,
      duration: recommendedMinutes,
      completed: false,
      priority: priority,
      progress: 0,
      type: getStudyTypeForSubject(subject),
      description: getStudyDescriptionForSubject(subject, subjectData)
    });
  });

  // Generate weekly schedule
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  for (let i = 0; i < 7; i++) {
    const dayIndex = (today.getDay() + i) % 7;
    const dayName = daysOfWeek[dayIndex];
    const isToday = i === 0;
    const isWeekend = dayIndex === 0 || dayIndex === 6;
    
    // Weekend has lighter schedule
    const daySubjects = isWeekend 
      ? Object.keys(studentData.subjects).slice(0, 1) 
      : Object.keys(studentData.subjects);
    
    const subjects = daySubjects.map(subject => {
      const subjectData = studentData.subjects[subject];
      // Adjust hours based on day of week and performance
      let adjustedHours = subjectData.recommendedHours;
      if (isWeekend) adjustedHours *= 0.5;
      
      return {
        name: subject,
        duration: adjustedHours * 60,
        priority: getPriorityFromScore(subjectData.averageScore)
      };
    });
    
    schedule.weekly.push({
      day: dayName,
      subjects: subjects,
      totalHours: subjects.reduce((total, subject) => total + (subject.duration / 60), 0),
      completed: isToday ? false : (i < 0), // Past days are completed
      rest: isWeekend && subjects.length === 0
    });
  }

  return schedule;
};

/**
 * Generate study reminders based on schedule and performance
 * @returns {Array} List of study reminders
 */
export const generateStudyReminders = () => {
  const reminders = [];
  
  Object.keys(studentData.subjects).forEach(subject => {
    const subjectData = studentData.subjects[subject];
    const priority = getPriorityFromScore(subjectData.averageScore);
    
    // Create reminder based on subject performance
    let message = '';
    if (subjectData.averageScore < 70) {
      message = `Focus on ${subjectData.weaknesses[0]} concepts today to improve your score`;
    } else if (subjectData.averageScore < 85) {
      message = `Continue practicing ${subjectData.weaknesses[0]} to master the concepts`;
    } else {
      message = `Review ${subjectData.strengths[0]} to maintain your excellent progress`;
    }
    
    reminders.push({
      subject: subject,
      message: message,
      priority: priority,
      hours: subjectData.recommendedHours
    });
  });
  
  return reminders;
};

/**
 * Get content recommendations for a specific subject
 * @param {string} subject - Subject name
 * @returns {Array} List of recommended resources
 */
export const getContentRecommendations = (subject) => {
  if (!contentRecommendations[subject]) return [];
  
  const subjectData = studentData.subjects[subject];
  const recommendations = [...contentRecommendations[subject].general];
  
  // Add specific recommendations based on weaknesses
  subjectData.weaknesses.forEach(weakness => {
    if (contentRecommendations[subject][weakness]) {
      recommendations.push(...contentRecommendations[subject][weakness]);
    }
  });
  
  return recommendations;
};

/**
 * Get student performance data
 * @returns {Object} Student data including test results and progress
 */
export const getStudentData = () => {
  return studentData;
};

/**
 * Get subject progress data
 * @returns {Array} List of subjects with progress information
 */
export const getSubjectProgress = () => {
  return Object.keys(studentData.subjects).map(subject => {
    const subjectData = studentData.subjects[subject];
    return {
      subject: subject,
      totalMinutes: subjectData.recommendedHours * 60,
      completedMinutes: Math.round((subjectData.recommendedHours * 60) * (subjectData.progress / 100)),
      progress: subjectData.progress,
      lastStudied: studentData.lastActive
    };
  });
};

/**
 * Update subject progress
 * @param {string} subject - Subject name
 * @param {number} progress - New progress percentage
 */
export const updateSubjectProgress = (subject, progress) => {
  if (studentData.subjects[subject]) {
    studentData.subjects[subject].progress = progress;
    
    // Update overall progress
    const totalProgress = Object.keys(studentData.subjects).reduce((sum, subj) => {
      return sum + studentData.subjects[subj].progress;
    }, 0);
    
    studentData.overallProgress = Math.round(totalProgress / Object.keys(studentData.subjects).length);
  }
};

/**
 * Mark a study session as complete
 * @param {number} sessionId - ID of the study session
 * @param {string} subject - Subject name
 */
export const completeStudySession = (sessionId, subject) => {
  if (studentData.subjects[subject]) {
    // Update progress to 100%
    updateSubjectProgress(subject, 100);
    
    // Update last active date
    studentData.lastActive = new Date().toISOString().split('T')[0];
  }
};

// Helper functions
const getPriorityFromScore = (score) => {
  if (score < 70) return 'high';
  if (score < 85) return 'medium';
  return 'low';
};

const getStudyTypeForSubject = (subject) => {
  const types = {
    'Math': 'Practice Problems',
    'Science': 'Conceptual Review',
    'English': 'Reading & Writing'
  };
  return types[subject] || 'Study Session';
};

const getStudyDescriptionForSubject = (subject, data) => {
  if (data.averageScore < 70) {
    return `Focus on improving ${data.weaknesses.join(' and ')}`;
  } else if (data.averageScore < 85) {
    return `Continue strengthening your understanding of key concepts`;
  } else {
    return `Review and master advanced concepts`;
  }
};
