import { Book } from './Book.js';
import { Books } from './Books.js';

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