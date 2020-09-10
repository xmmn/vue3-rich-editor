import { Plugin, ENode, HookKeys, Hook } from '../..'
import { CommandHandler, initPlugins, EditorPlugin } from './editor-plugin'
import { initHooks, HookPlugin } from './editor-hoos'

export interface CommonEditor extends EditorPlugin, HookPlugin {
  nodes: Array<ENode>;
}

let pid = 0

// define base Editor, regiter plugin, operate data, tigger hooks
class Editor implements CommonEditor {
  plugins: {
    [pluginName: string]: Plugin;
  } = {}

  commands: {
    [cmd: string]: CommandHandler;
  } = {}

  hookKeys: { [key: string]: string } = HookKeys
  hooks: { [key: string]: Array<Hook> } = {}
  nodes: Array<ENode> = []

  constructor (nodes: ENode[], options?: {
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

  registeCmd (cmd: string, fn: CommandHandler): void {
    this.commands[cmd] = fn
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
