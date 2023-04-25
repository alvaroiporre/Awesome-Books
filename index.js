let id = localStorage.id ? Number(localStorage.id) : 0;

const booksContainer = document.getElementById('books');
const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const btnAdd = document.getElementById('btn-add');

class Books {
    constructor() {
        this.bookList = localStorage.books? JSON.parse(localStorage.books).bookList : [];
    }

    updateBooks() {
        booksContainer.innerHTML = '';
        this.bookList.forEach((item) => {
          booksContainer.innerHTML += `
                  <div class="book" id="${item.id}">
                      <p class="title">${item.title}</p>
                      <p class="author">${item.author}</p>
                      <input class="btn-remove" onclick=books.remove(${item.id}) type="button" value="Remove">
                      <hr>
                  </div>
              `;
        });
    }

    addBook(book) {
        this.bookList.push(book);
        this.saveBooks();
        this.updateBooks();
    }

    saveBooks() {
        localStorage.setItem('books', JSON.stringify(books));
    }

    remove(ids) {
        console.log('remove', ids);
        this.bookList = this.bookList.filter((element) => element.id !== ids);
        console.log('list', this.bookList);
        this.saveBooks();
        this.updateBooks();
    }
}

class Book {
    constructor(ids, title, author) {
        this.id = ids;
        this.title = title;
        this.author = author;
    }
}

let books = new Books();
books.updateBooks();

btnAdd.addEventListener('click', (event) => {
    let newBook = new Book(id, inputTitle.value, inputAuthor.value)
    books.addBook(newBook);    
    
    id += 1;
    localStorage.setItem('id', id);

    inputTitle.value = '';
    inputAuthor.value = '';
  
});



