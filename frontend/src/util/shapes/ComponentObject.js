import PropTypes from "prop-types";
import { fullHTMLType } from "./HTMLObject";

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
  position: PropTypes.oneOf(["tr", "tl", "t", "br", "bl", "b", "l", "r", "f"]),
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  innerText: PropTypes.string,
  children: PropTypes.objectOf(lazyHTMLType)
});

export const SeperatorType = PropTypes.shape({
  position: PropTypes.oneOf(["tr", "tl", "t", "br", "bl", "b", "l", "r", "f"]),
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
  tag: PropTypes.oneOf(["Seperator"]),
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object
});

export const ImageType = PropTypes.shape({
  position: PropTypes.oneOf(["tr", "tl", "t", "br", "bl", "b", "l", "r", "f"]),
  title: PropTypes.string,
  body: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string,
  tag: PropTypes.oneOf(["Image"]),
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object
});

export const FormType = PropTypes.shape({
  position: PropTypes.oneOf(["tr", "tl", "t", "br", "bl", "b", "l", "r", "f"]),
  html: PropTypes.object,
  tag: PropTypes.oneOf(["Form"]),
  class: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object
});

export const ChartType = PropTypes.shape({
  position: PropTypes.oneOf(["tr", "tl", "t", "br", "bl", "b", "l", "r", "f"]),
  html: PropTypes.object,
  tag: PropTypes.oneOf(["Chart"]),
  class: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object
});

export const WordType = PropTypes.shape({
  position: PropTypes.oneOf(["tr", "tl", "t", "br", "bl", "b", "l", "r", "f"]),
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
    PropTypes.shape(WordType),
    PropTypes.shape(fullHTMLType)
  ])
});
