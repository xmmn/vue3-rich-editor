export type Text = {
    // text node
    text: string;
    // attribute
    [attr: string]: unknown;
}

// text operator
interface TextOperator {
    // check if two Text is equal
    equals(a: Text, b: Text, options: { strict: boolean }): boolean;
    // clone a Text node
    clone(text: Text, options: { removeAttrs: boolean }): Text;
}

export const TextOperator: TextOperator = {
  equals (a: Text, b: Text, options: { strict: boolean }) {
    const { strict = false } = options

    for (const key in a) {
      if (!strict && key === 'text') {
        continue
      }

      if (a[key] !== b[key]) {
        return false
      }
    }

    for (const key in b) {
      if (!strict && key === 'text') {
        continue
      }

      if (b[key] !== a[key]) {
        return false
      }
    }

    return false
  },

  clone (text: Text, options: { removeAttrs: boolean }) {
    const { removeAttrs = false } = options
    if (removeAttrs) {
      return {
        text: text.text
      }
    }
    return {
      ...text
    }
  }
}
