import { addNewPost, getAllPosts, deletePostId, editPostId } from './blogs-api-client.js';
import { chipsInstances } from './materialize-helpers.js';
import { getPosts } from './fetchAllPosts.js';

const postsSection = document.getElementById("posts");
const erorrsDiv = document.getElementById("errors");
const addPostForm = document.getElementById("add-post-form");
addPostForm.addEventListener('submit', handleSubmitPost);
addPostForm.addEventListener('reset', resetForm);
const buttons = document.getElementById("buttons");
async function getPostById(postId){
  const posts = await getPosts();
  const currentPost = posts.find(post => post.id === postId);
  return currentPost;
}

export function showError(err) {
  erorrsDiv.innerHTML = `<div>${err}</div>`;
}

// Gets and display posts when we first load the page
async function init() {
  try {
    const allPosts = await getPosts();
    showPosts(allPosts);
  } catch (err) {
    showError(err);
  }
}

export function showPosts(posts) {
  // posts.sort(function(a, b) { 
  //   return a.id - b.id;
  // });
  posts.forEach(post => addPost(post));
}

//Builds the html tags for an article
export function addPost(post) {
  const postElem = document.createElement('article');
  postElem.setAttribute('id', post.id);
  postElem.className = "col s12 m6 l4";
  postElem.innerHTML = `
    <div id="card${post.id}" class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${post.imgUrl}">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${post.title}<i class="material-icons right">more_vert</i></span>
      <p>Author: ${post.authorId}, Tags: ${post.tags ? post.tags.join(', ') : 'no tags'}</p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${post.title}<i class="material-icons right">close</i></span>
      <p>${post.content}</p>
    </div>
    <div class="card-action">
      <button class="btn waves-effect waves-light" type="button" id="edit">Edit
        <i class="material-icons right">send</i>
      </button>
      <button class="btn waves-effect waves-light red lighten-1" type="button" id="delete">Delete
        <i class="material-icons right">clear</i>
      </button>
    </div>
    </div>
    `;
  postsSection.insertAdjacentElement("beforeend", postElem);
  postElem.querySelector('#delete').addEventListener('click', event => deletePost(post.id))
  postElem.querySelector('#edit').addEventListener('click', event => editPost(event, post.id));
}


export async function deletePost(postId) {
    await deletePostId(postId);
    refreshPosts(postId);
  }
// Remove the article that we have deleted from the web page
  function refreshPosts(postId) {
    document.getElementById(postId).remove();
}

  //After we click EDIT under an article => displays its content on the form
function displayDataInForm(currentPost){
  document.getElementById("title").value = currentPost.title;
  document.getElementById("authorId").value = currentPost.authorId;
  document.getElementById("content").value = currentPost.content;
  document.getElementById("imgUrl").value = currentPost.imgUrl;
  document.getElementById("tags").value = currentPost.tags;
}

  export async function editPost(event, postId) {
    event.preventDefault();
    window.scroll(0,0);
    const currentPost = await getPostById(postId);
    displayDataInForm(currentPost);
    buttons.innerHTML += ('beforeend', `
    <button id="temporaryButton" class="btn waves-effect waves-light yellow lighten-1" type="button">Edit
    <i class="material-icons right">send</i>
</button>`);
    document.getElementById("temporaryButton").addEventListener("click", () => editArticle(postId));
  }

  export async function editArticle(postId) {
    console.log("Edit button was clicked");
    try {
      const post = getNewPostData();
      const currentPost = document.getElementById('card' + postId);
      currentPost.innerHTML = 
      `<div id="card${post.id}" class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${post.imgUrl}">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${post.title}<i class="material-icons right">more_vert</i></span>
        <p>Author: ${post.authorId}, Tags: ${post.tags ? post.tags.join(', ') : 'no tags'}</p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${post.title}<i class="material-icons right">close</i></span>
        <p>${post.content}</p>
      </div>
      <div class="card-action">
        <button class="btn waves-effect waves-light" type="button" id="edit">Edit
          <i class="material-icons right">send</i>
        </button>
        <button class="btn waves-effect waves-light red lighten-1" type="button" id="delete">Delete
          <i class="material-icons right">clear</i>
        </button>
      </div>
      </div>
      `;
      await editPostId(post, postId);
      const temporaryButton = document.getElementById("temporaryButton");
      buttons.removeChild(temporaryButton);
      resetForm();
    } catch (err) {
      showError(err);
    } 
  }
  
function getNewPostData() {
  const formData = new FormData(addPostForm);
  const newPost = {};
  for (const entry of formData.entries()) {
    newPost[entry[0]] = entry[1];
  }
  const tags = chipsInstances[0].chipsData.map(chips => chips.tag);
  newPost['tags'] = tags;
  return newPost;
}

async function handleSubmitPost(event) {
  try {
    event.preventDefault();
    const newPost = getNewPostData();
    const created = await addNewPost(newPost);
    addPost(created);
    resetForm();
  } catch (err) {
    showError(err);
  }
}

export function resetForm() {
  addPostForm.reset();
  const instance = chipsInstances[0];
  while(instance.chipsData.length > 0) {
    instance.deleteChip(0);
  }
}


init()