import { ENode } from '../..'
import { EditorPlugin } from './editor-plugin'
import { HookPlugin } from './editor-hooks'

// define base Editor, regiter plugin, operate data, tigger hooks
export class BaseEditor {
  plugin: EditorPlugin = new EditorPlugin()
  hook: HookPlugin = new HookPlugin()
  nodes: Array<ENode> = []
}
