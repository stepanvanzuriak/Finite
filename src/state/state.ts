import { inject } from "../common/utils";
import { IStateType, ITransition, ViewFunction } from "../types";

export class State {
  public name: string;
  public memory: object;
  public view: ViewFunction;
  public transitions: ITransition[];
  public rest: object;

  constructor({
    name,
    view,
    memory = {},
    transitions = [],
    ...rest
  }: IStateType) {
    this.name = name;
    this.view = view;
    this.memory = memory;
    this.transitions = transitions;
    this.rest = rest;
  }

  public findByName(name) {
    return this.transitions.find(transition => transition.name === name);
  }

  public restWithMemory() {
    return Object.keys(this.rest).reduce(
      (acc, key) => ({
        ...acc,
        [key]: inject(this.rest[key], this.memory)
      }),
      {}
    );
  }
}
