import { Node, Editor, Plugin } from '../../core'

// create editor
export const createEditor = (data: Array<Node>, plugins: Array<Plugin>) => {
  return new Editor(data, {
    plugins
  })
}
