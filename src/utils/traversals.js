const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const inorder = async (node, visit) => {
    if(!node) return;
    await inorder(node.left,visit);
    await visit(node);
    await inorder(node.right,visit);
};

export const preOrder = async(node,visit) => {
    if(!node) return;
    await visit(node);
    await preOrder(node.left,visit);
    await preOrder(node.right,visit);
};

export const postOrder = async(node,visit) => {
    if(!node) return;
    await postOrder(node.left,visit);
    await postOrder(node.right,visit);
    await visit(node);
};

export const levelOrder = async(root,visit) => {
    if(!root) return;
    const queue = [root];
    while ( queue.length) {
        const current = queue.shift();
        await visit(current);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
    }
};