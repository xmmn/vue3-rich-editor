import { Plugin, Editor, ENode } from '../core'
import { isUndef } from '../utils/tool'

const styleList: {[key: string]: any} = {
  lineHeight: (node: ENode) => {
    return isUndef(node.lineHeight) ? undefined : `${node.lineHeight}px`
  }
}

export default class StylePlugin implements Plugin {
    name = 'plugin-style'

    install (context: Editor) {
      context.hook.registeHook(
        context.hook.hookKeys.afterCreateVnode,
        ({ data, vnode }) => {
          const node = data as ENode
          const style: {[key: string]: any} = {}
          for (const key in styleList) {
            const styleValue = styleList[key](node)
            if (styleValue) {
              style[key] = styleValue
            }
          }

          if (isUndef(vnode.props)) vnode.props = {}
          if (isUndef(vnode.props.style)) vnode.props.style = {}

          vnode.props.style = {
            ...vnode.props.style,
            ...style
          }
        }
      )
    }
}
