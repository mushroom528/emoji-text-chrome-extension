import { useState } from 'react'
import './App.css'
import "tailwindcss/tailwind.css";

function App() {
  const [text, setText] = useState('');
  const [level, setLevel] = useState('medium');
  const [result, setResult] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const maxLength = 300;

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_EMOJI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [import.meta.env.VITE_EMOJI_API_HEADER]: import.meta.env.VITE_EMOJI_API_KEY
        },
        body: JSON.stringify({ text, level }),
      });
      const data = await response.text();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= maxLength) {
      setText(inputText);
    }
  };

  const emojiLevels = [
    {
      text: "Small",
      value: "small"
    },
    {
      text: "Medium😙",
      value: "medium"
    },
    {
      text: "😎Large😎",
      value: "large"
    },
  ]

  return (
    <div className="w-[400px] min-h-[450px] bg-white">
      <header className="bg-purple-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">😙Text Emojis😙</h1>
        </div>
      </header>
      <main className="p-4">
        <div className="mb-4 relative">
          <textarea
            className="w-full p-3 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows="6"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter your text..."
            maxLength={maxLength}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {text.length}/{maxLength}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Emoji Level</label>
          <div className="flex justify-between space-x-2">
            {emojiLevels.map((option) => (
              <button
                key={option.value}
                onClick={() => setLevel(option.value)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded ${
                  level === option.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full bg-purple-600 text-white py-2 px-4 text-sm font-medium rounded hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Adding Emojis...' : 'Add Emojis'}
        </button>
        {isLoading && (
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
        {result && (
          <div className="mt-6 relative">
            <div className="p-4 bg-gray-100 rounded h-[144px] overflow-y-auto">
              <p className="text-gray-800 text-sm">{result}</p>
            </div>
            <button
              onClick={handleCopy}
              className="absolute bottom-2 right-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 py-1 px-2 rounded text-xs flex items-center transition-colors duration-200"
              title="Copy result"
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
        )}
      </main>
    </div>
  )
}

export default App
