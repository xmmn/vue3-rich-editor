import { Editor, Hook, HookKeys } from '../..'

// relation hooks
export interface HookPlugin {
    hooks: {
        [key: string]: Array<Hook>;
    };
}

export class HookPlugin {
    hookKeys: { [key: string]: string } = HookKeys
    hooks: { [key: string]: Array<Hook> } = {}
    registeHook (key: string, hook: Hook) {
      if (!this.hooks[key]) {
        this.hooks[key] = []
      }

      this.hooks[key].push(hook)
    }
}

export function initHooks (this: Editor): void {
  for (const key in this.hook.hookKeys) {
    this.hook.hooks[key] = []
  }
}
