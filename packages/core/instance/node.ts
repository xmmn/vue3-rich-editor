import { isUndef } from '../../utils/tool'

export type ENode = {
  type: string;
  [attr: string]: any;
  children: Array<ENode>;
  text?: string;
}

const textType = 'text-node'

export const ENodeHamdler = {
  isENode (obj: any) {
    if (!obj.type) {
      return false
    } else {
      if (obj.type === textType) {
        return !isUndef(obj.text)
      } else {
        return !isUndef(obj.children)
      }
    }
  },

  createNode (
    type: string,
    children: Array<ENode> = [],
    attrs: { [attr: string]: any } = {}): ENode {
    return {
      type,
      children,
      ...attrs
    } as ENode
  },

  createTextNode (text: string, attrs: { [attr: string]: any } = {}): ENode {
    return {
      type: textType,
      children: [],
      ...attrs,
      text
    } as ENode
  }
}
