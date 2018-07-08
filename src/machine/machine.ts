import { State } from '../state/State'

export class Machine {
  states: State[]
  point: HTMLElement

  constructor() {
    this.states = []
  }

  add(state: State) {
    this.states.push(state)
  }

  find(name: string) {
    return this.states.find(state => state.name === name)
  }

  setMountPoint(point: HTMLElement) {
    this.point = point
  }

  getMountPoint(): HTMLElement {
    return this.point
  }
}
