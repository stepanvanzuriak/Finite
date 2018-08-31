import { Finite } from "./finite/finite";
import { html } from "lit-html/lib/lit-extended";

window.h = html;
window.Finite = Finite;
window.State = Finite.State;
window.Render = Finite.Render;
window.Transition = Finite.Transition;
window.T = Finite.T;

global.h = html;
global.Finite = Finite;
global.State = Finite.State;
global.Render = Finite.Render;
global.Transition = Finite.Transition;
global.T = Finite.T;

export const State = Finite.State;
export const Render = Finite.Render;
export const Transition = Finite.Transition;
export const T = Finite.T;
export { html as h };

export default Finite;
