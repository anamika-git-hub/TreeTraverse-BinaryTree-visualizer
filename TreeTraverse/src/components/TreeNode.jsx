import React from "react";
import { motion } from 'framer-motion';

const TreeNode = ({ value, highlighted }) => {
    return (
        <motion.div
            className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-bold shadow-lg transition-all duration-300 ${
                highlighted 
                    ? 'bg-blue-500 border-blue-300 text-white scale-110 ring-4 ring-blue-400/50' 
                    : 'bg-gray-700 border-gray-500 text-white hover:bg-gray-600'
            }`}
            layout
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {value}
        </motion.div>
    );
};

export default TreeNode;