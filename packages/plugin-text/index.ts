import { Plugin, Editor } from '../core'
import TextComponent from './comp'

export default class TextPlugin implements Plugin {
    name = 'text-paragraph'

    install (context: Editor) {
      context.component.registeComponent('text-node', TextComponent)
    }
}
