import { HookTriggerData } from './instance/editor/editor-hooks'

export const HookKeys: {
    [key: string]: string;
} = {
  // update editor data before create editor components
  preRender: 'preRender',

  // when a component is mounted, this hook will be trigger
  afterRender: 'afterRender',

  afterCreateVnode: 'afterCreateVnode'
}

export interface Hook {
    (data: HookTriggerData): void;
}
