// tslint:disable-next-line:no-submodule-imports
import { html } from "lit-html/lib/lit-extended";
import { Finite } from "./finite/finite";

window.h = html;
window.html = html;
window.Finite = Finite;
window.State = Finite.State;
window.Render = Finite.Render;
window.Transition = Finite.Transition;
window.T = Finite.T;

export const State = Finite.State;
export const Render = Finite.Render;
export const Transition = Finite.Transition;
export const T = Finite.T;
export { html };
export { html as h };

export default Finite;
