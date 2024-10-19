import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import Sidebar from './components/Sidebar';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Flashcards from './components/Flashcards';
import Resources from './components/Resources';
import Feedback from './components/Feedback';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation(); // Get the current path

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Conditionally render Sidebar only if the route is not the login page */}
      {location.pathname !== '/' && <Sidebar />}

      <div className="flex-1 flex flex-col overflow-hidden bg-questx-gradient from-questx-from to-questx-to dark:from-gray-800 dark:to-gray-900 transition-colors duration-200">
        <header className="bg-white bg-opacity-90 dark:bg-gray-700 shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-questx-from dark:text-white">QUESTX</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-questx-from dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
          >
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
