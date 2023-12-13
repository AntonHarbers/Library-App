// Variable declarations
const formButton = document.querySelector('#formButton');
const toggleFormButton = document.querySelector('#toggleFormButton');
const form = document.querySelector('form');
const bookshelf = document.getElementById('bookshelf');
const bookName = document.querySelector('#name');
const bookNameContainer = document.querySelector('#nameContainer');
const bookAuthor = document.querySelector('#author');
const bookAuthorContainer = document.querySelector('#authorContainer');
const errorMessage = document.querySelector('#errorMessage');
const toggleReadBtn = document.querySelector('.toggleReadBtn');
const eyeIcon = document.querySelector('.eye');
const eyeClosedIcon = document.querySelector('.eyeClosed');

// Initializations
let myLibrary = [];
let formReadStatus = false;
console.log(eyeIcon.classList);
eyeIcon.classList.add('hidden');

// Factory function for creating book objects
function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);

  this.info = () => {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? 'read' : 'not read yet'
    }`;
  };
}

// Event Listeners
toggleReadBtn.addEventListener('click', (e) => {
  e.preventDefault();
  ToggleNewReadStatus();
});

bookName.addEventListener('input', () => {
  validateInput(bookName, bookNameContainer, 'Please enter a book name');
});

bookAuthor.addEventListener('input', () => {
  validateInput(bookAuthor, bookAuthorContainer, 'Please enter an author name');
});

bookshelf.addEventListener('click', (e) => {
  if (e.target.classList.contains('ReadToggleButton')) {
    const bookIndex = e.target.parentElement.parentElement.dataset.index;
    toggleReadStatus(bookIndex);
  }
});

bookshelf.addEventListener('click', (e) => {
  if (e.target.classList.contains('RemoveButton')) {
    const bookIndex = e.target.parentElement.parentElement.dataset.index;
    removeBook(bookIndex);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!form.classList.contains('hidden')) {
      CloseForm();
    }
  }
});

toggleFormButton.addEventListener('click', () => {
  form.classList.toggle('hidden');
});

formButton.addEventListener('click', (e) => {
  e.preventDefault();

  var formData = new FormData(form);
  hideError();

  //   Validate form data
  if (formData.get('name') === '') {
    showError('Please enter a book name');
    bookNameContainer.classList.remove('valid');
    bookNameContainer.classList.add('invalid');
    return;
  }

  if (formData.get('author') === '') {
    showError('Please enter an author name');
    bookAuthorContainer.classList.remove('valid');
    bookAuthorContainer.classList.add('invalid');
    return;
  }

  if (formData.get('pages') === '0') {
    showError('Please enter a valid page number');
    return;
  }

  // Reset input elements to an invalid state
  bookNameContainer.classList.remove('valid');
  bookNameContainer.classList.add('invalid');
  bookAuthorContainer.classList.remove('valid');
  bookAuthorContainer.classList.add('invalid');

  addBookToLibrary(
    formData.get('name'),
    formData.get('author'),
    formData.get('pages'),
    formReadStatus
  );

  CloseForm();
});

// Helper Functions

function paintBookshelf() {
  bookshelf.innerHTML = '';
  for (let i = 0; i < myLibrary.length; i++) {
    let element = document.createElement('div');
    element.dataset.index = i;
    element.classList.add('book');

    let infoElement = document.createElement('div');
    infoElement.textContent = `${myLibrary[i].title} by ${
      myLibrary[i].author
    }, ${myLibrary[i].pages} pages, ${
      myLibrary[i].read ? 'read' : 'not read yet'
    }`;
    element.appendChild(infoElement);

    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');
    element.appendChild(buttonContainer);

    let readToggleButton = document.createElement('button');
    readToggleButton.classList.add('ReadToggleButton');
    let readIcon = document.createElement('i');
    readIcon.classList.add('fa-solid');
    if (myLibrary[i].read) readIcon.classList.add('fa-eye');
    else readIcon.classList.add('fa-eye-slash');

    readToggleButton.appendChild(readIcon);
    buttonContainer.appendChild(readToggleButton);

    let removeButton = document.createElement('button');
    removeButton.classList.add('RemoveButton');
    removeButton.classList.add('fa-solid');
    removeButton.classList.add('fa-trash');

    buttonContainer.appendChild(removeButton);

    bookshelf.appendChild(element);
  }
}

function addBookToLibrary(name, author, pages, read) {
  myLibrary.push(new Book(name, author, pages, read));
  saveLibraryToLocalStorage();
  paintBookshelf();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  saveLibraryToLocalStorage();
  paintBookshelf();
}

function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  saveLibraryToLocalStorage();
  paintBookshelf();
}

function ToggleNewReadStatus() {
  formReadStatus = !formReadStatus;
  if (formReadStatus) {
    eyeIcon.classList.remove('hidden');
    eyeClosedIcon.classList.add('hidden');
  } else {
    eyeIcon.classList.add('hidden');
    eyeClosedIcon.classList.remove('hidden');
  }
}

const showError = (message) => {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
};

const hideError = () => {
  errorMessage.classList.add('hidden');
};

function saveLibraryToLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function loadLibraryFromLocalStorage() {
  const libraryData = localStorage.getItem('myLibrary');
  if (libraryData) {
    myLibrary = JSON.parse(libraryData);
  }
}

const CloseForm = () => {
  eyeIcon.classList.remove('hidden');
  eyeIcon.classList.add('hidden');
  eyeClosedIcon.classList.add('hidden');
  eyeClosedIcon.classList.remove('hidden');
  formReadStatus = false;
  form.reset();
  form.classList.toggle('hidden');
};

// General validation function
function validateInput(inputElement, inputContainerElement, errorMessage) {
  if (inputElement.validity.valid) {
    inputContainerElement.classList.remove('invalid');
    inputContainerElement.classList.add('valid');
    hideError();
  } else {
    inputContainerElement.classList.remove('valid');
    inputContainerElement.classList.add('invalid');
    showError(errorMessage);
  }
}

// Initialize library from local storage
loadLibraryFromLocalStorage();
paintBookshelf();
