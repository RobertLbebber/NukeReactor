import PropTypes from "prop-types";

function lazyFunction(f) {
  return function() {
    return f.apply(this, arguments);
  };
}

const lazyHTMLType = lazyFunction(function() {
  return fullHTMLType;
});

const baseHTMLType = PropTypes.shape({
  value: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  class: PropTypes.string,
  style: PropTypes.object,
  innerText: PropTypes.string
});

export const commonHTMLType = PropTypes.shape({
  tag: PropTypes.oneOf([
    "a",
    "b",
    "div",
    "i",
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "span",
    "u"
  ]),
  attributes: PropTypes.shape(baseHTMLType)
});

export const formHTMLType = PropTypes.shape({
  tag: PropTypes.oneOf(["form"]),
  attributes: PropTypes.shape(baseHTMLType),
  method: PropTypes.string,
  action: PropTypes.string
});

export const imgHTMLType = PropTypes.shape({
  tag: PropTypes.oneOf(["img"]),
  attributes: PropTypes.shape(baseHTMLType),
  src: PropTypes.string,
  alt: PropTypes.string
});

export const inputHTMLType = PropTypes.shape({
  tag: PropTypes.oneOf(["input", "button"]),
  attributes: PropTypes.shape(baseHTMLType),
  placeholder: PropTypes.string,

  type: PropTypes.oneOf(["text", "radio", "select", "option", "text", "none"])
});

export const listItemHTMLType = PropTypes.shape({
  tag: PropTypes.oneOf(["li"]),
  attributes: PropTypes.shape(baseHTMLType)
});

export const orderedListHTMLType = PropTypes.shape({
  tag: PropTypes.oneOf(["ol"]),
  attributes: PropTypes.shape(baseHTMLType),
  kids: PropTypes.shape(listItemHTMLType).isRequired
});

export const unorderedListHTMLType = PropTypes.shape({
  tag: PropTypes.oneOf(["ul"]),
  attributes: PropTypes.shape(baseHTMLType),
  kids: PropTypes.shape(listItemHTMLType).isRequired
});

export const tdHTMLType = PropTypes.shape({
  tag: PropTypes.oneOf(["td"]),
  attributes: PropTypes.shape(baseHTMLType)
});
export const trHTMLType = PropTypes.shape({
  tag: PropTypes.oneOf(["tr"]),
  attributes: PropTypes.shape(baseHTMLType),
  kids: PropTypes.shape(tdHTMLType)
});
export const theadHTMLType = PropTypes.shape({
  tag: PropTypes.oneOf(["thead"]),
  attributes: PropTypes.shape(baseHTMLType),
  kids: PropTypes.oneOfType([trHTMLType]).isRequired
});
export const tbodyHTMLType = PropTypes.shape({
  tag: PropTypes.oneOf(["tbody"]),
  attributes: PropTypes.shape(baseHTMLType),
  kids: PropTypes.oneOfType([trHTMLType]).isRequired
});
export const tableHTMLType = PropTypes.shape({
  tag: PropTypes.oneOf(["table"]),
  attributes: PropTypes.shape(baseHTMLType),
  kids: PropTypes.oneOfType([theadHTMLType, tbodyHTMLType, trHTMLType])
    .isRequired
});

export const fullHTMLType = PropTypes.shape({
  structure: PropTypes.oneOfType([
    PropTypes.shape(commonHTMLType),
    PropTypes.shape(formHTMLType),
    PropTypes.shape(imgHTMLType),
    PropTypes.shape(inputHTMLType),
    PropTypes.shape(listItemHTMLType),
    PropTypes.shape(orderedListHTMLType),
    PropTypes.shape(unorderedListHTMLType),
    PropTypes.shape(tableHTMLType)
  ]),
  children: PropTypes.arrayOf(lazyHTMLType)
});
