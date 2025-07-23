import { Tree } from './Tree.js';
import { prettyPrint } from './prettyPrint.js';

function randomArray(size = 15, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

const tree = new Tree(randomArray());
console.log('Initial Tree:');
prettyPrint(tree.root);
console.log('Is balanced?', tree.isBalanced());

console.log('\nLevel Order:');
tree.levelOrderForEach(n => console.log(n.data));

console.log('\nPre Order:');
tree.preOrderForEach(n => console.log(n.data));

console.log('\nIn Order:');
tree.inOrderForEach(n => console.log(n.data));

console.log('\nPost Order:');
tree.postOrderForEach(n => console.log(n.data));

console.log('\nUnbalancing Tree...');
tree.insert(120);
tree.insert(150);
tree.insert(200);
tree.insert(300);
tree.insert(400);
prettyPrint(tree.root);
console.log('Is balanced?', tree.isBalanced());

console.log('\nRebalancing Tree...');
tree.rebalance();
prettyPrint(tree.root);
console.log('Is balanced?', tree.isBalanced());

console.log('\nNew In Order:');
tree.inOrderForEach(n => console.log(n.data));
