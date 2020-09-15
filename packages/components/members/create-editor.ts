import { ENode, Editor, Plugin } from '../../core'

// create editor
export const createEditor = (
  data: Array<ENode>,
  plugins: Array<Plugin>) => {
  return new Editor(data, {
    plugins
  })
}
