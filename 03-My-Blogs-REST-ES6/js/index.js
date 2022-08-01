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
    postElem.className = "card col s12 m4";
    // postElem.innerHTML = `
    // <h3 class="post-title">${post.title}</h3>
    // <img class="post-img" src=${post.imgUrl}>
    // <div class="post-content">
    //     <div class="post-metadata"> Author: ${post.authorId}, Tags: ${post.tags ? post.tags.join(', ') : 'no tags'}</div>
    //     <div class="post-text"> ${post.content}</div>
    // </div>
    //     `

        postElem.innerHTML = `
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${post.imgUrl}">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${post.title}<i class="material-icons right">more_vert</i></span>
      <div class="post-metadata"> Author: ${post.authorId}, Tags: ${post.tags ? post.tags.join(', ') : 'no tags'}</div>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${post.title}<i class="material-icons right">close</i></span>
      <p>${post.content}</p>
  </div>`
    postsSection.insertAdjacentElement('beforeend', postElem)
}

init();