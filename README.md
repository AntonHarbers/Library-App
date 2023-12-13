# The Odin Project - Library App 📚

A basic digital library to keep track of your books built with html, css and javascript for the odin project.

[Live Link](https://antonharbers.github.io/odin-library/)

![Screenshot of the Library App](/images/repoImage.png)

## Folder Structure

```
    /.git           -> This git repository
    /images         -> Contains Favicon and repo image
    /styles         -> Contains all the styles in the styles.css file
    index.html      -> Contains all the HTML
    README.md       -> This readme file
    script.js       -> Contains all the funcionality
```

## Key Concepts

### Factory Functions

I made use of the factory function workflow to create book "objects" to contain all the data needed for this app. The factory function can be found in script.js:

JS:

```
    // Factory function for creating book objects
    function Book(title, author, pages, read) {
        (this.title = title),
        (this.author = author),
        (this.pages = pages),
        (this.read = read);

        this.info = () => {
            return      `${this.title} by ${this.author}, ${this.pages} pages, ${
                        this.read ? 'read' : 'not read yet'
                        }`;
        };
    }
```

This factory function takes a title, author, pages and a read status and has a info() method to return all that info in one string. A basic example but very useful to have a data structure that we can save and load to local storage and that we can extend in one place.

### Local Storage

I used local storage in this project to maintain the state of the library across sessions on the same device to add some nice functionality to the application. I acheived this using two main functions, one to set the local storage and one to get the local storage. These functions are then called from seperate places whenever the state of the libarary changes:

JS:

```
    function saveLibraryToLocalStorage() {
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    }

    function loadLibraryFromLocalStorage() {
        const libraryData = localStorage.getItem('myLibrary');
        if (libraryData) {
            myLibrary = JSON.parse(libraryData);
        }
    }
```

In the above save function we take the myLibrary variable, turn it into JSON and set it as the value to the key 'myLibrary' in local storage.

To then get that data back we use the load function which gets the JSON associated with the key 'myLibrary'. If the return is not null it will set the myLibrary variable to the parsed JSON object.

These functions are called in situations shown below:

JS:

```
    function addBookToLibrary(name, author, pages, read) {
        myLibrary.push(new Book(name, author, pages, read));
        saveLibraryToLocalStorage();
        paintBookshelf();
    }

    // Initialize library from local storage
    loadLibraryFromLocalStorage();
```

We load the library from local storage on pageload and then we save it back to local storage when we add a book to the library (amongst other places).

This is very useful for simple applications or for simple device specific settings. However i can see its limitations as it is unable to provide custom users data across devices.

### Toggle elements with a .hidden class

Another usefull concept for this project was to toggle visibility of certain HTML elements by simply toggling a custom ".hidden" css class on the needed objects as shown below:

We setup a .hidden class in CSS with a display property set to none.

CSS:

```
    .hidden {
        display: none;
    }
```

We create HTML elements in our HTML file directly to select in our Javascript:

HTML:

```
    <form id="addBookForm" class="hidden">
        Form Content Here
    </form>
```

We then select and toggle the css class accordingly:

JS:

```
    const form = document.querySelector('form');
    toggleFormButton.addEventListener('click', () => {
        form.classList.toggle('hidden');
    });
```

## Final Notes

This was a fun project to attempt and get through and something that could actually be used by myself or other people. It brought together a lot of important concepts and helped me solidify the interplay between css html and javascript a bit more. I would like to get back onto this project further down the line and add backend support for accounts and multi divice user storage.
