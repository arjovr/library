const addBtn = document.querySelector('.add-button');
const newBookModal = document.querySelector('#newBoookModal');
const closeBtn = document.querySelector('.close-modal');
const cancelBtn = document.querySelector('button.cancel_btn');
const saveBtn = document.querySelector('button.save_btn');


const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}


saveBtn.addEventListener('click', () => {
    getBookFromPage();
    newBookModal.style.display = 'none';
    displayAll();
});

cancelBtn.addEventListener('click', () => {
    newBookModal.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
    newBookModal.style.display = 'none';
});

addBtn.addEventListener('click', () => {
    newBookModal.style.display = 'block';
    resetForm();
});

window.onclick = function (event) {
    if (event.target == newBookModal) {
        newBookModal.style.display = "none";
    }
}

let myLibrary = [];
let myLibraryById = {};

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = uid();
}

Book.prototype.toggle = function() {
    this.read = !this.read;
}

function resetForm() {
    document.querySelector('#form_title').value = '';
    document.querySelector('#form_author').value = '';
    document.querySelector('#form_pages').value = '';
    document.querySelector('#form_read').checked = false;
}

function saveBook(book) {
    myLibraryById[book.id] = book;
}

function fillPageWithBook(book) {
    const title = document.querySelector('#form_title');
    title.value = book.title;
    title.dataset.id = book.id;

    document.querySelector('#form_author').value = book.author;
    document.querySelector('#form_pages').value = book.pages;
    document.querySelector('#form_read').checked = book.read;

}

function getBookFromPage() {
    const title = document.querySelector('#form_title');
    const book = new Book(
        title.value,
        document.querySelector('#form_author').value,
        document.querySelector('#form_pages').value,
        document.querySelector('#form_read').checked || false,
    );
    book.id = title.dataset.id;

    saveBook(book);
}

myLibrary = [
    new Book('Sobre heroes y tumbas', 'Ernesto Sabato', 500, true),
    new Book('El Aleph', 'Jorge Luis Borges', 300, true),
    new Book('Rayuela', 'Julio Cortazar', 350, false),
];

for (const book of myLibrary) {
    myLibraryById[book.id] = book;
}

function displayAll() {
    const libraryContainer = document.querySelector('.library');
    libraryContainer.innerHTML = '';
    for (const book of Object.values(myLibraryById)) {
        const bookTemplate = `
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="pages">${book.pages}</div>
            <div class="read">
                <span>Read:</span>
                <button data-id="${book.id}" class="read-checkbox">${book.read ? '✓' : '✗'}</span>
            </div>
            <div class="modify-button-container">
                <button class="edit_btn" data-id="${book.id}">✎</button>
                <button class="remove_btn" data-id="${book.id}">🗑</button>
            </div>
        `;
        const bookElem = document.createElement('div');
        bookElem.innerHTML = bookTemplate;
        bookElem.dataset.id = book.id;
        bookElem.classList.add('book');
        libraryContainer.append(bookElem);
    }
    const removeBtns = document.querySelectorAll('.remove_btn');
    removeBtns.forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            delete myLibraryById[id];
            const idx = myLibrary.findIndex(e => {
                return e.id == id;
            });
            myLibrary.splice(idx, 1);
            displayAll();
        });
    });
    
    const editBtns = document.querySelectorAll('.edit_btn');
    editBtns.forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            fillPageWithBook(myLibraryById[id]);
            newBookModal.style.display = 'block';
        });
    });

    const readBtns = document.querySelectorAll('button.read-checkbox');
    readBtns.forEach((btn) => {
        btn.addEventListener('click', ()=> {
            const id = btn.dataset.id;
            const book = myLibraryById[id];
            book.toggle();
            btn.textContent = book.read ? '✓' : '✗'; 
        })
    });
}


displayAll();
