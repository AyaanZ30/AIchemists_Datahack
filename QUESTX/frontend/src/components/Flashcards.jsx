import { useState } from 'react'
import { PlusIcon, ArrowLeftIcon, ArrowRightIcon, SpeakerWaveIcon, VideoCameraIcon, PhotoIcon, DocumentTextIcon } from '@heroicons/react/24/solid'

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([
    {
      id: 1,
      question: 'What is the capital of France?',
      answer: 'Paris',
      type: 'text',
    },
    {
      id: 2,
      question: '/placeholder.svg?height=200&width=300',
      answer: 'This is an example image',
      type: 'image',
    },
    {
      id: 3,
      question: 'https://example.com/audio.mp3',
      answer: 'This is an example audio',
      type: 'audio',
    },
    {
      id: 4,
      question: 'https://example.com/video.mp4',
      answer: 'This is an example video',
      type: 'video',
    },
  ])

  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [inputContent, setInputContent] = useState('')

  const handleContentSubmit = (e) => {
    e.preventDefault()
    const newFlashcard = {
      id: flashcards.length + 1,
      question: 'New Question',
      answer: 'New Answer',
      type: 'text',
    }
    setFlashcards([...flashcards, newFlashcard])
    setInputContent('')
  }

  const handleNextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length)
    setIsFlipped(false)
  }

  const handlePrevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    setIsFlipped(false)
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Flashcards</h1>
      <form onSubmit={handleContentSubmit} className="mb-8">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder="Enter content or upload a file"
            className="flex-grow px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white placeholder-gray-300"
          />
          <button
                type="submit"
                className="px-4 py-2 bg-white text-[#000000a8] rounded-md hover:bg-opacity-90 transition-colors duration-300 flex items-center transform hover:scale-105"
                >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add
                </button>

        </div>
      </form>
      {flashcards.length > 0 ? (
        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="mb-4 relative perspective">
            <div
              className={`w-full h-64 transition-transform duration-500 transform ${
                isFlipped ? 'rotate-y-180' : ''
              } preserve-3d`}
            >
              <div className="absolute w-full h-full backface-hidden">
              <div className="bg-gradient-to-br from-[#000000a8] to-[#213547] p-6 rounded-lg h-full flex flex-col justify-between shadow-md">
                <h2 className="text-2xl font-semibold text-white mb-4">Question</h2>
                <div className="flex-grow flex items-center justify-center">
                    {renderCardContent(flashcards[currentCard].question, flashcards[currentCard].type)}
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                    <SpeakerWaveIcon className="h-6 w-6 text-white" />
                    <VideoCameraIcon className="h-6 w-6 text-white" />
                    <PhotoIcon className="h-6 w-6 text-white" />
                    <DocumentTextIcon className="h-6 w-6 text-white" />
                </div>
                </div>

              </div>
              <div className="absolute w-full h-full backface-hidden rotate-y-180">
              <div className="bg-gradient-to-br from-[#213547] to-[#000000a8] p-6 rounded-lg h-full flex flex-col justify-between shadow-md">
                <h2 className="text-2xl font-semibold text-white mb-4">Answer</h2>
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-xl text-white">{flashcards[currentCard].answer}</p>
                </div>
                </div>

              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrevCard}
              className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-md hover:bg-opacity-30 transition-colors duration-300 flex items-center transform hover:scale-105"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Previous
            </button>
            <button
              onClick={handleFlip}
              className="px-4 py-2 bg-white text-[#199ab1] rounded-md hover:bg-opacity-90 transition-colors duration-300 transform hover:scale-105"
            >
              {isFlipped ? 'Show Question' : 'Show Answer'}
            </button>
            <button
              onClick={handleNextCard}
              className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-md hover:bg-opacity-30 transition-colors duration-300 flex items-center transform hover:scale-105"
            >
              Next
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      ) : (
        <p className="text-white">No flashcards available. Add some content to get started!</p>
      )}
    </div>
  )
}

export default Flashcards