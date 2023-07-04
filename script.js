const formButton = document.querySelector("#formButton");
const toggleFormButton = document.querySelector("#toggleFormButton");
const form = document.querySelector("form");
const closeFormButton = document.querySelector("#closeFormButton");
const bookshelf = document.getElementById("bookshelf");

let myLibrary = [];

document.addEventListener('scroll', function() {
  const parallax = document.querySelector('.parallax');
  let scrollPosition = window.pageYOffset;
  parallax.style.backgroundPosition = '0' + ' ' + (scrollPosition * 0.5) + 'px';
});

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);

  this.info = () => {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function paintBookshelf() {
  bookshelf.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) { 
    let element = document.createElement("div");
    element.dataset.index = i;
    element.classList.add("book");

    let infoElement = document.createElement("div");
    infoElement.textContent = myLibrary[i].info();
    element.appendChild(infoElement);

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");
    element.appendChild(buttonContainer);

    let readToggleButton = document.createElement("button");
    readToggleButton.classList.add("ReadToggleButton");
    readToggleButton.textContent = "Toggle Read";
    readToggleButton.addEventListener("click", (e) => {
      // Toggle the read status
      myLibrary[i].read = !myLibrary[i].read;

      // Update the text content with the new info
      infoElement.textContent = myLibrary[i].info();
    });
    buttonContainer.appendChild(readToggleButton);

    let removeButton = document.createElement("button");
    removeButton.classList.add("RemoveButton");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", (e) => {
      myLibrary.splice(i, 1);
      paintBookshelf();
    });
    buttonContainer.appendChild(removeButton);
    
    bookshelf.appendChild(element);
  }
}

paintBookshelf();

closeFormButton.addEventListener("click", () => {
  form.classList.toggle("hidden");
  form.reset();
});

toggleFormButton.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

formButton.addEventListener("click", (e) => {
  e.preventDefault();
  var formData = new FormData(form); 

  console.log(formData.get("name"));
  console.log(formData.get("author"));
  console.log(formData.get("pages"));
  console.log(formData.get("read") == null ? false : true);

  if (formData.get("name") === "") {
    alert("Please enter a book name");
    return;
  }

  if (formData.get("author") === "") {
    alert("Please enter an author name");
    return;
  }

  if (formData.get("pages") === "0") {
    alert("Please enter a page number");
    return;
  }

  addBookToLibrary(
    new Book(
      formData.get("name"),
      formData.get("author"),
      formData.get("pages"),
      formData.get("read") == null ? false : true
    )
  );

  form.reset();

  form.classList.toggle("hidden");

  paintBookshelf();
});


