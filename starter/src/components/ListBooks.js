import Bookshelf from './Bookshelf';
import { Link } from "react-router-dom";

const ListBooks = ({ title, bookshelves, onMoveBook }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>{title}</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookshelves.map((bookshelf) => (
            <Bookshelf
              key={bookshelf.id}
              title={bookshelf.title}
              books={bookshelf.books}
              onMoveBook={onMoveBook}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" className="add-contact">Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;
