import { defineComponent } from 'vue'
import { createEditor } from './members'

import FontPlugin from '../plugin-font'

export default defineComponent({
  setup () {
    console.log(createEditor([], [new FontPlugin()]))
    return () => {
      return <div contenteditable>sdfasfasdf</div>
    }
  }
})
