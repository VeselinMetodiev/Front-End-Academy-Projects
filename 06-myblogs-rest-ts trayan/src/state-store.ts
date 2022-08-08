import { Post } from "./posts.js";
import { ValidationConfig, Validators } from "./validate.js";

export interface AppState {
    editedPost: Post | undefined;
    allPosts: Post[],
    postFormValidationConfig: ValidationConfig<Post>,
    postFormErrors: string[]
}

export const AppStateStore: AppState = {
    editedPost: undefined,
    allPosts: [],
    postFormValidationConfig: { //Field name from Post + validation method from validate.js
        title: [Validators.required(), Validators.len(3, 60)], //More validations for one field => put them in an array
        tags: Validators.required(),
        authorId: Validators.required(), // Does not work
        content: Validators.required(),
        imageUrl: Validators.required(),
    },
    postFormErrors: []
}