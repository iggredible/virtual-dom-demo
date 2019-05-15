import render from "./virtualDom/render";
import mount from "./virtualDom/mount";

const createVirtualElem = (tagName, attrs, text, children) => {
  return {
    tagName,
    attrs,
    text,
    children
  };
};

const childElemInput = createVirtualElem("input", { class: "iClass" }, "", []);

const childElemParagraph = createVirtualElem(
  "p",
  { class: "pClass" },
  "I am paragraph child",
  []
);

const createVirtualApp = num => {
  return createVirtualElem(
    "div",
    { class: "parentClass", id: "parentId" },
    `I am parent: ${num}`,
    [childElemInput, childElemParagraph]
  );
};

const $appDiv = document.querySelector("#app");
let num = 10;
let $elem = render(createVirtualApp(num));
let $rootElem = mount($elem, $appDiv);

setInterval(() => {
  num++;
  $elem = render(createVirtualApp(num));
  $rootElem = mount($elem, $rootElem);
}, 1000);
