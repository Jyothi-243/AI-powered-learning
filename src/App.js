import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <main>
            <AppRoutes />
          </main>
          <footer className="bg-light py-4 mt-5">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-0">&copy; 2025 AI-Powered Learning Platform. All rights reserved.</p>
                </div>
                <div className="col-md-6 text-md-end">
                  <a href="/privacy" className="text-decoration-none text-muted me-3">Privacy Policy</a>
                  <a href="/terms" className="text-decoration-none text-muted">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
