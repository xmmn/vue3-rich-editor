import { ENodeHandler } from '../../core'

export const testData = [
  ENodeHandler.createNode('p', [
    ENodeHandler.createTextNode('asdf')
  ], {
    lineHeight: 40
  })
]
