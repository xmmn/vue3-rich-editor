import { Plugin, Editor, ENode } from '../core'
import { isUndef } from '../utils/tool'
import { VNode } from 'vue'

let isFirst = true
let id = 0

function eachNode (nodes: ENode[]) {
  nodes.forEach(node => {
    if (isFirst) {
      node.id = id++
    } else {
      if (isUndef(node.id)) {
        node.id = id++
      }
    }

    if (node.children && node.children.length) {
      eachNode(node.children)
    }
  })
}

// set id for every node
export default class IdPlugin implements Plugin {
    name = 'plugin-id'

    install (context: Editor) {
      context.hook.registeHook(
        context.hook.hookKeys.preRender,
        ({
          data
        }) => {
          if (data.length) {
            eachNode(data as ENode[])
          } else {
            eachNode([data as ENode])
          }

          isFirst = false
        })

      context.hook.registeHook(
        context.hook.hookKeys.afterCreateVnode,
        ({ vnode, data }) => {
          if (!isUndef(vnode)) {
            const v = vnode as VNode
            if (!v.props) v.props = {}
            v.props['date-id'] = (data as ENode).id
          }
        }
      )
    }
}
