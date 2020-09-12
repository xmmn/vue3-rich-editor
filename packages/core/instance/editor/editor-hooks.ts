import { Editor, Hook, HookKeys } from '../..'
import { ENode } from '../node'

// relation hooks
export interface HookPlugin {
    hooks: {
        [key: string]: Array<Hook>;
    };
}

export type HookTriggerData = {
  context: Editor;
  data: ENode[] | ENode;
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

    triggerHook (hookName: string, data: HookTriggerData) {
      const hooks = this.hooks[hookName]

      if (hooks && hooks.length) {
        hooks.forEach(hook => {
          hook(data)
        })
      }
    }
}

export function initHooks (this: Editor): void {
  for (const key in this.hook.hookKeys) {
    this.hook.hooks[key] = []
  }
}
