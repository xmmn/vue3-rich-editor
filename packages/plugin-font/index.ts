import { Plugin, Editor } from '../core'

export default class FontPlugin implements Plugin {
    name = 'plugin-font'

    install (context: Editor) {
      context.plugin.registeCmd('font', (context: Editor) => {
        console.log(context)
      })
    }
}
