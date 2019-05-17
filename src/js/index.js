import render from "./virtualDom/render";
import mount from "./virtualDom/mount";
import diff from "./virtualDom/diff";

const createVirtualElem = (tagName, attrs, text, children) => {
  return {
    tagName,
    attrs,
    text,
    children
  };
};

const childElemInput = () =>
  createVirtualElem("input", { class: "iClass" }, "", []);

const childElemParagraph = num =>
  createVirtualElem(
    "p",
    { class: "pClass" },
    `child <p> element. Num: ${num}`,
    []
  );

const createVirtualApp = num => {
  return createVirtualElem(
    "div",
    { class: "parentClass", id: "parentId", datanum: num },
    "",
    [childElemInput(), childElemParagraph(num)]
  );
};

const $appDiv = document.querySelector("#app");
let num = 10;
let virtualApp = createVirtualApp(num); // old virtual app
let $elem = render(virtualApp); // eq to $app
let $rootElem = mount($elem, $appDiv); // eq to mount($app, $appDiv)

setInterval(() => {
  num++;
  const newVirtualApp = createVirtualApp(num);
  const patch = diff(virtualApp, newVirtualApp);
  $rootElem = patch($rootElem);
  virtualApp = newVirtualApp;
}, 1000);
