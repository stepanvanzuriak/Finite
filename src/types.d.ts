import { TemplateResult } from "../node_modules/lit-html";

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

declare global {
  interface Window {
    h: Function;
    html: Function;
    Finite: any;
    State: Function;
    Render: Function;
    Transition: Function;
    AsyncTransition: Function;
    T: Function;
  }
}
