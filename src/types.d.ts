export interface ITransition {
  name: string;
  to: string;
}

export interface IStateType {
  name: string;
  view: any;
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
    raw: Function;
  }
}
