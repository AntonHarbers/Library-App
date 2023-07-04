const formButton = document.querySelector('#formButton');
const toggleFormButton = document.querySelector('#toggleFormButton');
const form = document.querySelector('form');
const closeFormButton = document.querySelector('#closeFormButton');

let myLibrary = [];

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);

  this.info = () => {
    return `${title} by ${author}, ${pages} pages, ${
      read ? 'read' : 'not read yet'
    }`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function paintBookshelf() {
  document.getElementById('bookshelf').innerHTML = '';
  for (var i = 0; i < myLibrary.length; i++) {
    var element = document.createElement('div');
    element.dataset.index = i;
    element.classList.add('book');
    element.innerHTML = myLibrary[i].info();
    element.innerHTML += `<button class="removeButton">X</button>`;
    document.getElementById('bookshelf').appendChild(element);
  }
}

paintBookshelf();

closeFormButton.addEventListener('click', () => {
    form.classList.toggle('hidden');
    form.reset();
})

formButton.addEventListener('click', (e) => {
  //   form.classList.toggle('hidden');
  e.preventDefault();
  var formData = new FormData(form); // Create a FormData object to store form data

  console.log(formData.get('name'));
  console.log(formData.get('author'));
  console.log(formData.get('pages'));
  console.log(formData.get('read') == null ? false : true);

  if (formData.get('name') === '') {
    alert('Please enter a book name');
    return;
  }

  if (formData.get('author') === '') {
    alert('Please enter an author name');
    return;
  }

  if (formData.get('pages') === '0') {
    alert('Please enter a page number');
    return;
  }

  addBookToLibrary(
    new Book(
      formData.get('name'),
      formData.get('author'),
      formData.get('pages'),
      formData.get('read') == null ? false : true
    )
  );

  form.reset();

  form.classList.toggle('hidden');

  paintBookshelf();
});

toggleFormButton.addEventListener('click', () => {
  form.classList.toggle('hidden');
});
