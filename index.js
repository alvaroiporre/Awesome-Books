import { Book } from './Book.js';

let id = localStorage.id ? Number(localStorage.id) : 0;

const booksContainer = document.getElementById('books');
const addContainer = document.getElementById('add-book');
const contactContainer = document.getElementById('contact');

const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const btnAdd = document.getElementById('btn-add');

const menuList = document.getElementById('menu-list');
const menuAdd = document.getElementById('menu-add');
const menuContact = document.getElementById('menu-contact');



class Books {
  constructor(booksContainer) {
    this.bookList = localStorage.books ? JSON.parse(localStorage.books) : [];
    this.booksContainer = booksContainer;
  }

  updateBooks = () => {
    this.booksContainer.innerHTML = '';
    for (let i = 0; i < this.bookList.length; i += 1) {
      this.booksContainer.innerHTML += `
        <div class="book book-${i % 2}" id="${this.bookList[i].id}">
            <p class="title">${this.bookList[i].title}</p>
            <p class="title">by</p>
            <p class="author">${this.bookList[i].author}</p>
            <span class="span-remove"><input class="btn-remove" onclick=remove(${this.bookList[i].id}) type="button" value="Remove"></span>
        </div>
        `;
    }
  }

  addBook = (book) => {
    this.bookList.push(book);
    this.saveBooks();
    this.updateBooks();
  }

  saveBooks = () => {
    localStorage.setItem('books', JSON.stringify(this.bookList));
  }

  remove = (ids) => {
    this.bookList = this.bookList.filter((element) => element.id !== ids);
    this.saveBooks();
    this.updateBooks();
  }
}

const books = new Books(booksContainer);

btnAdd.addEventListener('click', () => {
  const newBook = new Book(id, inputTitle.value, inputAuthor.value);
  books.addBook(newBook);

  id += 1;
  localStorage.setItem('id', id);

  inputTitle.value = '';
  inputAuthor.value = '';
});

window.remove = (id) => {
  books.remove(id);
}

const hide = () => {
  if (!booksContainer.classList.contains('hide')) booksContainer.classList.add('hide');
  if (!addContainer.classList.contains('hide')) addContainer.classList.add('hide');
  if (!contactContainer.classList.contains('hide')) contactContainer.classList.add('hide');
}

const showMain = () => {
  hide();
  books.updateBooks();
  booksContainer.classList.remove('hide');
}

menuList.addEventListener('click', () => {
  showMain();
});

menuAdd.addEventListener('click', () => {
  hide();
  addContainer.classList.remove('hide');
});

menuContact.addEventListener('click', () => {
  hide();
  contactContainer.classList.remove('hide');
});

showMain();