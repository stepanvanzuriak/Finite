import { render } from "lit-html";
import { updateIn } from "updatein";

import { loopNestedObj, merge } from "../common/utils";
import { Machine } from "../machine/machine";
import { State } from "../state/state";
import { IStateType } from "../types";

const machine = new Machine();

console.log(
  "Right now console output only way to debug this, so every Transition is logged \n"
);
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
  public static State({
    name,
    view,
    memory,
    transitions,
    ...rest
  }: IStateType): State {
    const state = new State({ name, view, memory, transitions, ...rest });
    machine.add(state);

    return state;
  }

  /**
   * Transit state when all data from payload loaded
   * @param name Name of transiton
   * @param payload Extra memory to send
   */
  public static AsyncTransition(name: string, payload = {}) {
    const state = machine.pointer;
    const nextStateName = state.findTransitionsByName(name).to;
    const nextState = machine.find(nextStateName);
    const promisesKeys = [];

    loopNestedObj(payload, (value, savedKeys) => {
      if (value instanceof Promise) {
        promisesKeys.push([value, savedKeys]);
      }
    });

    Promise.all(
      promisesKeys.reduce((acc, container) => [...acc, container[0]], [])
    ).then(res => {
      res.map((r, index) => {
        payload = updateIn(payload, promisesKeys[index][1], () => r);
      });

      nextState.memory = merge(nextState.memory, payload);

      machine.pointer = nextState;

      console.log(
        "ASYNC TRANSITION",
        name,
        `${state.name} -> ${nextStateName}`
      );

      render(
        nextState.view({
          ...nextState.memory,
          ...nextState.restWithMemory()
        }),
        machine.getMountPoint()
      );
    });
  }

  /**
   * Transit state
   * @param name Name of transiton
   * @param payload Extra memory to send
   */
  public static Transition(name: string, payload = {}) {
    const state = machine.pointer;
    const nextStateName = state.findTransitionsByName(name).to;
    const nextState = machine.find(nextStateName);

    nextState.memory = merge(nextState.memory, payload);

    machine.pointer = nextState;

    console.log("TRANSITION", name, `${state.name} -> ${nextStateName}`);

    render(
      nextState.view({
        ...nextState.memory,
        ...nextState.restWithMemory()
      }),
      machine.getMountPoint()
    );
  }

  /**
   * Render state in point
   * @param state State to render
   * @param point HTMLElement mount point
   */
  public static Render(state: State, point: HTMLElement) {
    machine.setMountPoint(point);
    machine.pointer = state;

    console.log("INIT_STATE", state.name || "Anonymous", state.memory);

    render(
      state.view({
        ...state.memory,
        ...state.restWithMemory()
      }),
      point
    );
  }

  public static T(name: string, to: string) {
    return { name, to };
  }
}
