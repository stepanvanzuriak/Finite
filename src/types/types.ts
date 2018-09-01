import { TemplateResult } from "../../node_modules/lit-html";

// Props is memory and methods
export type ViewFunction = (props: object) => TemplateResult;

export interface ITransition {
  name: string;
  to: string;
}

export interface IStateType {
  name: string;
  view: ViewFunction;
  memory: object;
  transitions: ITransition[];
  rest: object;
}
