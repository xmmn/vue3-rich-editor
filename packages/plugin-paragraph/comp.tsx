import { defineComponent } from 'vue'
import { Editor, ENode } from '../core'

export default defineComponent({

  setup (props, { slots, emit }) {
    const click = () => {
      emit('excute', {
        id: 0,
        cb: (node: ENode, context: Editor) => {
          console.log(node, context)
        }
      })
    }
    return () => {
      return <div onClick={click}>
        {slots.default ? slots.default() : undefined}
      </div>
    }
  }
})
