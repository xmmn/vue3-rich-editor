import { Component } from 'vue'

export class EditorComponent {
    componentNamePrex = 'com-'
    components: {
        [componentName: string]: Component;
    } = {}

    registeComponent (name: string, comp: Component) {
      this.components[this.componentNamePrex + name] = comp
    }

    findComponent (name: string) {
      return this.components[this.componentNamePrex + name]
    }
}
