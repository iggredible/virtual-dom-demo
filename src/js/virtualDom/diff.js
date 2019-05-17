import render from "./render";
const diffTexts = (oldText, newText) => {
  const patches = [];

  return $node => {};
};

const diffAttrs = (oldAttrs, newAttrs) => {
  const patchAttrs = [];

  for (const attr in newAttrs) {
    patchAttrs.push($node => {
      $node.setAttribute(attr, newAttrs[attr]);
      return $node;
    });
  }

  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patchAttrs.push($node => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return $node => {
    for (const patchAttr of patchAttrs) {
      patchAttr($node);
      // return $node;
    }
  };
};

const diff = (virtualOldNode, virtualNewNode) => {
  const patchText = diffTexts(virtualOldNode.text, virtualNewNode.text);
  const patchAttrs = diffAttrs(virtualOldNode.attrs, virtualNewNode.attrs);

  return $node => {
    patchAttrs($node);
    return $node;
  };
};

export default diff;

// TODO; childNodes is accumulatively appended. Need to either:
// - find that node containing childNodes and replace with with newText
// or remove old textNode, replace with new textNode
