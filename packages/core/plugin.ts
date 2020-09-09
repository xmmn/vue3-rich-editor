import { CommonEditor } from '.'

export interface Plugin {
    name: string;
    // 注册插件
    install(context: CommonEditor): void;
}
