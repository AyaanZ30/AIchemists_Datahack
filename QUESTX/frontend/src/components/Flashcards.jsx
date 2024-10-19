import { useState } from 'react'
import { PlusIcon, ArrowLeftIcon, ArrowRightIcon, SpeakerWaveIcon, VideoCameraIcon, PhotoIcon, DocumentTextIcon } from '@heroicons/react/24/solid'

const EnterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12h12" />
    <path d="M15 8l4 4-4 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
)

const Flashcards = ({ darkMode }) => {
  const [flashcards, setFlashcards] = useState([
    {
      id: 1,
      question: 'What is the capital of France?',
      answer: 'Paris',
      type: 'text',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correctOption: 'Paris'
    },
    {
      id: 2,
      question: '/placeholder.svg?height=200&width=300',
      answer: 'This is an example image',
      type: 'image',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctOption: 'Option 2'
    },
    {
      id: 3,
      question: 'https://example.com/audio.mp3',
      answer: 'This is an example audio',
      type: 'audio',
      options: ['Choice A', 'Choice B', 'Choice C', 'Choice D'],
      correctOption: 'Choice A'
    },
    {
      id: 4,
      question: 'https://example.com/video.mp4',
      answer: 'This is an example video',
      type: 'video',
      options: ['First', 'Second', 'Third', 'Fourth'],
      correctOption: 'Third'
    },
  ])

  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [inputContent, setInputContent] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [selectedOption, setSelectedOption] = useState('')
  const [showResult, setShowResult] = useState(false)

  const handleContentSubmit = (e) => {
    e.preventDefault()
    const newFlashcard = {
      id: flashcards.length + 1,
      question: inputContent,
      answer: 'New Answer',
      type: 'text',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctOption: 'Option 1'
    }
    setFlashcards([...flashcards, newFlashcard])
    setInputContent('')
  }

  const handleNextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length)
    setIsFlipped(false)
    setSelectedOption('')
    setShowResult(false)
  }

  const handlePrevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    setIsFlipped(false)
    setSelectedOption('')
    setShowResult(false)
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    setShowResult(false)
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setShowResult(false)
  }

  const handleSubmit = () => {
    if (selectedOption) {
      setShowResult(true)
    }
  }

  const isCorrect = selectedOption === flashcards[currentCard].correctOption

  const renderCardContent = (content, type) => {
    switch (type) {
      case 'image':
        return <img src={content} alt="Flashcard content" className="w-full h-48 object-cover rounded-lg" />
      case 'audio':
        return (
          <div className="flex items-center justify-center h-48">
            <audio controls src={content} className="w-full max-w-xs">
              Your browser does not support the audio element.
            </audio>
          </div>
        )
      case 'video':
        return (
          <video controls className="w-full h-48 object-cover rounded-lg">
            <source src={content} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      default:
        return <p className="text-xl">{content}</p>
    }
  }

  const renderAnswer = () => (
    <div className="flex flex-col h-full">
      <div className="space-y-4 mb-6">
        {flashcards[currentCard].options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center space-x-3 text-lg ${
              darkMode ? 'text-white' : 'text-gray-800'
            } cursor-pointer hover:bg-opacity-10 hover:bg-blue-500 p-2 rounded-lg`}
          >
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionSelect(option)}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <span className="text-xl">{option}</span>
          </label>
        ))}
      </div>

      {showResult && (
        <div className={`text-center text-xl font-bold mb-4 ${
          isCorrect ? 'text-green-500' : 'text-red-500'
        }`}>
          {isCorrect ? 'You are Correct!' : 'You are Wrong!'}
        </div>
      )}
    </div>
  )

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className={`text-5xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Make Flashcards Your Way!
        </h1>
        <form onSubmit={handleContentSubmit} className="mb-12">
          <div className="flex items-center space-x-4">
            <div className="flex-grow relative">
              <input
                type="text"
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                placeholder="Enter the educational topic of your choice!"
                className={`w-full px-6 py-3 pr-12 ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                } border-2 ${
                  darkMode ? 'border-gray-700' : 'border-gray-300'
                } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              />
              <EnterIcon className={`h-6 w-6 absolute right-4 top-1/2 transform -translate-y-1/2 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`} />
            </div>
            <input
              type="file"
              id="file-upload"
              onChange={(e) => setUploadedFile(e.target.files[0])}
              className="hidden"
              accept="audio/*,video/*,image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 cursor-pointer flex items-center"
            >
              Upload
            </label>
          </div>
        </form>
        {flashcards.length > 0 ? (
          <div className={`${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } p-8 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl`}>
            <div className="mb-8 relative perspective">
              <div
                className={`w-full h-96 transition-transform duration-500 transform ${
                  isFlipped ? 'rotate-y-180' : ''
                } preserve-3d`}
              >
                <div className="absolute w-full h-full backface-hidden">
                  <div className={`${
                    darkMode ? 'bg-gray-700' : 'bg-blue-50'
                  } p-8 rounded-xl h-full flex flex-col justify-between shadow-lg`}>
                    <h2 className={`text-3xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Question</h2>
                    <div className="flex-grow flex items-center justify-center">
                      {renderCardContent(flashcards[currentCard].question, flashcards[currentCard].type)}
                    </div>
                    <div className="flex justify-center space-x-6 mt-6">
                      <DocumentTextIcon className={`h-8 w-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'} cursor-pointer transition-transform duration-300 transform hover:scale-110`} />
                      <PhotoIcon className={`h-8 w-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} cursor-pointer transition-transform duration-300 transform hover:scale-110`} />
                      <SpeakerWaveIcon className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'} cursor-pointer transition-transform duration-300 transform hover:scale-110`} />
                      <VideoCameraIcon className={`h-8 w-8 ${darkMode ? 'text-green-400' : 'text-green-600'} cursor-pointer transition-transform duration-300 transform hover:scale-110`} />
                    </div>
                  </div>
                </div>
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                  <div className={`${
                    darkMode ? 'bg-gray-700' : 'bg-green-50'
                  } p-8 rounded-xl h-full flex flex-col shadow-lg`}>
                    <h2 className={`text-3xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Answer</h2>
                    <div className="flex-grow flex flex-col justify-between">
                      {renderAnswer()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePrevCard}
                className={`px-6 py-3 ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                } rounded-full transition-all duration-300 flex items-center transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500`}
              >
                <ArrowLeftIcon className={`h-5 w-5 mr-2 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
                <span className={darkMode ? 'text-white' : 'text-gray-800'}>Previous</span>
              </button>
              <div className="flex space-x-4">
                <button
                  onClick={handleFlip}
                  className={`px-6 py-3 ${
                    darkMode ? 'bg-green-600 hover:bg-green-500' : 'bg-green-500 hover:bg-green-600'
                  } text-white rounded-full transition-all duration-300 flex items-center transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500`}
                >
                  {isFlipped ? 'Show Question' : 'Show Answer'}
                </button>
                {isFlipped && (
                  <button
                    onClick={handleSubmit}
                    className={`px-6 py-3 ${
                      darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white rounded-full transition-all duration-300 flex items-center transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    Submit
                  </button>
                )}
              </div>
              <button
                onClick={handleNextCard}
                className={`px-6 py-3 ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                } rounded-full transition-all duration-300 flex items-center transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500`}
              >
                <span className={darkMode ? 'text-white' : 'text-gray-800'}>Next</span>
                <ArrowRightIcon className={`h-5 w-5 ml-2 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
              </button>
            </div>
          </div>
        ) : (
          <div className={`text-center p-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <p>No flashcards available. Please add some!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Flashcards