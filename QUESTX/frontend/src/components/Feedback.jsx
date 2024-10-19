import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Feedback = ({ darkMode }) => {
  const [showReport, setShowReport] = useState(false);

  const feedbackData = {
    score: 80,
    correctAnswers: 8,
    totalQuestions: 10,
    strengths: [
      { name: 'React Hooks', score: 85 },
      { name: 'CSS Flexbox', score: 90 },
    ],
    areasForImprovement: [
      { name: 'JavaScript Promises', score: 60 },
      { name: 'Redux State Management', score: 50 },
    ],
  };

  const getCardColor = () => {
    return darkMode ? 'bg-gray-800' : 'bg-white';
  };

  const toggleReport = () => setShowReport(!showReport);

  return (
    <div className={`container mx-auto px-4 py-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <h1 className="text-4xl font-bold mb-8 text-center">Your Performance Feedback for Growth!</h1>
      <motion.div 
        className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${getCardColor()}`}
        initial={{ scale: 0.95 }} 
        animate={{ scale: 1 }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Quiz Results</h2>
          <div className="flex items-center">
            <div className={`text-5xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{feedbackData.score}%</div>
            <div className={`ml-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>{feedbackData.correctAnswers} correct out of {feedbackData.totalQuestions} questions</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths Card */}
          <motion.div 
            className={`relative p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-green-600 mb-2 flex items-center">
              <CheckCircleIcon className="h-6 w-6 mr-2" />
              Strengths
            </h3>
            <ul className={`list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {feedbackData.strengths.map((strength, index) => (
                <li key={index}>{strength.name}</li>
              ))}
            </ul>
          </motion.div>
          {/* Areas for Improvement Card */}
          <motion.div 
            className={`relative p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-red-600 mb-2 flex items-center">
              <XCircleIcon className="h-6 w-6 mr-2" />
              Areas for Improvement
            </h3>
            <ul className={`list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {feedbackData.areasForImprovement.map((area, index) => (
                <li key={index}>{area.name}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
      <div className="mt-8 text-center">
        <motion.button 
          className={`px-6 py-3 rounded-full ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-500 text-white hover:bg-blue-400'} transition-colors duration-300`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleReport}
        >
          {showReport ? 'Hide Detailed Report' : 'View Detailed Report'}
        </motion.button>
      </div>

      {showReport && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths Bar Chart */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Strengths Breakdown</h2>
            {feedbackData.strengths.map((strength, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{strength.name}</span>
                  <span>{strength.score}%</span>
                </div>
                <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-width duration-500"
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Areas for Improvement Bar Chart */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Areas for Improvement</h2>
            {feedbackData.areasForImprovement.map((area, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{area.name}</span>
                  <span>{area.score}%</span>
                </div>
                <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 transition-width duration-500"
                    style={{ width: `${area.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
