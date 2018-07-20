import { render } from 'lit-html';

import { StateType } from '../types/types';
import { State } from '../state/state';
import { Machine } from '../machine/machine';

const _machine = new Machine();
console.log(
  '🚧 Right now console output only way to debug this is, so every Transition is logged'
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
  static State({ name, view, memory, transitions, ...rest }: StateType): State {
    const state = new State({ name, view, memory, transitions, ...rest });
    _machine.add(state);

    return state;
  }
  /**
   * Transit state
   * @param from Name of state
   * @param to Name of transition
   * @param memory Extra memory to send
   */
  static Transition(from: string, name: string, memory = {}) {
    const state = _machine.find(from);

    const nextStateName = state.transitions.find(
      transition => transition.name === name
    ).to;
    const nextState = _machine.find(nextStateName);

    console.log(
      '%cTRANSITION',
      'color: green; font-weight: bold',
      name,
      `${from} -> ${nextStateName}`,
      state.memory,
      '-> ',
      {
        ...nextState.memory,
        ...state.memory,
        ...memory
      }
    );
    nextState.memory = { ...nextState.memory, ...state.memory, ...memory };

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

    console.log(
      '%cINIT_STATE',
      'color: blue; font-weight: bold',
      state.name,
      state.memory
    );

    render(state.view({ ...state.memory, ...state.rest }), point);
  }

  static T(name: string, to: string) {
    return { name, to };
  }
}
