export const sample = {
  tag: "div",
  class: "top",
  id: "top1",
  style: { color: "red" },
  innerText: "Inner Text on top div",
  children: [
    {
      tag: "p",
      class: "mid",
      id: "mid1",
      innerText: "Inner Text on mid div"
    },
    {
      tag: "span",
      class: "mid",
      children: [
        { tag: "i", innerText: "This should be Italics." },
        { tag: "b", innerText: "This is in bold." }
      ],
      innerText: "This is the first Sentence."
    },
    {
      tag: "div",
      class: "mid",
      id: "mid2",
      style: { color: "red" },
      innerText: "Inner Text on mid div"
    }
  ]
};
