import { BlogsAPI } from './blogs-api-client.js';
import { Post, PostCreateDto } from './posts.js';
import { IdType } from './shared-types.js';

const postsSection = document.getElementById("posts")!;
const erorrsDiv = document.getElementById("errors")!;
const addPostForm = document.getElementById("add-post-form")! as HTMLFormElement;
addPostForm.addEventListener('submit', handleSubmitPost);
addPostForm.addEventListener('reset', resetForm);
const buttons = document.getElementById("buttons")!;

async function init() {
  try {
    const allPosts = await BlogsAPI.getAllPosts();
    showPosts(allPosts);
  } catch (err) {
    showError(err);
  }
}

export function showPosts(posts: Post[]) {
  posts.forEach(post => addPost(post));
}

export function showError(err: any) {
  erorrsDiv.innerHTML = `<div>${err}</div>`;
}

export function addPost(post: Post) {
  const postElem = document.createElement('article');
  postElem.setAttribute('id', post.id.toString());
  postElem.className = "col s12 m6 l4";
  postElem.innerHTML = `
  <div id="card${post.id}" class="card">
  <div class="card-image waves-effect waves-block waves-light">
    <img class="activator" src="${post.imageUrl}">
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
  postElem.querySelector('#delete')!.addEventListener('click', event => deletePost(post.id))
  postElem.querySelector('#edit')!.addEventListener('click', event => editPost(event as SubmitEvent, post.id))

}

function displayDataInForm(currentPost : Post){
  const title = document.getElementById("title")! as HTMLFormElement; 
  title.value = currentPost.title;
  const authorId = document.getElementById("authorId")! as HTMLFormElement;
  authorId.value = currentPost.authorId;
  const content = document.getElementById("content")! as HTMLFormElement;
  content.value = currentPost.content;
  const imgUrl = document.getElementById("imageUrl")! as HTMLFormElement;
  imgUrl.value = currentPost.imageUrl;
  const tags =document.getElementById("tags")! as HTMLFormElement;
  tags.value = currentPost.tags;
}

export async function editPost(event : SubmitEvent, postId: IdType) {
  window.scroll(0,0);
  const currentPost = await BlogsAPI.getPostById(postId);
  displayDataInForm(currentPost);
  console.log(buttons);
  buttons.innerHTML += (`
  <button id="temporaryButton" class="btn waves-effect waves-light yellow lighten-1" type="button">Edit
  <i class="material-icons right">send</i>
</button>`);
  document.getElementById("temporaryButton")!.addEventListener("click", () => editArticle(event, postId));
}

export async function editArticle(event: SubmitEvent, postId : IdType) {
  console.log("Edit button was clicked");
  try {
    const post = getNewPostData(event);
    const currentPost = document.getElementById(postId.toString())!;
    console.log(currentPost);
    console.log(postId);
    currentPost.innerHTML = 
    `<div id="card${post.id}" class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${post.imageUrl}">
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
    await BlogsAPI.updatePost(postId, post);
    const temporaryButton = document.getElementById("temporaryButton")!;
    buttons.removeChild(temporaryButton);
    resetForm();
  } catch (err) {
    showError(err);
  } 
}

function getNewPostData(event: SubmitEvent) {
  event.preventDefault();
  const formData = new FormData(addPostForm);
  type PostDict = {
    [key: string]: string
  };

  const np: PostDict = {};

  formData.forEach((value, key) => {
  np[key] = value.toString()
})
// const newPost = np as unknown as Post;
const newPost = new PostCreateDto(np.title, np.content, np.tags.split(/\W+/), np.imageUrl, parseInt(np.authorId));
return newPost as Post;
}


async function handleSubmitPost(event: SubmitEvent) {
  try {
    event.preventDefault();
    const formData = new FormData(addPostForm);
    type PostDict = {
      [key: string]: string
    };

    const np: PostDict = {};

    formData.forEach((value, key) => {
    np[key] = value.toString()
  })
  // const newPost = np as unknown as Post;
  const newPost = new PostCreateDto(np.title, np.content, np.tags.split(/\W+/), np.imageUrl, parseInt(np.authorId));
    const created = await BlogsAPI.addNewPost(newPost as unknown as Post);
    addPost(created);
    resetForm();
  } catch (err) {
    showError(err);
  }
}

export function resetForm() {
  addPostForm.reset();
  }

export function deletePost(postId: IdType) {
  BlogsAPI.deletePostById(postId);
  document.getElementById(postId.toString())!.remove();
}


init()
