import { CommonEditor } from '.'

export interface Plugin {
    name: string;
    // install cmd component or else
    install(context: CommonEditor): void;
}
