import { getAllPosts } from "./blogs-api-client.js";
import { showError } from "./index.js";
export async function getPosts() {
    let allPosts;
    try {
        allPosts = await getAllPosts();
      } catch (err) {
        showError(err);
      };
      return allPosts;
    }

