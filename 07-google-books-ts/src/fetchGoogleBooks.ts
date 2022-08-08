function init(){
  document.getElementById("submit")?.addEventListener("click", displayBooks);
  displayBooks();
}

async function fetchBooks(searchWord: string) {
  try {
    const resultsElem = document.getElementById("results") as HTMLElement;

    //delete the books from previous search
    if (resultsElem !== null) {
      while (resultsElem.firstChild) {
        resultsElem.removeChild(resultsElem.firstChild);
      }
    }
    const booksInfo = [];
    // const searchWord = "React Native";
    const fetchFromGoogle = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        searchWord
      )}`
    );
    console.log(fetchFromGoogle);
    if (!fetchFromGoogle) {
      resultsElem.insertAdjacentHTML(
        "beforeend",
        `<p> No data for <strong>${searchWord}</strong></p>`
      );
      return;
    }
    const googleBooks = await fetchFromGoogle.json();
    if (!googleBooks.items) {
      resultsElem.insertAdjacentHTML(
        "beforeend",
        `<p> No data for ${searchWord}</p>`
      );
      return;
    }
    for (const book of googleBooks.items) {
      let description = book.volumeInfo.description;
      const author = book.volumeInfo.authors
        ? book.volumeInfo.authors
        : "Not Specified";
      const thumbnail = book.volumeInfo.imageLinks.thumbnail
        ? book.volumeInfo.imageLinks.thumbnail
        : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
      if (!description) {
        description = "No description.";
      } else if (description) {
        description = description.substring(0, 200);
        const lastSpace = description.lastIndexOf(" ");
        description = description.substring(0, lastSpace);
        description += "...";
      }
      booksInfo.push({
        Title: book.volumeInfo.title,
        Author: author,
        Thumbnail: thumbnail,
        Description: description,
        GoogleLink: book.volumeInfo.previewLink,
      });
    }

    booksInfo.forEach((book) => {
      const templateString = `<article>
<h1>${book.Title}</h1>
<img class="article-image" src="${book.Thumbnail}" />
<div class="blog-text">
  <h2>${book.Author}</h2>
  <summary>
  ${book.Description}<a
      href="${book.GoogleLink}"
      >Open in Google</a
    >
  </summary>
  <button id="button${book.Title}" href="#">Add to Favourites</button>
</div>
</article>`;
      resultsElem.insertAdjacentHTML("beforeend", templateString);
      resultsElem
      .querySelector(`#button${book.Title}`)!
      .addEventListener("click", (event) => addToFavourites(book));
    });
    
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    console.log("Demo finished");
    const footer = document.getElementsByTagName("footer")[0];
    footer.style.position = "relative";
  }
}



function displayBooks() {
  console.log("Search was clicked.");
  const searchWord = (document.getElementById("search")! as HTMLInputElement).value;
  console.log("SearchWord", searchWord);
  if (searchWord === "") {
    const results = document.getElementById("results");
    if(results !== null){
    results.innerText = "Type Something, Buddy!";
    }
  } else {
    fetchBooks(searchWord);
  }
}

init();

function addToFavourites(book: { Title: any; Author: any; Thumbnail: any; Description: any; GoogleLink: any; }): void {
  throw new Error("Function not implemented.");
}
