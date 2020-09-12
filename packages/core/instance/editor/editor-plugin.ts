import { Editor, Plugin } from '../..'

export interface CommandHandler {
    (context: Editor, ...others: any[]): void;
}

// relation plugin
let pid = 0
export class EditorPlugin {
    plugins: {
        [pluginName: string]: Plugin;
    } = {}

    commands: {
        [cmd: string]: CommandHandler;
    } = {}

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

    registeCmd (cmd: string, fn: CommandHandler): void {
      this.commands[cmd] = fn
    }
}

export function initPlugins (this: Editor, plugins: Array<Plugin>): void {
  plugins.forEach(plugin => {
    this.plugin.addPlugin(plugin)
    plugin.install(this)
  })
}
