import { Node } from './Node.js';

export class Tree {
    constructor(array) {
        this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
    }

    buildTree(arr) {
        if (arr.length === 0) return null;
        const mid = Math.floor(arr.length / 2);
        const root = new Node(arr[mid]);
        root.left = this.buildTree(arr.slice(0, mid));
        root.right = this.buildTree(arr.slice(mid + 1));
        return root;
    }

    insert(value, node = this.root) {
        if (!node) return new Node(value);
        if (value < node.data) node.left = this.insert(value, node.left);
        else if (value > node.data) node.right = this.insert(value, node.right);
        return node;
    }

    deleteItem(value, node = this.root) {
        if (!node) return null;
        if (value < node.data) node.left = this.deleteItem(value, node.left);
        else if (value > node.data) node.right = this.deleteItem(value, node.right);
        else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            const minRight = this._min(node.right);
            node.data = minRight.data;
            node.right = this.deleteItem(minRight.data, node.right);
        }
        return node;
    }

    _min(node) {
        while (node.left) node = node.left;
        return node;
    }

    find(value, node = this.root) {
        if (!node) return null;
        if (value === node.data) return node;
        return value < node.data
            ? this.find(value, node.left)
            : this.find(value, node.right);
    }

    levelOrderForEach(callback) {
        if (!callback) throw new Error('Callback required');
        const queue = [this.root];
        while (queue.length) {
            const node = queue.shift();
            callback(node);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    inOrderForEach(callback, node = this.root) {
        if (!callback) throw new Error('Callback required');
        if (node.left) this.inOrderForEach(callback, node.left);
        callback(node);
        if (node.right) this.inOrderForEach(callback, node.right);
    }

    preOrderForEach(callback, node = this.root) {
        if (!callback) throw new Error('Callback required');
        callback(node);
        if (node.left) this.preOrderForEach(callback, node.left);
        if (node.right) this.preOrderForEach(callback, node.right);
    }

    postOrderForEach(callback, node = this.root) {
        if (!callback) throw new Error('Callback required');
        if (node.left) this.postOrderForEach(callback, node.left);
        if (node.right) this.postOrderForEach(callback, node.right);
        callback(node);
    }

    height(value) {
        const node = this.find(value);
        if (!node) return null;
        return this._height(node);
    }

    _height(node) {
        if (!node) return -1;
        return 1 + Math.max(this._height(node.left), this._height(node.right));
    }

    depth(value, node = this.root, depth = 0) {
        if (!node) return null;
        if (value === node.data) return depth;
        if (value < node.data) return this.depth(value, node.left, depth + 1);
        return this.depth(value, node.right, depth + 1);
    }

    isBalanced(node = this.root) {
        if (!node) return true;
        const leftHeight = this._height(node.left);
        const rightHeight = this._height(node.right);
        const balanced = 
            Math.abs(leftHeight - rightHeight) <= 1 &&
            this.isBalanced(node.left) &&
            this.isBalanced(node.right);
        return balanced;
    }

    rebalance() {
        const values = [];
        this.inOrderForEach(node => values.push(node.data));
        this.root = this.buildTree(values);
    }
}