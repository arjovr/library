let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    
}

myLibrary = [
    new Book('Sobre heroes y tumbas', 'Ernesto Sabato', 500, true),
    new Book('El Aleph', 'Jorge Luis Borges', 300, true),
    new Book('Rayuela', 'Julio Cortazar', 350, false),
];

function displayAll() {
    const libraryContainer = document.querySelector('.library');
    for (const book of myLibrary) {
        const bookTemplate = `
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="pages">${book.pages}</div>
            <input class="read" type="checkbox" ${book.read ? 'checked' : ''}>
        `;
        const bookElem = document.createElement('div');
        bookElem.innerHTML = bookTemplate;
        bookElem.classList.add('book');
        libraryContainer.append(bookElem);
    }
}

displayAll();