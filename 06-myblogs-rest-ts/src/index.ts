import { AppStateStore } from './state-store.js';
import { BlogsAPI } from './blogs-api-client.js';
import { Post, PostCreateDto } from './posts.js';
import { IdType } from './shared-types.js';
import { ValidationResult } from './validate.js';


// interface BlogControllerType {
//   postsSection: HTMLElement;
//   erorrsDiv: HTMLElement;
//   addPostForm: HTMLFormElement;
//   resetButton: HTMLButtonElement;
//   init(): Promise<void>;
// }


class BlogsController {
  postsSection = document.getElementById("posts")!;
  erorrsDiv = document.getElementById("errors")!;
  addPostForm = document.getElementById("add-post-form")! as HTMLFormElement;
  resetButton = document.getElementById("form-reset-button")! as HTMLButtonElement;
  submitButton = document.getElementById("form-submit-button")! as HTMLButtonElement;

  async init() {
    this.addPostForm.addEventListener('submit', this.handleSubmitPost.bind(this));
    this.resetButton.addEventListener('click', this.resetForm.bind(this));
    this.addPostForm.addEventListener('change', this.validateForm, true);
    try {
      const allPosts = await BlogsAPI.getAllPosts();
      AppStateStore.allPosts = allPosts;
      this.showPosts(allPosts);
    } catch (err) {
      this.showError(err);
    }
  }

  showPosts(posts: Post[]) {
    posts.forEach(post => this.addPostDOM(post));
  }

  showError(err: any) {
    this.erorrsDiv.innerHTML = `<div>${err}</div>`;
  }

  addPostDOM(post: Post) {
    const postElem = document.createElement('article');
    postElem.setAttribute('id', post.id.toString());
    postElem.className = "col s12 m6 l4";
    this.updateArticleInnerHtml(postElem, post);
    this.postsSection.insertAdjacentElement("beforeend", postElem);
  }
  
  updatePostDOM(post: Post) {
    const postElem = document.getElementById(post.id.toString())!;
    this.updateArticleInnerHtml(postElem, post);
  }


  
  private updateArticleInnerHtml(postElem: HTMLElement, post: Post) {
    postElem.innerHTML = `
      <div class="card">
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
        <button class="btn waves-effect waves-light" type="button" id="edit${post.id}">Edit
          <i class="material-icons right">send</i>
        </button>
        <button class="btn waves-effect waves-light red lighten-1" type="button" id="delete${post.id}">Delete
          <i class="material-icons right">clear</i>
        </button>
      </div>
      </div>
      `;
    postElem.querySelector(`#delete${post.id}`)!.addEventListener('click', event => this.deletePost(post.id))
    postElem.querySelector(`#edit${post.id}`)!.addEventListener('click', event => this.editPost(post))
  }
  
 editPost(post: Post) {
    this.submitButton.innerText = 'Edit';
    this.fillPostForm(post);
    window.scrollTo(0, 0);
    AppStateStore.editedPost = post;
  }
  
 fillPostForm(post: Post) {
    let field: keyof Post;
    for (field in post) {
      (document.getElementById(field) as HTMLFormElement).value = post[field];
      const label = document.querySelector(`#add-post-form label[for=${field}]`);
      if (label) {
        label.className = 'active';
      }
    }
  }
  
  
async handleSubmitPost(event: SubmitEvent) {
    try {
      event.preventDefault();
      const post = this.getPostFromSnapshop();
      // const post = newPost as unknown as Post;
      if (post.id) { //Invoked when we update
        const updated = await BlogsAPI.updatePost(post);
        this.updatePostDOM(updated);
        AppStateStore.editedPost = undefined;
        this.submitButton.innerText = 'Submit';
      } else { //Invoked when we create
        const created = await BlogsAPI.addNewPost(post);
        this.addPostDOM(created);
      }
      this.resetForm();
    } catch (err) {
      this.showError(err);
    }
  }

getPostFromSnapshop() : PostCreateDto {
  const formData = new FormData(this.addPostForm);
  type PostDict = {
    [key: string]: string
  };

  const np: PostDict = {};
      formData.forEach((value, key) => {
        np[key] = value.toString();
      })
      return new Post(np.title, np.content, np.tags.split(/\W+/), np.imageUrl, parseInt(np.authorId) || 1);
}
  
