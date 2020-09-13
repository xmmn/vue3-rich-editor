import { Plugin, Editor, ENode } from '../core'

const styleList = {
  lineHeight: (node: ENode) => {
    return `${node.lineHeight}px`
  }
}

export default class StylePlugin implements Plugin {
    name = 'plugin-style'

    install (context: Editor) {
      context.hook.registeHook(
        context.hook.hookKeys.afterCreateVnode,
        () => {
          console.log(styleList)
        }
      )
    }
}
