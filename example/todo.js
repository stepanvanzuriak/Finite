const view = ({ list, inputValue, onChange, addValue, removeValue }) => h`
  <div class="app">
    <input onchange=${onChange} value=${inputValue} type="text"/>
    <button onclick=${addValue}>Add</button>
    ${list.map((element, index) =>
      raw(
        h`<p>${element}  <button onclick=${() =>
          removeValue(index)}>X</button></p>`
      )
    )}
  </div>
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
  addValue: (_, { list, inputValue }) => {
    if (inputValue.length > 0) {
      Finite.Transition("ADD_TODO", {
        inputValue: "",
        list: [inputValue, ...list]
      });
    }
  },
  removeValue: (index, { list }) =>
    Finite.Transition("REMOVE_VALUE", {
      list: list.filter((_, i) => i !== index)
    }),
  view
});

Finite.Render(ToDo, document.body);
