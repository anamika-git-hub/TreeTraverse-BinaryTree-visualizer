import React from "react";
import {motion} from 'framer-motion';

const TreeNode = ({ value, highlighted}) => {
    return (
        <motion.div
        className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-bold ${
            highlighted ? 'bg-blue-500 border-blue-800 text-white scale-110' : 'bg-gray-700 border-gray-500 text-white'
        }`}
        layout
        >
            {value}

        </motion.div>
    );
};

export default TreeNode;