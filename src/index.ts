import { html, raw } from 'picohtml';
import { Finite } from './finite/finite';

window.h = html;
window.raw = raw;
window.Finite = Finite;
window.State = Finite.State;
window.Render = Finite.Render;
window.Transition = Finite.Transition;
window.AsyncTransition = Finite.AsyncTransition;
window.T = Finite.T;

export const State = Finite.State;
export const Render = Finite.Render;
export const Transition = Finite.Transition;
export const AsyncTransition = Finite.AsyncTransition;
export const T = Finite.T;
export { html as h };
export { raw };

export default Finite;
