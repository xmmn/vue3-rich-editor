import { defineComponent } from 'vue'

export default defineComponent({

  setup (props, { slots }) {
    return () => {
      return <div>
        {slots.default ? slots.default() : undefined}
      </div>
    }
  }
})
