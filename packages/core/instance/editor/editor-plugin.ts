import { Editor, Plugin } from '../..'

export interface CommandHandler {
    (context: Editor, ...others: any[]): void;
}

// relation plugin
export interface EditorPlugin {
    // all plugins
    plugins: {
        [pluginName: string]: Plugin;
    };

    commands: {
        [cmd: string]: CommandHandler;
    };

    addPlugin(plugin: Plugin): void;
    hasPlugin(name: string): boolean;
    getPlugin(name: string): Plugin;

    // registe a cmd
    registeCmd(cmd: string, fn: CommandHandler): void;
}

export function initPlugins (this: Editor, plugins: Array<Plugin>): void {
  plugins.forEach(plugin => {
    this.addPlugin(plugin)
    plugin.install(this)
  })
}
