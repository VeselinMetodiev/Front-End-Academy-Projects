import { Post } from "./posts.js";
import { ValidationConfig } from "./validate.js";

export interface AppState {
    editedPost: Post | undefined,
    allPosts: Post[]
  }
  
  export const AppStateStore: AppState = {
    editedPost: undefined,
    allPosts: [],
    PostFormValidationConfig: {
      title: Validators.required()
  }

  }