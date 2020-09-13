import { BaseEditor } from './base'
import { ENode, Plugin } from '../..'
import { initPlugins } from './editor-plugin'
import { initHooks } from './editor-hooks'
// transform
export class Editor extends BaseEditor {
  constructor (nodes: ENode[], options?: {
    plugins: Array<Plugin>;
  }) {
    super()
    this.nodes = nodes
    const { plugins = [] } = options || {}

    // init Hooks
    initHooks.call(this)
    initPlugins.call(this, plugins)
  }

  isFocus (container: HTMLElement) {
    return document.activeElement === container
  }

  getSelection () {
    const domSelection = window.getSelection()
    if (domSelection) {
      const range = this.toEditorRange(domSelection)
      console.log(range)
    }
  }

  toEditorRange (domSelection: Selection) {
    return domSelection
  }

  // how to render node by node type
  getComponent (node: ENode) {
    return this.component.findComponent(node.type)
  }

  // excute component emit
  excute (id: number, cb: (node: ENode, context: Editor) => void, how?: (context: Editor) => ENode) {
    // find the node, and call callback
    let node: ENode
    if (how) {
      node = how(this)
    } else {
      node = this.map.get(id)
    }

    cb && cb(node, this)
  }
}
