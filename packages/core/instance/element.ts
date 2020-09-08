import { Text } from '..'

export type Element = {
    type: string,
    children: Array<Element | Text>,
    [attr: string]: any
}