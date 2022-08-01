import { getAllPosts } from "./blogs-api-client.js";

//get elements from index.html
const postsSection = document.getElementById("posts");
const errorsDiv = document.getElementById("errors");

//gets and shows posts
async function init(){
    try {
    const allPosts = await getAllPosts();
    showPosts(allPosts);
} catch(err) {
    showError(err);
}
}

//Iterate through the posts
export function showPosts(posts){
posts.forEach(post => addPost(post));
}

//Separate function for showing an error
export function showError(err){
    errorsDiv.innerHTML = `<div>${err}</div>`;
}

//create the html element to add posts to the index.html
export function addPost(post){
    const postElem = document.createElement('article');
    postElem.innerHTML = `
    <h3 class="post-title">${post.title}</h3>
    <img class="post-img" src=${post.imgUrl}>
    <div class="post-content">
        <div class="post-metadata"> Author: ${post.authorId}, Tags: ${post.tags ? post.tags.join(', ') : 'no tags'}</div>
        <div class="post-text"> ${post.content}</div>
    </div>
        `
    postsSection.insertAdjacentElement('beforeend', postElem)
}

init();