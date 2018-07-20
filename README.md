# ⬜ Finite

Finite-state machine inspired micro framework

## How to try ?

1.  `$ yarn install (or npm install)`
2.  `$ yarn run build (or npm run build)`
3.  Copy `finite.js` from `dist` folder to your project

##### P.S. Publish to NPM in TODO

## Simple counter example

```javascript
const Counter = Finite.State({
  name: 'counter',
  transitions: [
    // Same as {name:  'INCREMENT', to: 'counter'}
    Finite.T('INCREMENT', 'counter'),
    Finite.T('DECREMENT', 'counter')
  ],
  memory: {
    count: 0
  },
  increment: count =>
    Finite.Transition('counter', 'INCREMENT', { count: count + 1 }),
  decrement: count =>
    Finite.Transition('counter', 'DECREMENT', { count: count - 1 }),
  view: ({ count, increment, decrement }) =>
    h`
      <button on-click=${() => decrement(count)}>-1</button>
      <div>${count}</div>
      <button on-click=${() => increment(count)}>+1</button>`
});

Finite.Render(Counter, document.body);
```

##### More examples in `example` folder

## TODO

- [x] Add jsdoc
- [ ] Add tests
- [ ] Add full API documentation
- [ ] Publish to npm
- [ ] Improve README
- [ ] Add more examples
