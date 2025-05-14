import React, { useState } from "react";
import TreeNode from "./TreeNode";
import { inorder,preOrder,postOrder,levelOrder } from "../utils/traversals";

const sleep = ms => new Promise(res => setTimeout(res,ms));

const TreeVisualizer = ({ root }) => {
    const [highlighted, setHighlighted] = useState(null);

    const visit = async (node) => {
        setHighlighted(node);
        await sleep(600);
    };

    const handleTraversal = async (type) => {
        setHighlighted(null);
        if (type === 'inorder') await inorder(root,visit);
        else if (type === 'preorder') await preOrder(root,visit);
        else if (type === 'postorder') await postOrder(root,visit);
        else if (type === 'level') await levelOrder(root,visit);
        setHighlighted(null);
    };

    return (
        <div className="fles flex-col items-center gap-4">
            <div className="flex gap-3 mb-4">
                <button className="btn" onClick={() => handleTraversal('inorder')}>Inorder</button>
                <button className="btn" onClick={() => handleTraversal('preorder')}>Preorder</button>
                <button className="btn" onClick={() => handleTraversal('postorder')}>Postorder</button>
                <button className="btn" onClick={() => handleTraversal('level')}>Level Order</button>
            </div>
            <div className="flex flex-col items-center">{renderTree(root, highlighted)}</div>
        </div>
    );
};

const Line = ({direction}) => {
    return (
        <div
            className={`absolute w-0-5 bg-white ${
                direction === 'left' ? '-left-10 rotate-[45deg]' : '-right-10 -rotate-[45deg]'
            } h-10 origin-top`}
        >
        </div>
    );
};

const renderTree = (node, highlighted) => {
    if(!node) return null;
    return (
        <div className="flex flex-col items-center">
            <TreeNode value={node.value} highlighted={node === highlighted}/>
            <div className="flex gap-6 mt-3">
                {node.left && <Line direction="left" />}
                {node.right && <Line direction="right" />}
                {renderTree(node.left, highlighted)}
                {renderTree(node.right, highlighted)}
            </div>
        </div>
    )
};

export default TreeVisualizer;