import { defineComponent, ref, h } from 'vue'
import { createEditor } from './members'
import { debounce } from 'lodash'

import FontPlugin from '../plugin-font'
import { ENodeHamdler, ENode } from '../core'

function renderContent (nodes: ENode[]) {
  console.log(nodes)
}

export default defineComponent({
  setup () {
    const container = ref(null)
    const editor = createEditor([
      ENodeHamdler.createNode('p', [
        ENodeHamdler.createTextNode('asdf')
      ])], [new FontPlugin()])
    // when editor is updated, we need reset selection
    // update user selection
    window.document.addEventListener('selectionchange', debounce(() => {
      editor.getSelection()
    }, 100))

    renderContent(editor.nodes)
    return () => {
      return <div contenteditable ref={container}>
        {
          /* render nodes */
          h('div', 'adfasdfsd')
        }
      </div>
    }
  }
})
