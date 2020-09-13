import { ENode } from '../..'
import { EditorPlugin } from './editor-plugin'
import { HookPlugin } from './editor-hooks'
import { EditorComponent } from './editor-component'
import { EditorMap } from './editor.map'

// define base Editor, regiter plugin, operate data, tigger hooks
export class BaseEditor {
  plugin: EditorPlugin = new EditorPlugin()
  hook: HookPlugin = new HookPlugin()
  component: EditorComponent = new EditorComponent()
  nodes: Array<ENode> = []
  map: EditorMap = new EditorMap()
}
