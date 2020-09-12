import { Plugin, Editor } from '../core'

export default class IdPlugin implements Plugin {
    name = 'plugin-id'

    install (context: Editor) {
      context.hook.registeHook(
        context.hook.hookKeys.preRender,
        ({
          context, data
        }) => {
          console.log(context, data)
        })
    }
}
