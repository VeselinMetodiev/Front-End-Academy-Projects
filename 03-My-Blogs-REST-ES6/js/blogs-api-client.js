const API_BASE_URL = "http://localhost:3000/api/posts";

//Fetch the posts from db.json. Returns promise
export async function getAllPosts() {
    try{
    const postsResp = await fetch(API_BASE_URL);
    if(postsResp.status >= 400) {
        return Promise.reject(postsResp.body);
    }
    return postsResp.json();
    } catch(err){
        return Promise.reject(err);
    }
}