import { Plugin, Editor, HowFindNodeFn, ExcuteCallBackFn } from '../core'
import { isUndef } from '../utils/tool'

type ExcuteArgument = {
  id: number;
  cb: ExcuteCallBackFn;
  how?: HowFindNodeFn;
}

export default class EventPlugin implements Plugin {
  name = 'plugin-event'

  install (context: Editor) {
    context.hook.registeHook(
      context.hook.hookKeys.afterCreateVnode,
      ({ context, vnode }) => {
        if (isUndef(vnode.props)) vnode.props = {}
        // set event to node
        vnode.props.onExcute = ({ id, cb, how }: ExcuteArgument) => {
          context.excute(id, cb, how)
        }
      }
    )
  }
}
