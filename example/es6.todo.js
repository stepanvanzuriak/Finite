import Finite, { State, Transition, T, h } from "../dist/finite";

const view = ({ list, inputValue, onChange, addValue, removeValue }) => h`
  <input on-change=${onChange} value=${inputValue} type="text"/>
  <button on-click=${() => addValue(list, inputValue)}>Add</button>
  ${list.map(
    (element, index) =>
      h`<p>${element}  <button on-click=${() =>
        removeValue(list, index)}>X</button></p>`
  )}
  `;

const ToDo = State({
  name: "todo",
  memory: {
    list: [],
    inputValue: ""
  },
  transitions: [
    T("ADD_TODO", "todo"),
    T("CHANGE_INPUT_VALUE", "todo"),
    T("REMOVE_VALUE", "todo")
  ],
  onChange: e =>
    Transition("CHANGE_INPUT_VALUE", {
      inputValue: e.target.value
    }),
  addValue: (list, value) =>
    value.length > 0
      ? Transition("ADD_TODO", {
          inputValue: "",
          list: [value, ...list]
        })
      : null,
  removeValue: (list, index) =>
    Transition("REMOVE_VALUE", {
      list: list.filter((_, i) => i !== index)
    }),
  view
});

Finite.Render(ToDo, document.body);
