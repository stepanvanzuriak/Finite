// Just playground file
const A = Finite.State({
  name: "A",
  memory: { data: "NO_DATA" },
  transitions: [Finite.T("GET_DATA", "A"), Finite.T("TO_B", "B")],
  getImage: () => {
    Finite.AsyncTransition("GET_DATA", {
      data: fetch("https://jsonplaceholder.typicode.com/todos/1").then(
        response => response.json()
      )
    });
    Finite.Transition("TO_B");
  },
  view: ({ data: { title = "Empty" }, getImage }) => h`
                      <div>${title}</div>
                      <button on-click=${getImage}>Send!</button>
                      `
});

const B = Finite.State({
  name: "B",
  view: () => h`<p>Loading...</p>`
});

Finite.Render(A, document.body);
