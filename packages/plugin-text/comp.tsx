import { defineComponent } from 'vue'

export default defineComponent({

  setup (props, { slots }) {
    return () => {
      return <span>
        {slots.default ? slots.default() : undefined}
      </span>
    }
  }
})
