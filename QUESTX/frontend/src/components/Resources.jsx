import { BookOpenIcon, VideoCameraIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

const Resources = ({ darkMode }) => {
  const resources = [
    { title: 'Introduction to React', type: 'book', link: '#' },
    { title: 'JavaScript Fundamentals', type: 'video', link: '#' },
    { title: 'CSS Flexbox Guide', type: 'article', link: '#' },
  ]

  const getIcon = (type) => {
    switch (type) {
      case 'book':
        return <BookOpenIcon className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
      case 'video':
        return <VideoCameraIcon className={`h-6 w-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
      case 'article':
        return <DocumentTextIcon className={`h-6 w-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
      default:
        return null
    }
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <h1 className="text-4xl font-bold mb-8">Recommended Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.link}
            className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} p-6 rounded-lg shadow-md transition-shadow duration-300 flex items-start`}
          >
            {getIcon(resource.type)}
            <div className="ml-4">
              <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{resource.title}</h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} capitalize`}>{resource.type}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Resources