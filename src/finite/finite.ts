import { render } from 'lit-html'

import { StateType } from '../types/types'
import { State } from '../state/state'
import { Machine } from '../machine/machine'

const _machine = new Machine()
console.log('🚧 Right now console output only way to debug this is, so every Transition is logged')

export class Finite {
  static State({ name, view, memory, transitions, ...rest }: StateType): State {
    const state = new State({ name, view, memory, transitions, ...rest })
    _machine.add(state)

    return state
  }

  static Transition(from: string, name: string, memory = {}) {
    const state = _machine.find(from)

    const nextStateName = state.transitions.find(
      transition => transition.name === name
    ).to
    const nextState = _machine.find(nextStateName)

    console.log(
      'TRANSITION',
      name,
      `${from} -> ${nextStateName}`,
      `${JSON.stringify(state.memory)} -> ${JSON.stringify({
        ...nextState.memory,
        ...state.memory,
        ...memory
      })}`
    )
    nextState.memory = { ...nextState.memory, ...state.memory, ...memory }
    
    render(
      nextState.view(
        nextState.memory,
        nextState.rest
      ),
      _machine.getMountPoint()
    )
  }

  static Render(state: State, point: HTMLElement) {
    _machine.setMountPoint(point)
    console.log('INIT_STATE', state.name, JSON.stringify(state.memory))
    render(state.view(state.memory, state.rest), point)
  }
}
