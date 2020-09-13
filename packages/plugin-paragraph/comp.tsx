import { defineComponent } from 'vue'
import { Editor } from '../core'

export default defineComponent({

  setup (props, { slots, emit }) {
    const click = () => {
      emit('excute', {
        id: 0,
        cb: (context: Editor) => {
          console.log(context)
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
