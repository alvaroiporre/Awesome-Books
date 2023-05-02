export default
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
