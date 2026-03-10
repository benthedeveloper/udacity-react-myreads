import * as BooksAPI from '../BooksAPI';
import BookshelfChanger from './BookshelfChanger';

const Book = ({ bookId, imageUrl, title, authors, shelf, onMoveBook }) => {
  // TODO document this method
  const updateShelf = (newShelf) => {
    const updateBook = async (id, newShelf) => {
      const updatedBookObj = { id };
      const response = await BooksAPI.update(updatedBookObj, newShelf);
      onMoveBook(response);
    };

    updateBook(bookId, newShelf);
  };

  return (
    <div className="book">
      <div className="book-top">
        <img
          className="book-cover"
          src={imageUrl}
          alt=""
          style={{ maxHeight: '200px' }}
        />
        <BookshelfChanger curShelf={shelf} onShelfChange={updateShelf} />
      </div>
      <div className="book-title">{title}</div>
      {authors && (
        <div className="book-authors">
          {authors.map((author) => (
            <div key={author}>{author}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Book;
