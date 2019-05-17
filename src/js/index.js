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
  createVirtualElem("input", { id: "iAintChangin" }, "", []);

const childElemParagraph = num =>
  createVirtualElem(
    "p",
    { class: `iWillBeChanged-${num}`, id: "iAIntChangingEither" },
    `child <p> element. Num: ${num}`,
    []
  );

/* create dynamic structure to be rendered */
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
let $elem = render(virtualApp); // initial render
let $rootElem = mount($elem, $appDiv); // replaced <div id="app" />

setInterval(() => {
  num++;
  const newVirtualApp = createVirtualApp(num);

  /* diffing */
  const patch = diff(virtualApp, newVirtualApp); // diffing using old and updated virtualApp
  $rootElem = patch($rootElem);
  /* diffing ends */

  /* total rerender */
  // $elem = render(newVirtualApp);
  // $rootElem = mount($elem, $rootElem);
  /* total rerender ends*/

  virtualApp = newVirtualApp; // update recent virtualApp with updated virtualApp with most recent num
}, 1000);
