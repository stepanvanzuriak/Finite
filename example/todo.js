const view = ({ list, inputValue, onChange, addValue, removeValue }) => h`
  <input on-change=${onChange} value=${inputValue} type="text"/>
  <button on-click=${addValue}>Add</button>
  ${list.map(
    (element, index) =>
      h`<p>${element}  <button on-click=${() =>
        removeValue(index)}>X</button></p>`
  )}
  `;

const ToDo = Finite.State({
  name: "todo",
  memory: {
    list: [],
    inputValue: ""
  },
  transitions: [
    Finite.T("ADD_TODO", "todo"),
    Finite.T("CHANGE_INPUT_VALUE", "todo"),
    Finite.T("REMOVE_VALUE", "todo")
  ],
  onChange: e =>
    Finite.Transition("CHANGE_INPUT_VALUE", {
      inputValue: e.target.value
    }),
  addValue: (_, { list, inputValue }) =>
    inputValue.length > 0
      ? Finite.Transition("ADD_TODO", {
          inputValue: "",
          list: [inputValue, ...list]
        })
      : null,
  removeValue: (index, { list }) =>
    Finite.Transition("REMOVE_VALUE", {
      list: list.filter((_, i) => i !== index)
    }),
  view
});

Finite.Render(ToDo, document.body);
