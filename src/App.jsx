import { useState } from 'react'
import './App.css'
import "tailwindcss/tailwind.css";

function App() {
  const [text, setText] = useState('');
  const [level, setLevel] = useState('medium');
  const [result, setResult] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSubmit = async () => {
    // Implement server request logic here
    const response = await fetch('YOUR_SERVER_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, level }),
    });
    const data = await response.json();
    setResult(data.result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset button after 2 seconds
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="w-[400px] min-h-[450px] bg-white">
      <header className="bg-purple-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold mr-2">🪄</span>
          <h1 className="text-xl font-bold">EmojiWizard</h1>
        </div>
      </header>
      <main className="p-4">
        <div className="mb-4 relative">
          <textarea
            className="w-full p-3 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows="6"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text..."
          />
          <button
            onClick={handleCopy}
            className={`absolute bottom-2 right-2 ${
              copySuccess ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } py-1 px-2 rounded text-xs flex items-center transition-colors duration-200`}
            title="Copy text"
          >
            {copySuccess ? (
              <>✔ Copied!</>
            ) : (
              <>
                <span className="mr-1">📋</span> Copy
              </>
            )}
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Emoji Level</label>
          <div className="flex justify-between space-x-2">
            {['small', 'medium', 'large'].map((option) => (
              <button
                key={option}
                onClick={() => setLevel(option)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded ${
                  level === option
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 text-white py-2 px-4 text-sm font-medium rounded hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Add Emojis
        </button>
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <p className="text-gray-800 text-sm">{result}</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App