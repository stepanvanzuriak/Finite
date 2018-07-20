import { Finite } from './finite/finite';
import { html } from 'lit-html/lib/lit-extended';

window.h = html;
global.h = html;
window.Finite = Finite;
global.Finite = Finite;

export { html as h };
export default Finite;
