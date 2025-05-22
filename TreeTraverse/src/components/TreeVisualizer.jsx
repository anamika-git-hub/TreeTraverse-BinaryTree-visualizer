import React, { useState } from "react";
import TreeNode from "./TreeNode";
import { inorder, preOrder, postOrder, levelOrder } from "../utils/traversals";

const sleep = ms => new Promise(res => setTimeout(res, ms));

const TreeVisualizer = ({ root }) => {
    const [highlighted, setHighlighted] = useState(null);
    const [activeAlgorithm, setActiveAlgorithm] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const visit = async (node) => {
        setHighlighted(node);
        await sleep(600);
    };

    const handleTraversal = async (type) => {
        if (isRunning) return;
        
        setIsRunning(true);
        setActiveAlgorithm(type);
        setHighlighted(null);
        
        try {
            if (type === 'inorder') await inorder(root, visit);
            else if (type === 'preorder') await preOrder(root, visit);
            else if (type === 'postorder') await postOrder(root, visit);
            else if (type === 'level') await levelOrder(root, visit);
        } finally {
            setHighlighted(null);
            setIsRunning(false);
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

const renderTree = (node, highlighted) => {
    if (!node) return null;
    
    return (
        <div className="flex flex-col items-center relative">
            <TreeNode value={node.value} highlighted={node === highlighted} />
            {(node.left || node.right) && (
                <div className="flex gap-10 mt-6 relative">
                    {node.left && (
                        <div className="relative">
                            <Line direction="left" />
                            {renderTree(node.left, highlighted)}
                        </div>
                    )}
                    {!node.left && node.right && <div className="w-10"></div>}
                    {node.right && (
                        <div className="relative">
                            <Line direction="right" />
                            {renderTree(node.right, highlighted)} 
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TreeVisualizer;