# ⬜ Finite

<p align="center">
  <img src="./assets/code.png" width="80%"/>
</p>

## How to try ?

1.  Clone or download project
2.  `$ yarn install (or npm install)`
3.  `$ yarn run build (or npm run build)`
4.  Copy `finite.js` from `dist` folder to your project

##### P.S. Publish to NPM in TODO

## Simple counter example

```javascript
const Counter = Finite.State({
  name: "counter",
  transitions: [
    // Same as {name:  'INCREMENT', to: 'counter'}
    Finite.T("INCREMENT", "counter"),
    Finite.T("DECREMENT", "counter")
  ],
  memory: {
    count: 0
  },
  increment: count =>
    Finite.Transition("counter", "INCREMENT", { count: count + 1 }),
  decrement: count =>
    Finite.Transition("counter", "DECREMENT", { count: count - 1 }),
  view: ({ count, increment, decrement }) =>
    h`
      <button on-click=${() => decrement(count)}>-1</button>
      <div>${count}</div>
      <button on-click=${() => increment(count)}>+1</button>`
});

Finite.Render(Counter, document.body);
```

## Simple two state example

```javascript
const A = Finite.State({
  name: "A",
  memory: {
    text: "Text A"
  },
  transitions: [Finite.T("MOVE_TO_B", "B")],
  view: ({ text, onClick }) =>
    h`<div>${text}</div><button on-click={${onClick}}>To B</button>`,
  onClick: e => Finite.Transition("A", "MOVE_TO_B")
});
const B = Finite.State({
  name: "B",
  memory: {
    text: "Text B"
  },
  transitions: [Finite.T("MOVE_TO_A", "A")],
  view: ({ text, onClick }) =>
    h`<div>${text}</div><button on-click={${onClick}}>To A</button>`,
  onClick: e => Finite.Transition("B", "MOVE_TO_A", { text: "New Text A" })
});

Finite.Render(A, document.body);
```

##### More examples in `example` folder

## TODO

- [x] Add jsdoc
- [ ] Add tests
- [ ] Add full API documentation
- [ ] Publish to npm
- [ ] Improve README
- [ ] Add more examples

```

```
