import React, { useState } from 'react';

function RecommendationForm() {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setRecommendation(null);
    if (!name || !score) {
      setError('Please enter both name and score.');
      return;
    }
    try {
      const response = await fetch('/get-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, score: parseFloat(score) })
      });
      if (!response.ok) {
        throw new Error('Failed to get recommendation');
      }
      const data = await response.json();
      setRecommendation(data);
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Learning Pathway Recommendation</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            required
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Performance Score:</label><br />
          <input
            type="number"
            value={score}
            onChange={e => setScore(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            min="0"
            max="100"
            required
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>Get Recommendation</button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
      {recommendation && (
        <div style={{ marginTop: 24 }}>
          <h3>Recommendation for {recommendation.studentName}</h3>
          <p><strong>Level:</strong> {recommendation.level}</p>
          <p><strong>Recommended Courses:</strong></p>
          <ul>
            {recommendation.recommendedCourses.map((course, idx) => (
              <li key={idx}>{course}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecommendationForm;
