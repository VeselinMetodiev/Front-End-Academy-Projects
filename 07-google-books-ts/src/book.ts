export class Book {
    constructor(
        public title: string,
        public content: string,
        public tags: string[], //Todo change contents
        public imageUrl: string,
        public authorId: IdType,
        public id: IdType,
    ) {
        // super(title, content, tags, imageUrl, authorId);
    }
}
