import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

const Feedback = () => {
  const feedbackData = {
    score: 80,
    correctAnswers: 8,
    totalQuestions: 10,
    strengths: ['React Hooks', 'CSS Flexbox'],
    areasForImprovement: ['JavaScript Promises', 'Redux State Management'],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-questx-from dark:text-white mb-8">Your Performance Feedback</h1>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-questx-from dark:text-white mb-2">Quiz Results</h2>
          <div className="flex items-center">
            <div className="text-5xl font-bold text-questx-from">{feedbackData.score}%</div>
            <div className="ml-4 text-gray-600 dark:text-gray-300">
              <p>{feedbackData.correctAnswers} correct out of {feedbackData.totalQuestions} questions</p>
            </div>
          </div>
        </div>
        <div  className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-green-600 mb-2 flex items-center">
              <CheckCircleIcon className="h-6 w-6 mr-2" />
              Strengths
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              {feedbackData.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-red-600 mb-2 flex items-center">
              <XCircleIcon className="h-6 w-6 mr-2" />
              Areas for Improvement
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              {feedbackData.areasForImprovement.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feedback