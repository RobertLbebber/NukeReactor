import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import Footer from "./Footer";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("can render and update a Footer", () => {
  // Test first render and componentDidMount
  TestUtils.act(() => {
    ReactDOM.render(<Footer />, container);
  });
  const component = container.querySelector(".Footer");
  expect(component).toBe("div");
});
