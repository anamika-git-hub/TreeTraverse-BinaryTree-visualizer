export class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export const insertNode = (root,value) => {
    if(!root) return new TreeNode(value);
    if(value < root.value) root.left = insertNode(root.left, value);
    else if (value > root.value) root.right = insertNode(root.right, value);
    return root;
};

export const buildTreeFromArray = (values) => {
    let root = null;
    for(let val of values){
        root = insertNode(root,val);
    }
    return root;
}