const render = node => {
  const { tagName, attrs, text, children } = node;
  const $elem = document.createElement(tagName);

  // set all attrs for newly created $elem
  for (const key in attrs) {
    const val = attrs[key];
    $elem.setAttribute(key, val);
  }

  // if text exist, create textNode in $el
  if (text) {
    const $text = document.createTextNode(text);
    $elem.appendChild($text);
  }

  // recursively render all children
  for (const child of children) {
    const $child = render(child);
    $elem.appendChild($child);
  }

  return $elem;
};

export default render;
