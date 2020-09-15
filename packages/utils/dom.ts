import DOMNode = globalThis.Node
import DOMElement = globalThis.Element
export const isDOMNode = (value: any): value is DOMNode => {
  return value instanceof Node
}

export const isDOMElement = (value: any): value is DOMElement => {
  return isDOMNode(value) && value.nodeType === 1
}
