import render from "./render";
const diffTexts = (oldText, newText) => {
  const patches = [];

  return $node => {};
};

const diffAttrs = (oldAttrs, newAttrs) => {

};
const diff = (virtualOldNode, virtualNewNode) => {
  console.log("virtualOldNode: ", virtualOldNode);
  console.log("virtualNewNode: ", virtualNewNode);
  // right now we can try to compare virtualNodes -
  // for example, if their tagNames are different.
  // But that is covered by Jason's vid. Watch it for ref!
  // Our focus is less specific than Jason's vid.
  // We are trying to render only the changed component.

  // there is only ONE thing that is different: text
  const patchText = diffTexts(virtualOldNode.text, virtualNewNode.text);
  const patchAttrs = diffAttrs(virtualOldNode.attrs, virtualNewNode.attrs);

  // TODO: create another source of difference, like datacount attrs?
  return $node => {
    patchText($node);
    return $node;
  };
};

export default diff;

// TODO; childNodes is accumulatively appended. Need to either:
// - find that node containing childNodes and replace with with newText
// or remove old textNode, replace with new textNode
