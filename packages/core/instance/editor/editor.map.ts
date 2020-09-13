import { ENode } from '../..'

export class EditorMap {
   private map: {[key: number]: ENode} = {}

   add (id: number, node: ENode) {
     this.map[id] = node
   }

   get (id: number) {
     return this.map[id]
   }
}
