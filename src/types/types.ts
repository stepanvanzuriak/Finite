import { TemplateResult } from '../../node_modules/lit-html';

// Props is memory and methods
export type ViewFunction = (props: object) => TemplateResult;
export type Transition = { name: string; to: string };

export type StateType = {
  name: string;
  view: ViewFunction;
  memory: object;
  transitions: Transition[];
  rest: object;
};
