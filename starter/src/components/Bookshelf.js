import BooksGrid from './BooksGrid';
import PropTypes from 'prop-types';

const Bookshelf = ({ title, books, onMoveBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {books.length ? (
          <BooksGrid books={books} onMoveBook={onMoveBook} />
        ) : (
          <div>No books on this shelf</div>
        )}
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
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
  onMoveBook: PropTypes.func.isRequired,
};

export default Bookshelf;
