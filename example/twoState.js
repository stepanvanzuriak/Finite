const A = Finite.State({
  name: "A",
  memory: {
    text: "Text A"
  },
  transitions: [Finite.T("MOVE_TO_B", "B")],
  view: ({ text, onClick }) =>
    h`<div>${text}</div><button on-click={${onClick}}>To B</button>`,
  onClick: e => Finite.Transition("MOVE_TO_B")
});
const B = Finite.State({
  name: "B",
  memory: {
    text: "Text B"
  },
  transitions: [Finite.T("MOVE_TO_A", "A")],
  view: ({ text, onClick }) =>
    h`<div>${text}</div><button on-click={${onClick}}>To A</button>`,
  onClick: e => Finite.Transition("MOVE_TO_A", { text: "New Text A" })
});

Finite.Render(A, document.body);
