import { Plugin, Editor, ENode } from '../core'
import { isUndef } from '../utils/tool'

export default class EventPlugin implements Plugin {
    name = 'plugin-event'

    install (context: Editor) {
      context.hook.registeHook(
        context.hook.hookKeys.afterCreateVnode,
        ({ context, vnode }) => {
          if (isUndef(vnode.props)) vnode.props = {}
          if (isUndef(vnode.props.on)) vnode.props.on = {}

          vnode.props.on.excute = ({ id, cb, how }:
            {id: number; cb: (node: ENode, context: Editor) => void; how?: (context: Editor) => ENode}) => {
            context.excute(id, cb, how)
          }
        }
      )
    }
}
