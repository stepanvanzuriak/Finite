import { State } from '../state/State';

/**
 * Class to save states and mount point
 */
export class Machine {
  // Array of states
  states: State[];
  // Main mount point
  point: HTMLElement;

  constructor() {
    this.states = [];
  }

  /**
   * Add state to Machine
   * @param state Instance of State
   */
  add(state: State) {
    this.states.push(state);
  }

  /**
   * Search state by name
   * @param name Name
   */
  find(name: string) {
    return this.states.find(state => state.name === name);
  }

  /**
   * Set main mount point for app
   * @param point HTMLElement mount point
   */
  setMountPoint(point: HTMLElement) {
    this.point = point;
  }

  /**
   * Returns main mount point
   * @returns Main mount point
   */
  getMountPoint(): HTMLElement {
    return this.point;
  }
}
