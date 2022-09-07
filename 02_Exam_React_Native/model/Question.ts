import { Answer } from "./Answer";
import { IdType, QuestionTypes } from "./shared-types";

export class Question {
    constructor(
        public text: string,
        public pointsNumber: number,
        public answers: Answer[],
        public imageURI: string,
        public dateCreated: string,
        public dateModified: string,
        public type: QuestionTypes,
        public id: IdType = undefined,
    ) {
        
    }
}