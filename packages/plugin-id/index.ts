import { Plugin, Editor, ENode } from '../core'
import { isUndef } from '../utils/tool'
import { VNode } from 'vue'

let isFirst = true
let id = 0

function eachNode (nodes: ENode[], context: Editor) {
  nodes.forEach(node => {
    if (isFirst) {
      node.id = id++
    } else {
      if (isUndef(node.id)) {
        node.id = id++
      }
    }

    // save id, node relation
    context.map.add(node.id!, node)

    if (node.children && node.children.length) {
      eachNode(node.children, context)
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
            eachNode(data as ENode[], context)
          } else {
            eachNode([data as ENode], context)
          }

          isFirst = false
        })

      context.hook.registeHook(
        context.hook.hookKeys.afterCreateVnode,
        ({ vnode, data }) => {
          if (!isUndef(vnode)) {
            const v = vnode as VNode
            if (!v.props) v.props = {}
            v.props['data-id'] = (data as ENode).id
          }
        }
      )
    }
}
