import { IEditor } from '..'

export interface Plugin {
    name: string,
    // 注册插件
    install(context: IEditor): void
}