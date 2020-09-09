import { Plugin, Node, HookKeys, Hook } from '..'

// relation plugin
export interface EditorPlugin {
    // all plugins
    plugins: {
        [pluginName: string]: Plugin;
    };

    commands: {
        [cmd: string]: Plugin;
    };

    addPlugin(plugin: Plugin): void;
    hasPlugin(name: string): boolean;
    getPlugin(name: string): Plugin;

    // registe a cmd
    registeCmd(cmd: string, plugin: Plugin): void;
}

// relation hooks
export interface HookPlugin {
    hooks: {
        [key: string]: Array<Hook>;
    };
}

export interface CommonEditor extends EditorPlugin, HookPlugin {
    nodes: Array<Node>;
}

function initHooks (this: Editor): void{
  for (const key in this.hookKeys) {
    this.hooks[key] = []
  }
}

function initPlugins (this: Editor, plugins: Array<Plugin>): void{
  plugins.forEach(plugin => {
    this.addPlugin(plugin)
    plugin.install(this)
  })
}

let pid = 0

// define base Editor, regiter plugin, operate data, tigger hooks
class Editor implements CommonEditor {
    plugins: {
        [pluginName: string]: Plugin;
    } = {}

    commands: {
        [cmd: string]: Plugin;
    } = {}

    hookKeys: {[key: string]: string} = HookKeys
    hooks: { [key: string]: Array<Hook> } = {}
    nodes: Array<Node> = []

    constructor (nodes: Node[], options?: {
        plugins: Array<Plugin>;
    }) {
      this.nodes = nodes
      const { plugins = [] } = options || {}

      // init Hooks
      initHooks.call(this)
      initPlugins.call(this, plugins)
    }

    addPlugin (plugin: Plugin): void {
      const { name = `p-${pid++}` } = plugin

      if (this.hasPlugin(name)) {
        throw new Error(`cannot add same name plugin: ${name}`)
      }

      this.plugins[name] = plugin
    }

    hasPlugin (name: string) {
      return !!this.plugins[name]
    }

    getPlugin (name: string) {
      return this.plugins[name]
    }

    registeCmd (cmd: string, plugin: Plugin): void {
      this.commands[cmd] = plugin
    }

    registeHook (key: string, hook: Hook) {
      if (!this.hooks[key]) {
        this.hooks[key] = []
      }

      this.hooks[key].push(hook)
    }
}

export {
  Editor
}
