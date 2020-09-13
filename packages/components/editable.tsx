import { defineComponent, ref, h, VNode } from 'vue'
import { createEditor, allPlugins, testData } from './members'
import { debounce } from 'lodash'

import { ENodeHamdler, ENode, Editor } from '../core'

function renderContent (editor: Editor, nodes: ENode[]): VNode[] {
  // trigger preRender hook
  editor.hook.triggerHook(editor.hook.hookKeys.preRender, {
    context: editor,
    data: nodes
  })
  return nodes.map(node => {
    const comp = editor.getComponent(node)
    let vnode
    if (ENodeHamdler.isTextNode(node)) {
      vnode = h(comp, node.text)
    } else {
      vnode = h(comp, renderContent(editor, node.children))
    }
    editor.hook.triggerHook(editor.hook.hookKeys.afterCreateVnode, {
      context: editor,
      data: node,
      vnode
    })
    return vnode
  })
}

export default defineComponent({
  setup () {
    const container = ref(null)
    const editor = createEditor(testData, allPlugins)
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
