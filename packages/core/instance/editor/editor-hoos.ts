import { Editor, Hook } from '../..'

// relation hooks
export interface HookPlugin {
  hooks: {
    [key: string]: Array<Hook>;
  };
}

export function initHooks (this: Editor): void {
  for (const key in this.hookKeys) {
    this.hooks[key] = []
  }
}
