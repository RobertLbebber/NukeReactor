import PropTypes from "prop-types";

function lazyFunction(f) {
  return function() {
    return f.apply(this, arguments);
  };
}

const lazyHTMLType = lazyFunction(function() {
  return ComponentType;
});

export const ContainerType = PropTypes.shape({
  tag: PropTypes.oneOf(["Container"]),
  positon: PropTypes.oneOf([
    "tr",
    "tl",
    "t",
    "mr",
    "ml",
    "m",
    "br",
    "bl",
    "b",
    "l",
    "r",
    "c"
  ]),
  id: PropTypes.string,
  class: PropTypes.string,
  style: PropTypes.object,
  innerText: PropTypes.string,
  children: PropTypes.arrayOf(ComponentType)
});

export const SeperatorType = PropTypes.shape({
  positon: PropTypes.oneOf([
    "tr",
    "tl",
    "t",
    "mr",
    "ml",
    "m",
    "br",
    "bl",
    "b",
    "l",
    "r",
    "c"
  ]),
  tag: PropTypes.oneOf(["Seperator"]),
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
  class: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object
});

export const ImageType = PropTypes.shape({
  positon: PropTypes.oneOf([
    "tr",
    "tl",
    "t",
    "mr",
    "ml",
    "m",
    "br",
    "bl",
    "b",
    "l",
    "r",
    "c"
  ]),
  tag: PropTypes.oneOf(["Image"]),
  class: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object
});

export const FormType = PropTypes.shape({
  positon: PropTypes.oneOf([
    "tr",
    "tl",
    "t",
    "mr",
    "ml",
    "m",
    "br",
    "bl",
    "b",
    "l",
    "r",
    "c"
  ]),
  tag: PropTypes.oneOf(["Form"]),
  class: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  html: PropTypes.object
});

export const ChartType = PropTypes.shape({
  positon: PropTypes.oneOf([
    "tr",
    "tl",
    "t",
    "mr",
    "ml",
    "m",
    "br",
    "bl",
    "b",
    "l",
    "r",
    "c"
  ]),
  tag: PropTypes.oneOf(["Chart"]),
  class: PropTypes.string,
  id: PropTypes.string,
  html: PropTypes.object,
  style: PropTypes.object
});

export const WordType = PropTypes.shape({
  positon: PropTypes.oneOf([
    "tr",
    "tl",
    "t",
    "mr",
    "ml",
    "m",
    "br",
    "bl",
    "b",
    "l",
    "r",
    "c"
  ]),
  tag: PropTypes.oneOf(["Word"]),
  innerText: PropTypes.string,
  class: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object
});

export const ComponentType = PropTypes.shape({
  structure: PropTypes.oneOfType([
    PropTypes.shape(ContainerType),
    PropTypes.shape(SeperatorType),
    PropTypes.shape(ImageType),
    PropTypes.shape(FormType),
    PropTypes.shape(ChartType),
    PropTypes.shape(WordType)
  ])
});
