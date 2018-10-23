const A = Finite.State({
  name: "A",
  memory: { data: {} },
  transitions: [Finite.T("GET_DATA", "A"), Finite.T("TO_B", "B")],
  getImage: () => {
    Finite.AsyncTransition("GET_DATA", {
      data: fetch("https://jsonplaceholder.typicode.com/todos/1").then(
        response => response.json()
      )
    });
    Finite.Transition("TO_B");
  },
  view: ({ data: { title = "EMPTY" }, getImage }) => h`
                      <div class="app">
                        <div>${title}</div>
                        <button onclick=${getImage}>Send!</button>
                      </div>
                      `
});

const B = Finite.State({
  name: "B",
  view: () => h`<p>Loading...</p>`
});

Finite.Render(A, document.querySelector("#root"));
