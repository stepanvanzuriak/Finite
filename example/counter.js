const Counter = Finite.State({
  name: "counter",
  transitions: [
    Finite.T("INCREMENT", "counter"),
    Finite.T("DECREMENT", "counter")
  ],
  memory: {
    count: 0
  },
  increment: count => Finite.Transition("INCREMENT", { count: count + 1 }),
  decrement: count => Finite.Transition("DECREMENT", { count: count - 1 }),
  view: ({ count, increment, decrement }) =>
    h`<button on-click=${() =>
      decrement(count)}>-1</button><div>${count}</div><button on-click=${() =>
      increment(count)}>+1</button>`
});

Finite.Render(Counter, document.body);
