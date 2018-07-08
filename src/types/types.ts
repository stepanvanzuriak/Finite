import { TemplateResult } from '../../node_modules/lit-html'

export type ViewFunction = (memory: object, methods?: any) => TemplateResult
export type Transition = { name: string; to: string }
export type StateType = {
  name: string
  view: ViewFunction
  memory: object
  transitions: Transition[]
  rest: object
}
