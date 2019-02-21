import React from "react";
import ReactDOM from "react-dom";
import { expect } from "chai";
import TestUtils from "react-dom/test-utils";
import ItemCard from "../components/Inputs/ItemCard.jsx";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

// mockComponent(componentClass, [mockTagName]);

it("can render and update a Footer", () => {
  // Test first render and componentDidMount
  TestUtils.act(() => {
    ReactDOM.render(<ItemCard data={{}} />, container);
  });
  const itemCard = document.querySelector(".ItemCard");
  expect(itemCard.tagName).to.equal("DIV");
});
