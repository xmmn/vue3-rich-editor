import { Plugin, Editor } from '../core'
import ParagraphComponent from './comp'

export default class ParagraphPlugin implements Plugin {
    name = 'plugin-paragraph'

    install (context: Editor) {
      context.component.registeComponent('p', ParagraphComponent)
    }
}
