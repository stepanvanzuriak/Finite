// Just playground file
import Finite, { State, Render, Transition, T, h } from "../dist/finite";
// Init state
const A = State({
  transitions: [T("MOVE_TO_B", "B")],

  onClick: () => Finite.__TransitionNameless("MOVE_TO_B"),

  view: ({ onClick }) => h`<p on-click={${onClick}}>Hello from state A!</p>`
});

const B = State({
  name: "B",
  view: () => h`<p>Hello from state B</p>`
});

Render(A, document.body);
