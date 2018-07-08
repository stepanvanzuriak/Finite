const Counter = Finite.State({
  name: 'counter',
  transitions: [
    {
      name: 'INCREMENT',
      to: 'counter'
    },
    { name: 'DECREMENT', to: 'counter' }
  ],
  memory: {
    count: 0
  },
  increment: count =>
    Finite.Transition('counter', 'INCREMENT', { count: count + 1 }),
  decrement: count =>
    Finite.Transition('counter', 'DECREMENT', { count: count - 1 }),
  view: ({ count }, { increment, decrement }) =>
    html`<button on-click=${() =>
      decrement(count)}>-1</button><div>${count}</div><button on-click=${() =>
      increment(count)}>+1</button>`
})

Finite.Render(Counter, document.body)
