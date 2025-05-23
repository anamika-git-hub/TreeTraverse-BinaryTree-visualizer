import React, { useState } from "react";
import TreeNode from "./TreeNode";
import { inorder, preOrder, postOrder, levelOrder } from "../utils/traversals";

const sleep = ms => new Promise(res => setTimeout(res, ms));

const TreeVisualizer = ({ root }) => {
    const [highlighted, setHighlighted] = useState(null);
    const [activeAlgorithm, setActiveAlgorithm] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [visitedArr, setVisitedArr] = useState([]);

    const visit = async (node) => {
        setHighlighted(node);
        setVisitedArr(prev => [...prev, node.value]);
        await sleep(600);
    };

    const handleTraversal = async (type) => {
        if (isRunning) return;
        
        setIsRunning(true);
        setActiveAlgorithm(type);
        setHighlighted(null);
        setVisitedArr([])
        
        try {
            if (type === 'inorder') await inorder(root, visit);
            else if (type === 'preorder') await preOrder(root, visit);
            else if (type === 'postorder') await postOrder(root, visit);
            else if (type === 'level') await levelOrder(root, visit);
        } finally {
            setHighlighted(null);
            setIsRunning(false);
            setTimeout(() => setVisitedArr([]), 1000);
        }
    };

    const getButtonClass = (type) => {
        const baseClasses = "py-2 px-4 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2";
      
        if (isRunning) {
            return `${baseClasses} ${
                activeAlgorithm === type
                    ? "bg-blue-800 text-white ring-2 ring-blue-400 cursor-default"
                    : "bg-gray-600 text-gray-300 cursor-not-allowed opacity-50"
            }`;
        }
        
        return `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white`;
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
                <button 
                    className={getButtonClass('inorder')}
                    onClick={() => handleTraversal('inorder')}
                    disabled={isRunning}
                >
                    Inorder
                </button>
                <button 
                    className={getButtonClass('preorder')}
                    onClick={() => handleTraversal('preorder')}
                    disabled={isRunning}
                >
                    Preorder
                </button>
                <button 
                    className={getButtonClass('postorder')}
                    onClick={() => handleTraversal('postorder')}
                    disabled={isRunning}
                >
                    Postorder
                </button>
                <button 
                    className={getButtonClass('level')}
                    onClick={() => handleTraversal('level')}
                    disabled={isRunning}
                >
                    Level Order
                </button>

            </div>
                         {visitedArr && visitedArr.length > 0 && (
                <div className="mt-0 text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Traversal Order:</h3>
                    <div className="flex flex-wrap justify-center gap-2 text-blue-300">
                        {visitedArr.map((val, index) => (
                            <span key={index} className="bg-blue-800 px-3 py-1 rounded-lg shadow-md">
                                {val}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            {!root && (
                <div className="text-gray-400 italic mt-4">
                    Add nodes to visualize the tree
                </div>
            )}
            <div className="flex flex-col items-center overflow-auto p-4">
                
                {renderTree(root, highlighted)}
            </div>
        </div>
    );
};


const Line = ({ direction }) => {
    return (
        <div
            className={`absolute w-1 bg-gray-500 ${
                direction === 'left' ? 'left-10 rotate-45 top-[-25px]' : 'right-10 -rotate-45 top-[-25px]'
            } h-8 origin-top`}
        >
        </div>
    );
};

const getTreeWidth = (node) => {
    if (!node) return 0;
    if (!node.left && !node.right) return 1;
    
    const leftWidth = getTreeWidth(node.left);
    const rightWidth = getTreeWidth(node.right);
    
    return leftWidth + rightWidth;
};

const renderTree = (node, highlighted) => {
    if (!node) return null;
    
    const leftWidth = getTreeWidth(node.left);
    const rightWidth = getTreeWidth(node.right);
    
    const calculatedGap = Math.max(8, (leftWidth + rightWidth) * 8);
    
    return (
        <div className="flex flex-col items-center relative">

            <TreeNode value={node.value} highlighted={node === highlighted} />
            {(node.left || node.right) && (
                <div className="flex mt-6 relative" style={{ gap: `${calculatedGap}px` }}>
                    {node.left && (
                        <div className="relative flex flex-col items-center">
                            <svg 
                                className="absolute -top-6" 
                                style={{
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: `${calculatedGap / 2 + 30}px`,
                                    height: '24px',
                                    overflow: 'visible'
                                }}
                            >
                                <line
                                    x1={calculatedGap / 2 + 30}
                                    y1="0"
                                    x2="30"
                                    y2="24"
                                    stroke="#9CA3AF"
                                    strokeWidth="2"
                                />
                            </svg>
                            {renderTree(node.left, highlighted)}
                        </div>
                    )}
                    {!node.left && node.right && <div style={{ width: `${calculatedGap / 2}px` }}></div>}
                    {node.right && (
                        <div className="relative flex flex-col items-center">
                            <svg 
                                className="absolute -top-6" 
                                style={{
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: `${calculatedGap / 2 + 30}px`,
                                    height: '24px',
                                    overflow: 'visible'
                                }}
                            >
                                <line
                                    x1="0"
                                    y1="0"
                                    x2={calculatedGap / 2}
                                    y2="24"
                                    stroke="#9CA3AF"
                                    strokeWidth="2"
                                />
                            </svg>
                            {renderTree(node.right, highlighted)} 
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TreeVisualizer;