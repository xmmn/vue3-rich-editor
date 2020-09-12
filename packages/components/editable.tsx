import { defineComponent, ref, h, VNode } from 'vue'
import { createEditor } from './members'
import { debounce } from 'lodash'

import FontPlugin from '../plugin-font'
import ParagraphPlugin from '../plugin-paragraph'
import Textplugin from '../plugin-text'
import IdPlugin from '../plugin-id'

import { ENodeHamdler, ENode, Editor } from '../core'

function renderContent (editor: Editor, nodes: ENode[]): VNode[] {
  // trigger preRender hook
  editor.hook.triggerHook(editor.hook.hookKeys.preRender, {
    context: editor,
    data: nodes
  })
  return nodes.map(node => {
    const comp = editor.getComponent(node)
    if (ENodeHamdler.isTextNode(node)) {
      return h(comp, node.text)
    } else {
      return h(comp, renderContent(editor, node.children))
    }
  })
}

export default defineComponent({
  setup () {
    const container = ref(null)
    const editor = createEditor([
      ENodeHamdler.createNode('p', [
        ENodeHamdler.createTextNode('asdf')
      ])], [new FontPlugin(), new ParagraphPlugin(), new Textplugin(), new IdPlugin()])
    // when editor is updated, we need reset selection
    // update user selection
    window.document.addEventListener('selectionchange', debounce(() => {
      editor.getSelection()
    }, 100))

    return () => {
      return <div contenteditable ref={container}>
        {
          /* render nodes */
          renderContent(editor, editor.nodes)
        }
      </div>
    }
  }
})
