const view = ({ list, inputValue, onChange, addValue, removeValue }) => h`
  <input on-change=${onChange} value=${inputValue} type="text"/>
  <button on-click=${() => addValue(list, inputValue)}>Add</button>
  ${list.map(
    (element, index) =>
      h`<p>${element}  <button on-click=${() =>
        removeValue(list, index)}>X</button></p>`
  )}
  `;

const ToDO = Finite.State({
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
  addValue: (list, value) =>
    value.length > 0
      ? Finite.Transition("ADD_TODO", {
          inputValue: "",
          list: [value, ...list]
        })
      : null,
  removeValue: (list, index) =>
    Finite.Transition("REMOVE_VALUE", {
      list: list.filter((_, i) => i !== index)
    }),
  view
});

Finite.Render(ToDO, document.body);
