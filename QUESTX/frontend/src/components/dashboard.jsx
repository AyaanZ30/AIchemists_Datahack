import { Link } from 'react-router-dom'

const Dashboard = ({ darkMode }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-8`}>Welcome to QUESTX</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/flashcards" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Flashcards</h2>
          <p className="text-gray-600 dark:text-gray-300">Create and study flashcards to enhance your learning experience.</p>
        </Link>
        <Link to="/resources" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Resources</h2>
          <p className="text-gray-600 dark:text-gray-300">Discover recommended learning materials tailored to your needs.</p>
        </Link>
        <Link to="/feedback" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Feedback</h2>
          <p className="text-gray-600 dark:text-gray-300">View personalized insights and recommendations based on your performance.</p>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard