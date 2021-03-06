import render from "./render";

/* zip */
/* takes in 2 args */
/* zips them together into an array */
/* zipped array based on the minimum length of 2 arguments */
const zip = (xs, ys) => {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};

const diffChildren = (oldChildren, newChildren) => {
  const childrenPatch = [];
  const patchOldNewChildrenDiff = [];
  oldChildren.forEach((oldChild, i) => {
    childrenPatch.push(diff(oldChild, newChildren[i]));
  });

  for (const additionalChild of newChildren.slice(oldChildren.length)) {
    patchOldNewChildrenDiff.push($node => {
      $node.appendChild(render(additionalChild));
      return $node;
    });
  }
  return $parent => {
    for (const [patch, child] of zip(childrenPatch, $parent.childNodes)) {
      patch(child); // why not patch($parent)?
    }
    for (const patch of patchOldNewChildrenDiff) {
      patch($parent);
    }
    return $parent;
  };
};

const diffTexts = (oldText, newText) => {
  if (newText && newText !== oldText) {
    return $node => {
      $node.textContent = newText;
    };
  }
  return $node => {};
};

const diffAttrs = (oldAttrs, newAttrs) => {
  const attrsPatch = [];

  for (const attr in newAttrs) {
    attrsPatch.push($node => {
      $node.setAttribute(attr, newAttrs[attr]);
      return $node;
    });
  }

  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      attrsPatch.push($node => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return $node => {
    for (const patchAttr of attrsPatch) {
      patchAttr($node);
    }
  };
};

const diff = (virtualOldNode, virtualNewNode) => {
  const patchText = diffTexts(virtualOldNode.text, virtualNewNode.text);
  const patchAttrs = diffAttrs(virtualOldNode.attrs, virtualNewNode.attrs);
  const patchChildren = diffChildren(
    virtualOldNode.children,
    virtualNewNode.children
  );

  return $node => {
    patchAttrs($node);
    patchChildren($node);
    patchText($node);
    return $node;
  };
};

export default diff;

// TODO; childNodes is accumulatively appended. Need to either:
// - find that node containing childNodes and replace with with newText
// or remove old textNode, replace with new textNode
