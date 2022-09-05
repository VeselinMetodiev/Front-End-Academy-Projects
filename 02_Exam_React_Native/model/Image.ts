import { IdType } from "./shared-types";

export class ImageModel {
    constructor(
        public title: string,
        public description: string,
        public tags: string[],
        public imageURI: string,
        public authorName: string,
        public dateOfPicture: string,
        public id: IdType = undefined,
    ) {
        // super(title, content, tags, imageUrl, authorId);
    }
}