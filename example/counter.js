const Counter = Finite.State({
  name: "counter",
  transitions: [
    Finite.T("INCREMENT", "counter"),
    Finite.T("DECREMENT", "counter")
  ],
  memory: { count: 0 },
  increment: (_, { count }) =>
    Finite.Transition("INCREMENT", { count: count + 1 }),
  decrement: (_, { count }) =>
    Finite.Transition("INCREMENT", { count: count - 1 }),
  view: ({ count, increment, decrement }) =>
    h`<div class="app">
        <button onclick=${decrement}>-1</button>
        <div>${count}</div>
        <button onclick=${increment}>+1</button>
      </div>`
});

Finite.Render(Counter, document.body);
