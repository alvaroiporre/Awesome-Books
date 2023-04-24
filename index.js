
let books = localStorage.books? JSON.parse(localStorage.books):[];
let id = localStorage.id? localStorage.id: 0;


const booksContainer = document.getElementById('books');
const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const btnAdd = document.getElementById('btn-add');

function updateBooks() {
    booksContainer.innerHTML = '';
    books.forEach((book) => {
        booksContainer.innerHTML += `
            <div class="book" id="${book.id}">
                <p class="title">${book.title}</p>
                <p class="author">${book.author}</p>
                <input class="btn-remove" onclick=remove(${book.id}) type="button" value="Remove">
            </div>
        `;
    });
}

updateBooks();

btnAdd.addEventListener('click', (event) => {
    event.preventDefault();
    books.push({
        id: id++,
        title: inputTitle.value,
        author: inputAuthor.value
    });
    inputTitle.value = '';
    inputAuthor.value = '';
    localStorage.setItem('books', JSON.stringify(books));
    localStorage.setItem('id', id);
    updateBooks();
});

function remove(id) {
    books = books.filter(element => element.id !== id);
    localStorage.setItem('books', JSON.stringify(books));
    updateBooks();
}
