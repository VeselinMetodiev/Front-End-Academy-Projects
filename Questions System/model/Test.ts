import { Answer } from "./Answer";
import { Question } from "./Question";
import { IdType, QuestionTypes } from "./shared-types";

export class Test {
    constructor(
        public name: string,
        public version: number,
        public questions: Question[],
        public id: IdType = undefined,
    ) {
        
    }
}