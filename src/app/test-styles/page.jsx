export default function TestStyles() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Tailwind CSS Test</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Style Test</h2>
          <p className="text-gray-600 mb-4">
            If you can see this styled content, Tailwind CSS is working correctly.
          </p>
          
          <div className="flex gap-4 mb-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Blue Button
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Green Button
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Red Button
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-100 p-4 rounded">
              <h3 className="font-bold text-yellow-800">Card 1</h3>
              <p className="text-yellow-600">Responsive grid test</p>
            </div>
            <div className="bg-purple-100 p-4 rounded">
              <h3 className="font-bold text-purple-800">Card 2</h3>
              <p className="text-purple-600">Responsive grid test</p>
            </div>
            <div className="bg-pink-100 p-4 rounded">
              <h3 className="font-bold text-pink-800">Card 3</h3>
              <p className="text-pink-600">Responsive grid test</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Gradient Test</h3>
          <p>If you see a cyan to blue gradient, gradients are working!</p>
        </div>
      </div>
    </div>
  )
} 