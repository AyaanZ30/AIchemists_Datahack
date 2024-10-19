import { BookOpenIcon, VideoCameraIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

const Resources = () => {
  const resources = [
    { title: 'Introduction to React', type: 'book', link: '#' },
    { title: 'JavaScript Fundamentals', type: 'video', link: '#' },
    { title: 'CSS Flexbox Guide', type: 'article', link: '#' },
  ]

  const getIcon = (type) => {
    switch (type) {
      case 'book':
        return <BookOpenIcon className="h-6 w-6 text-questx-from" />
      case 'video':
        return <VideoCameraIcon className="h-6 w-6 text-questx-from" />
      case 'article':
        return <DocumentTextIcon className="h-6 w-6 text-questx-from" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-questx-from dark:text-white mb-8">Recommended Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.link}
            className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start"
          >
            {getIcon(resource.type)}
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-questx-from dark:text-white mb-2">{resource.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 capitalize">{resource.type}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Resources