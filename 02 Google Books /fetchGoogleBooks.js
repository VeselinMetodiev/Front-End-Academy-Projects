async function fetchBooks(searchWord) {
  try {
    const booksInfo = [];
    // const searchWord = "React Native";
    const fetchFromGoogle = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        searchWord
      )}`
    );
    const googleBooks = await fetchFromGoogle.json();
    for (const book of googleBooks.items) {
      let description = book.volumeInfo.description;
      if (!description) {
        description = "No description.";
      } else if(description) {
        description = description.substring(0, 200);
        const lastSpace = description.lastIndexOf(" ");
        description = description.substring(0, lastSpace);
        description += "...";
      }
      booksInfo.push({
        Title: book.volumeInfo.title,
        Author: book.volumeInfo.authors[0],
        Thumbnail: book.volumeInfo.imageLinks.thumbnail,
        Description: description,
        GoogleLink: book.volumeInfo.previewLink,
      });
    }
    const resultsElem = document.getElementById("results");

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
  <a href="#">Add to Favourites</a>
</div>
</article>`;
      resultsElem.insertAdjacentHTML("beforeend", templateString);
    });
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    console.log("Demo finished");
  }
}

document.getElementById("submit").addEventListener("click", displayBooks);

function displayBooks() {
  console.log("Search was clicked.");
  searchWord = document.getElementsByName("search")[0].value;
  console.log("SearchWord", searchWord);
  if (searchWord === "") {
    document.getElementsById("results").innerText = "Type Something, Buddy!";
  } else {
    fetchBooks(searchWord);
  }
}
