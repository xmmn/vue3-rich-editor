import { Text, Element } from '..'

export type Node = Text | Element

interface NodeOperator {
    isText(node: Node): boolean;

    isElement(node: Node): boolean;
}

export const NodeOperator: NodeOperator = {
  isText (node: Node): boolean {
    return !!node.text
  },

  isElement (node: Node): boolean {
    return !!node.type
  }
}
