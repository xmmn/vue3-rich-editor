
import FontPlugin from '../../plugin-font'
import ParagraphPlugin from '../../plugin-paragraph'
import Textplugin from '../../plugin-text'
import IdPlugin from '../../plugin-id'
import StylePlugin from '../../plugin-style'

const allPlugins = [
  new FontPlugin(),
  new ParagraphPlugin(),
  new Textplugin(),
  new IdPlugin(),
  new StylePlugin()
]

export {
  allPlugins
}
