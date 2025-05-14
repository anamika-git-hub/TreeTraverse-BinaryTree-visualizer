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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Binary Tree Visualizer</h1>

      <div className="flex justify-center gap-3 mb-6">
        <input
          className="px-4 py-2 text-black rounded"
          placeholder="Enter number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="btn" onClick={handleAdd}>Insert</button>
      </div>

      {error && <p className="text-center text-red-400 mb-4">{error}</p>}

      <TreeVisualizer root={treeRoot} />
    </div>
  );
}

export default App;
