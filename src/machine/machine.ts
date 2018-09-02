import { State } from "../state/state";

/**
 * Class to save states and mount point
 */
export class Machine {
  // Array of states
  public states: State[];
  // Main mount point
  public point: HTMLElement;

  public pointer: State;

  constructor() {
    this.states = [];
    this.point = null;
    this.pointer = null;
  }

  /**
   * Add state to Machine
   * @param state Instance of State
   */
  public add(state: State) {
    this.states.push(state);
  }

  /**
   * Search state by name
   * @param name Name
   */
  public find(name: string) {
    return this.states.find(state => state.name === name);
  }

  /**
   * Set main mount point for app
   * @param point HTMLElement mount point
   */
  public setMountPoint(point: HTMLElement) {
    this.point = point;
  }

  /**
   * Returns main mount point
   * @returns Main mount point
   */
  public getMountPoint(): HTMLElement {
    return this.point;
  }
}
