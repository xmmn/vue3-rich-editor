import { defineComponent, ref } from 'vue'
import { createEditor } from './members'
import { debounce } from 'lodash'

import FontPlugin from '../plugin-font'
import { ENodeHamdler } from '../core'

export default defineComponent({
  setup () {
    const container = ref(null)
    const editor = createEditor([
      ENodeHamdler.createNode('p', [
        ENodeHamdler.createTextNode('asdf')
      ])], [new FontPlugin()])
    console.log(editor)
    // when editor is updated, we need reset selection
    // update user selection
    window.document.addEventListener('selectionchange', debounce(() => {
      editor.getSelection()
    }, 100))
    return () => {
      return <div contenteditable ref={container}><div>sdfasfasdf</div><div>a</div></div>
    }
  }
})