 resetForm() {
    if (AppStateStore.editedPost) {
      this.fillPostForm(AppStateStore.editedPost);
    } else {
      this.addPostForm.reset();
    }
  }
  
  async deletePost(postId: IdType) {
    try {
      await BlogsAPI.deletePostById(postId);
      document.getElementById(postId.toString())?.remove();
    } catch (err) {
      this.showError(err);
    }
  }

  validateForm  = (event: Event)=> {
    const validationResult: ValidationResult<Post> = {};
    validationResult['title'] = [`Title is required`];
    showValidationErrors(validationResult);
  }

  showValidationErrors(validationResult: ValidationResult<Post>){
    let field: keyof ValidationResult<Post>;
    for(field in validationResult) {
      if(validationResult[field] !== undefined){
      for(const err of validationResult[field]!){
      this.showError(`${field} -> ${err}<br>`)
      }
    }
  }
    this.showError();
  }
}

const blogsController = new  BlogsController();
blogsController.init();

/* function displayDataInForm(currentPost: Post) {
  const title = document.getElementById("title")! as HTMLFormElement;
  title.value = currentPost.title;
  const authorId = document.getElementById("authorId")! as HTMLFormElement;
  authorId.value = currentPost.authorId;
  const content = document.getElementById("content")! as HTMLFormElement;
  content.value = currentPost.content;
  const imgUrl = document.getElementById("imageUrl")! as HTMLFormElement;
  imgUrl.value = currentPost.imageUrl;
  const tags = document.getElementById("tags")! as HTMLFormElement;
  tags.value = currentPost.tags;
} */

/* by Vesko
export async function editPost(event: SubmitEvent, postId: IdType) {
  window.scroll(0, 0);
  const currentPost = await BlogsAPI.getPostById(postId);
  displayDataInForm(currentPost);
  console.log(buttons);
  buttons.innerHTML += `
  <button id="temporaryButton" class="btn waves-effect waves-light yellow lighten-1" type="button">Edit
  <i class="material-icons right">send</i>
</button>`;
  document
    .getElementById("temporaryButton")!
    .addEventListener("click", () => editArticle(event, postId));
}

export async function editArticle(event: SubmitEvent, postId: IdType) {
  console.log("Edit button was clicked");
  try {
    const post = getNewPostData(event);
    const currentPost = document.getElementById(postId.toString())!;
    console.log(currentPost);
    console.log(postId);
    currentPost.innerHTML = `<div id="card${post.id}" class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${post.imageUrl}">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${
        post.title
      }<i class="material-icons right">more_vert</i></span>
      <p>Author: ${post.authorId}, Tags: ${
      post.tags ? post.tags.join(", ") : "no tags"
    }</p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${
        post.title
      }<i class="material-icons right">close</i></span>
      <p>${post.content}</p>
    </div>
    <div class="card-action">
      <button class="btn waves-effect waves-light" type="button" id="edit">Edit
        <i class="material-icons right">send</i>
      </button>
      <button class="btn waves-effect waves-light red lighten-1" type="button" id="delete${post.id}">Delete
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
    [key: string]: string;
  };

  const np: PostDict = {};

  formData.forEach((value, key) => {
    np[key] = value.toString();
  });
  // const newPost = np as unknown as Post;
  const newPost = new PostCreateDto(
    np.title,
    np.content,
    np.tags.split(/\W+/),
    np.imageUrl,
    parseInt(np.authorId)
  );
  return newPost as Post;
} */