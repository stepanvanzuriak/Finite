import { ViewFunction, StateType, Transition } from '../types/types';

export class State {
  name: string;
  memory: object;
  view: ViewFunction;
  transitions: Transition[];
  rest: object;

  constructor({
    name,
    view,
    memory = {},
    transitions = [],
    ...rest
  }: StateType) {
    this.name = name;
    this.view = view;
    this.memory = memory;
    this.transitions = transitions;
    this.rest = rest;
  }
}
