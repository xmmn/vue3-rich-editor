import { Plugin } from '..'

export interface EditorPlugin {
    // all plugins
    plugins: {
        [pluginName: string]: Plugin
    },

    commands: {
        [cmd: string]: Plugin
    }

    addPlugin(plugin: Plugin): void
    hasPlugin(name): boolean
    getPlugin(name): Plugin

    // registe a cmd
    registeCmd(cmd: string, plugin: Plugin): void
}

export interface IEditor extends EditorPlugin { }

let pid = 0

class Editor implements IEditor {
    plugins = {}
    commands = {}

    constructor() { }

    addPlugin(plugin: Plugin): void {
        const { name = `p-${pid++}` } = plugin

        if (this.hasPlugin(name)) {
            throw new Error(`cannot add same name plugin: ${name}`)
        }

        this.plugins[name] = plugin
    }

    hasPlugin(name: string) {
        return this.plugins[name]
    }

    getPlugin(name: string){
        return this.plugins[name]
    }

    registeCmd(cmd: string, plugin: Plugin): void {
        throw new Error("Method not implemented.");
    }
}

export {
    Editor
}