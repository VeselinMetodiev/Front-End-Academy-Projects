import {User} from './user.js' // . because it is in the same folder, without folder it will look for the module in node_modules

async function init() {
  try {
    const resultsElem = document.getElementById("results");
    const usersResp = await fetch("users.json");
    const users = await usersResp.json();
    console.log(users);
    const gitUsers = await Promise.all(
      users.map(async (user) => {
        const gitUserResp = await fetch(
          `https://api.github.com/users/${user.username}`
        );
        const gu = await gitUserResp.json();
        return new User(gu.login, gu.avatar_url, gu.public_repos, gu.public_gists, gu.followers, gu.name);
      })
    );
    console.log(gitUsers);
    const elems = gitUsers.map((gitUser) => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
        <figure>
        <img src="${gitUser.pictureUrl}">
        <figcaption>${gitUser.name} - ${gitUser.username}</figcaption>
        </figure>`
      resultsElem.insertAdjacentElement("beforeend", userDiv);
      return userDiv;
    });
    // await new Promise((resolve, reject) => {
    //   setTimeout(resolve, 10000);
    // });
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    console.log("Demo finished");
  }
}

init();
