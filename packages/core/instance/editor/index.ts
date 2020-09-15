import { BaseEditor } from './base'
import { ENode, Plugin } from '../..'
import { initPlugins } from './editor-plugin'
import { initHooks } from './editor-hooks'
import { isDOMNode, isDOMElement } from '../../../utils/dom'
import { PathHandler, PathPoint } from '../path'

export type ExcuteCallBackFn = (node: ENode, context: Editor) => void
export type HowFindNodeFn = (context: Editor) => ENode

// transform
export class Editor extends BaseEditor {
  constructor (nodes: ENode[], options?: {
    plugins: Array<Plugin>;
  }) {
    super()
    this.nodes = nodes
    const { plugins = [] } = options || {}
    // init Hooks
    initHooks.call(this)
    initPlugins.call(this, plugins)
  }

  isFocus (container: HTMLElement) {
    return document.activeElement === container
  }

  // check dom node is in Editor
  hasDomNode (target: Node): boolean {
    const targetEl = (isDOMElement(target)
      ? target
      : target.parentElement) as HTMLElement
    if (!targetEl) {
      return false
    }

    return targetEl.closest('[data-editor]') === this.el
  }

  hasEditableTarget (target: Node): boolean {
    return isDOMNode(target) && this.hasDomNode(target)
  }

  getSelection () {
    const domSelection = window.getSelection()
    if (domSelection) {
      const domRange =
          domSelection &&
          domSelection.rangeCount > 0 &&
          domSelection.getRangeAt(0)

      if (
        domRange &&
        this.hasEditableTarget(domRange.startContainer) &&
        this.hasEditableTarget(domRange.endContainer)
      ) {
        const range = this.toEditorRange(domRange)
        console.log(range)
      }
    }
  }

  toEditorRange (domRange: Range | StaticRange | Selection) {
    const el =
      domRange instanceof Selection
        ? domRange.anchorNode
        : domRange.startContainer
    let anchorNode
    let anchorOffset
    let focusNode
    let focusOffset
    let isCollapsed

    if (el) {
      if (domRange instanceof Selection) {
        anchorNode = domRange.anchorNode
        anchorOffset = domRange.anchorOffset
        focusNode = domRange.focusNode
        focusOffset = domRange.focusOffset
        isCollapsed = domRange.isCollapsed
      } else {
        anchorNode = domRange.startContainer
        anchorOffset = domRange.startOffset
        focusNode = domRange.endContainer
        focusOffset = domRange.endOffset
        isCollapsed = domRange.collapsed
      }
    }

    if (
      anchorNode == null ||
      focusNode == null ||
      anchorOffset == null ||
      focusOffset == null
    ) {
      throw new Error(
        `Cannot get a correct range from DOM range: ${domRange}`
      )
    }

    const anchor = this.toPathPoint(anchorNode, anchorOffset)
    const focus = isCollapsed
      ? anchor
      : this.toPathPoint(focusNode, focusOffset)

    return PathHandler.createPath(anchor, focus)
  }

  toPathPoint (target: Node, offset: number): PathPoint {
    const targetEl = (isDOMElement(target)
      ? target
      : target.parentElement) as HTMLElement
    return PathHandler.createPathPoint(Number.parseInt(targetEl.dataset.id!), offset)
  }

  // how to render node by node type
  getComponent (node: ENode) {
    return this.component.findComponent(node.type)
  }

  // excute component emit
  excute (id: number, cb: ExcuteCallBackFn, how?: HowFindNodeFn) {
    // find the node, and call callback
    let node: ENode
    if (how) {
      node = how(this)
    } else {
      node = this.map.get(id)
    }

    cb && cb(node, this)
  }
}
