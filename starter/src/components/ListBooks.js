import Bookshelf from './Bookshelf';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
        <Link to="/search" className="add-contact">
          Add a book
        </Link>
      </div>
    </div>
  );
};

ListBooks.propTypes = {
  title: PropTypes.string.isRequired,
  bookshelves: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      books: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          imageLinks: PropTypes.shape({
            thumbnail: PropTypes.string,
          }),
          title: PropTypes.string.isRequired,
          authors: PropTypes.arrayOf(PropTypes.string),
          shelf: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

export default ListBooks;
