import Finite, { html } from '../dist/finite'

const view = (
  { list, inputValue },
  { onChange, addValue, removeValue }
) => html`
  <input on-change=${onChange} value=${inputValue} type="text"/>
  <button on-click=${() => addValue(list, inputValue)}>Add</button>
  ${list.map(
    (element, index) =>
      html`<p>${element}  <button on-click=${() =>
        removeValue(list, index)}>X</button></p>`
  )}
  `

const ToDO = Finite.State({
  name: 'todo',
  memory: {
    list: [],
    inputValue: ''
  },
  transitions: [
    { name: 'ADD_TODO', to: 'todo' },
    { name: 'CHANGE_INPUT_VALUE', to: 'todo' },
    { name: 'REMOVE_VALUE', to: 'todo' }
  ],
  onChange: e =>
    Finite.Transition('todo', 'CHANGE_INPUT_VALUE', {
      inputValue: e.target.value
    }),
  addValue: (list, value) =>
    value.length > 0
      ? Finite.Transition('todo', 'ADD_TODO', {
          inputValue: '',
          list: [value, ...list]
        })
      : null,
  removeValue: (list, index) =>
    Finite.Transition('todo', 'REMOVE_VALUE', {
      list: list.filter((_, i) => i !== index)
    }),
  view
})

Finite.Render(ToDO, document.body)
