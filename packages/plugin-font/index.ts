import { Plugin, Editor } from '../core'

export default class FontPlugin implements Plugin {
    name = 'plugin-font'

    install (context: Editor) {
      context.registeCmd('font', this)
    }
}
