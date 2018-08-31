import { render } from "lit-html";

import { StateType } from "../types/types";
import { State } from "../state/state";
import { Machine } from "../machine/machine";

const _machine = new Machine();
console.log(
  "🚧 Right now console output only way to debug this, so every Transition is logged 🚧"
);
console.log("");
/**
 * Main framework object
 */
export class Finite {
  /**
   * Creates new State
   * @param state State object
   * @param state.name Name of state
   * @param state.view Function that represents view
   * @param state.memory Initial state values
   * @param state.transitions Representation of state transitions
   * @returns New state
   */
  static State({ name, view, memory, transitions, ...rest }: StateType): State {
    const state = new State({ name, view, memory, transitions, ...rest });
    _machine.add(state);

    return state;
  }
  /**
   * Transit state
   * @param from Name of state
   * @param to Name of transition
   * @param payload Extra memory to send
   */
  static Transition(from: string, name: string, payload = {}) {
    const state = _machine.find(from);

    const nextStateName = state.transitions.find(
      transition => transition.name === name
    ).to;
    const nextState = _machine.find(nextStateName);

    // ! TEST ZONE
    _machine.__pointer = nextState;

    console.log(
      "%cTRANSITION",
      "color: green; font-weight: bold",
      name,
      `${from} -> ${nextStateName}`,
      state.memory,
      "-> ",
      {
        ...nextState.memory,
        ...payload
      }
    );
    nextState.memory = { ...nextState.memory, ...payload };

    render(
      nextState.view({ ...nextState.memory, ...nextState.rest }),
      _machine.getMountPoint()
    );
  }

  // NOT FINISHED
  // Concept of Transition without from for nameless (anonymous) states
  static __TransitionNameless(name: string, payload = {}) {
    console.log(`__TransitionNameless ${name} ${payload}`);

    const state = _machine.__pointer;
    const nextStateName = state.transitions.find(
      transition => transition.name === name
    ).to;
    const nextState = _machine.find(nextStateName);

    console.log(nextState);

    nextState.memory = { ...nextState.memory, ...payload };

    render(
      nextState.view({ ...nextState.memory, ...nextState.rest }),
      _machine.getMountPoint()
    );
  }

  /**
   * Render state in point
   * @param state State to render
   * @param point HTMLElement mount point
   */
  static Render(state: State, point: HTMLElement) {
    _machine.setMountPoint(point);

    // ! TEST ZONE
    _machine.__pointer = state;

    console.log(
      "%cINIT_STATE",
      "color: blue; font-weight: bold",
      state.name || "Anonymous",
      state.memory
    );

    render(state.view({ ...state.memory, ...state.rest }), point);
  }

  static T(name: string, to: string) {
    return { name, to };
  }
}
