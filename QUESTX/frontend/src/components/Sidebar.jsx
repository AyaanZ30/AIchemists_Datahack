import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, AcademicCapIcon, BookOpenIcon, ChatBubbleLeftRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} bg-questx-gradient from-questx-from to-questx-to dark:from-gray-800 dark:to-gray-900 text-white transition-all duration-300 ease-in-out`}>
      {/* Toggle Button */}
      <div className="flex items-center justify-end h-16 p-2 bg-white bg-opacity-10 backdrop-blur-sm shadow-md">
        <button
          onClick={toggleSidebar}
          className="text-white hover:bg-gray-700 p-1 rounded-md focus:outline-none"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="h-6 w-6" />
          ) : (
            <ChevronLeftIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Logo */}
      <div className={`flex items-center justify-center h-20 shadow-md bg-white bg-opacity-10 backdrop-blur-sm transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-3xl font-bold uppercase text-white">QUESTX</h1>
      </div>

      {/* Menu Items */}
      <ul className="flex flex-col py-4">
        <li>
          <Link to="/dashboard" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-100 hover:text-white">
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200">
              <HomeIcon className="h-6 w-6" />
            </span>
            {!isCollapsed && <span className="text-sm font-medium">Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/flashcards" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-100 hover:text-white">
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200">
              <AcademicCapIcon className="h-6 w-6" />
            </span>
            {!isCollapsed && <span className="text-sm font-medium">Flashcards</span>}
          </Link>
        </li>
        <li>
          <Link to="/resources" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-100 hover:text-white">
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200">
              <BookOpenIcon className="h-6 w-6" />
            </span>
            {!isCollapsed && <span className="text-sm font-medium">Resources</span>}
          </Link>
        </li>
        <li>
          <Link to="/feedback" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-100 hover:text-white">
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200">
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
            </span>
            {!isCollapsed && <span className="text-sm font-medium">Feedback</span>}
          </Link>
        </li>
        <li>
          {/* <Link to="/" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-100 hover:text-white">
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200">
              <UserIcon className="h-6 w-6" />
            </span>
            {!isCollapsed && <span className="text-sm font-medium">Login/Signup</span>}
          </Link> */}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
