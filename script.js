const formButton = document.querySelector("#formButton");
const toggleFormButton = document.querySelector("#toggleFormButton");
const form = document.querySelector("form");
const closeFormButton = document.querySelector("#closeFormButton");
const bookshelf = document.getElementById("bookshelf");

let myLibrary = [];

const bookName = document.querySelector("#name");
const bookAuthor = document.querySelector("#author");
const errorMessage = document.querySelector("#errorMessage");

// General validation function
function validateInput(inputElement, errorMessage) {
  if (inputElement.validity.valid) {
    inputElement.classList.remove("invalid");
    inputElement.classList.add("valid");
    hideError();
  } else {
    inputElement.classList.remove("valid");
    inputElement.classList.add("invalid");
    showError(errorMessage);
  }
}

bookName.addEventListener("input", () => {
  validateInput(bookName, "Please enter a book name");
});

bookAuthor.addEventListener("input", () => {
  validateInput(bookAuthor, "Please enter an author name");
});

const showError = (message) => {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
};

const hideError = () => {
  errorMessage.classList.add("hidden");
};

document.addEventListener("scroll", function () {
  const parallax = document.querySelector(".parallax");
  let scrollPosition = window.pageYOffset;
  parallax.style.backgroundPosition = "0" + " " + scrollPosition * 0.5 + "px";
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
  saveLibraryToLocalStorage(); // Save to local storage after adding
  paintBookshelf();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  saveLibraryToLocalStorage(); // Save to local storage after removing
  paintBookshelf();
}

function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  saveLibraryToLocalStorage(); // Save to local storage after toggling
  paintBookshelf();
}

function saveLibraryToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadLibraryFromLocalStorage() {
  const libraryData = localStorage.getItem("myLibrary");
  if (libraryData) {
    myLibrary = JSON.parse(libraryData);
  }
}
function paintBookshelf() {
  bookshelf.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let element = document.createElement("div");
    element.dataset.index = i;
    element.classList.add("book");

    let infoElement = document.createElement("div");
    infoElement.textContent = `${myLibrary[i].title} by ${myLibrary[i].author}, ${myLibrary[i].pages} pages, ${
      myLibrary[i].read ? "read" : "not read yet"
    }`;
    element.appendChild(infoElement);

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");
    element.appendChild(buttonContainer);

    let readToggleButton = document.createElement("button");
    readToggleButton.classList.add("ReadToggleButton");
    readToggleButton.textContent = "Toggle Read";
    buttonContainer.appendChild(readToggleButton);

    let removeButton = document.createElement("button");
    removeButton.classList.add("RemoveButton");
    removeButton.textContent = "X";
    buttonContainer.appendChild(removeButton);

    bookshelf.appendChild(element);
  }
}

// Initialize library from local storage
loadLibraryFromLocalStorage();
paintBookshelf();

// Event listener for read toggle buttons
bookshelf.addEventListener("click", (e) => {
  if (e.target.classList.contains("ReadToggleButton")) {
    const bookIndex = e.target.parentElement.parentElement.dataset.index;
    toggleReadStatus(bookIndex);
  }
});

// Event listener for remove buttons
bookshelf.addEventListener("click", (e) => {
  if (e.target.classList.contains("RemoveButton")) {
    const bookIndex = e.target.parentElement.parentElement.dataset.index;
    removeBook(bookIndex);
  }
});

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

  // Clear previous error messages
  hideError();

  if (formData.get("name") === "") {
    showError("Please enter a book name");
    bookName.classList.remove("valid");
    bookName.classList.add("invalid");
    return;
  }

  if (formData.get("author") === "") {
    showError("Please enter an author name");
    bookAuthor.classList.remove("valid");
    bookAuthor.classList.add("invalid");
    return;
  }

  if (formData.get("pages") === "0") {
    showError("Please enter a valid page number");
    return;
  }

  // Reset input elements to an invalid state
  bookName.classList.remove("valid");
  bookName.classList.add("invalid");
  bookAuthor.classList.remove("valid");
  bookAuthor.classList.add("invalid");

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
});

