const A = Finite.State({
  name: "A",
  memory: {
    text: "Text A"
  },
  transitions: [Finite.T("MOVE_TO_B", "B")],
  onClick: e => Finite.Transition("MOVE_TO_B"),
  view: ({ text, onClick }) =>
    h`<div class="app">
        <div>${text}</div><button onclick=${onClick}>To B</button>
      </div>`
});

const B = Finite.State({
  name: "B",
  memory: {
    text: "Text B"
  },
  transitions: [Finite.T("MOVE_TO_A", "A")],
  onClick: e => Finite.Transition("MOVE_TO_A", { text: "New Text A" }),
  view: ({ text, onClick }) =>
    h`<div class="app">
        <div>${text}</div><button onclick=${onClick}>To A</button>
      </div>`
});

Finite.Render(A, document.body);
