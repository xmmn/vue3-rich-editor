export type ENode = {
  isENode: true;
  type: string;
  [attr: string]: any;
  children: Array<ENode>;
  text?: string;
}

export const ENodeHamdler = {
  isENode (obj: any) {
    return obj.isENode
  },

  createNode (
    type: string,
    children: Array<ENode> = [],
    attrs: { [attr: string]: any } = {}): ENode {
    return {
      isENode: true,
      type,
      children,
      ...attrs
    } as ENode
  },

  createTextNode (text: string, attrs: { [attr: string]: any } = {}): ENode {
    return {
      isENode: true,
      type: 'text-node',
      children: [],
      ...attrs,
      text
    } as ENode
  }
}
