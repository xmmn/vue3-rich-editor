
import { Editor } from './instance/editor'

export interface Plugin {
    name: string;
    // install cmd component or else
    install(context: Editor): void;
}
