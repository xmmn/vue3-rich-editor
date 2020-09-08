import { Plugin, Node } from '..'

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

export interface CommonEditor extends EditorPlugin {
    nodes: Array<Node>;
}

let pid = 0

class Editor implements CommonEditor {
    plugins: {
        [pluginName: string]: Plugin;
    } = {}

    commands: {
        [cmd: string]: Plugin;
    } = {}

    nodes: Array<Node> = []

    constructor (nodes: Node[]) {
      this.nodes = nodes
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
}

export {
  Editor
}
