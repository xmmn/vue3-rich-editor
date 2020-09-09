import { Editor } from '.'

export const HookKeys: {
    [key: string]: string;
} = {
  // update editor data before create editor components
  preInit: 'preInit',

  // when a component is mounted, this hook will be trigger
  mounted: 'mounted'
}

export interface Hook {
    (editor: Editor): void;
}
