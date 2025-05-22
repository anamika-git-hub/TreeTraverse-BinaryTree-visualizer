import React, { useState, useEffect } from 'react';
import TreeVisualizer from './components/TreeVisualizer';
import { buildTreeFromArray } from './utils/TreeBuilder';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [values, setValues] = useState([]);
  const [error, setError] = useState('');
  const [treeRoot, setTreeRoot] = useState(null);

  useEffect(() => {
    setTreeRoot(buildTreeFromArray(values));
  }, [values]);

  const handleAdd = () => {
    const val = parseInt(inputValue.trim());
    if (isNaN(val)) {
      setError('Please enter a valid number');
    } else if (values.includes(val)) {
      setError('No duplicates allowed');
    } else if (values.length >= 15) {
      setError('Tree limit: 15 nodes max');
    } else {
      setValues([...values, val]);
      setError('');
    }
    setInputValue('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-400">Binary Tree Visualizer</h1>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8 w-full max-w-md mx-auto">
        <input
          className="px-4 py-2 text-black rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          placeholder="Enter number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 w-full sm:w-auto"
          onClick={handleAdd}
        >
          Insert
        </button>
      </div>

      {error && <p className="text-center text-red-400 mb-6 font-medium">{error}</p>}

      <div className="mt-4 mb-10 flex justify-center">
        {values.length > 0 ? (
          <div className="bg-gray-800 rounded-lg px-4 py-2 shadow-md">
            <span className="text-gray-400 mr-2">Current nodes:</span>
            <span className="text-blue-300 font-medium">{values.join(', ')}</span>
          </div>
        ) : (
          <p className="text-gray-400 italic">Add nodes to visualize the tree</p>
        )}
      </div>

      <TreeVisualizer root={treeRoot} />
    </div>
  );
}

export default App;