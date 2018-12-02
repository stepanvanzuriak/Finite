import { html, render as htmlRender, raw } from "picohtml";

class Finite {
  states = {};
  point = null;
  current = null;
  currentId = null;

  render(f, point) {
    const element = f();

    this.point = point;
    this.current = f;
    this.currentId = element._FINITE_ID;
    htmlRender(element, point);
  }

  rerender(id) {
    console.log(id, this.currentId);
    if (id === this.currentId) {
      htmlRender(this.current(), this.point);
    }
  }
}

const Fin = new Finite();

function defineState(memory = {}) {
  if (!Fin.states["_id"]) {
    Fin.states["_id"] = memory;
  }

  const set = newMemory => {
    Fin.states["_id"] = { ...Fin.states["_id"], ...newMemory };
    Fin.rerender("_id");
  };
  const wrapper = h => {
    h._FINITE_ID = "_id";
    return h;
  };
  return [Fin.states["_id"], set, wrapper];
}

function Hello() {
  const [{ counter }, set, wrapper] = defineState({ counter: 15 });

  return wrapper(html`
    <div>
      <button onclick="${() => set({ counter: counter + 1 })}">Hello</button>
      <p>${counter}</p>
    </div>
  `);
}

// How to call subrender for Hello
function SUP() {
  return html`
    <div class="app">
      <h1>HELLO</h1>
      ${raw(Hello())}
    </div>
  `;
}

Fin.render(SUP, document.body);
