import { Repository, RepositoryInMemory } from "./repository.js";
import { IdType } from "./shared-types.js";

export class PostCreateDto {
    constructor(
        public title: string,
        public content: string, 
        public tags: string[], 
        public imageUrl: string, 
        public authorId: IdType, 
        public id?: IdType | undefined) {
    }
}

export class Post extends PostCreateDto {
    constructor(
         title: string,
         content: string, 
         tags: string[], 
         imageUrl: string, 
         authorId: IdType,
         public id?: IdType,
        ) {
            super(title, content, tags, imageUrl, authorId)
    }
}

export interface PostRepository extends Repository<IdType, Post>{
    findByTags(searchTags: string[]) : Post[];
    findByTitlePart(titlePart: string) : Post[];
    findByAuthorId(authorId: IdType) : Post[];
}

export class PostRepositoryImpl extends RepositoryInMemory<IdType, Post> implements PostRepository {
    findByTags(searchTags: string[]): Post[] {
        return this.findAll().filter(post => post.tags.some(tag => searchTags.includes(tag)));
    }
    findByTitlePart(titlePart: string): Post[] {
        return this.findAll().filter(post => post.title.includes(titlePart));
    }
    findByAuthorId(authorId: number): Post[] {
        return this.findAll().filter(post => post.authorId === authorId);
    }
}

interface IdGenerator<K>{
    getNextId(): K;
}

export class NumberIdGenerator implements IdGenerator<number> {
    private nextId = 0;
    getNextId(): number {
        return ++this.nextId;
    }

}

const SAMPLE_POST = [
    new Post("New in Typescript", "Typescript becomes stricter...", ['typescript', 'novelties'], "https://assets.logitech.com/assets/64683/performance-mouse-mx.png", 1),
    new Post("New in ECMAScript", "ES becomes stricter...", ['ecmascript', 'novelties'], "https://assets.logitech.com/assets/64683/performance-mouse-mx.png", 1),
    new Post("New in JavaScript", "Typescript becomes stricter...", ['javascript', 'novelties'], "https://assets.logitech.com/assets/64683/performance-mouse-mx.png", 2),
];

function testPostRepository() {
    const postRepo: PostRepository = new PostRepositoryImpl(new NumberIdGenerator());
    SAMPLE_POST.forEach(post => postRepo.create(post));
    console.log('Find all');
    
    postRepo.findAll().forEach(post => console.log(post));
    console.log('Find by Tags');
    postRepo.findByTags(['novelties', 'es']).forEach(post => console.log(post));
    console.log('Find by title');
    postRepo.findByTitlePart('Script').forEach(post => console.log(post));
    console.log('Find by author');
    postRepo.findByAuthorId(2).forEach(post => console.log(post));
}

testPostRepository();