import Book from './Book';
import PropTypes from 'prop-types';

const placeholderBookSize = '128x195';
const placeholderBookText = 'No cover image';

const BooksGrid = ({ books, onMoveBook }) => {
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
          <Book
            bookId={book.id}
            imageUrl={
              book.imageLinks?.thumbnail ||
              `https://placehold.co/${placeholderBookSize}?text=${placeholderBookText}`
            }
            title={book.title}
            authors={book.authors}
            shelf={book.shelf}
            onMoveBook={onMoveBook}
          />
        </li>
      ))}
    </ol>
  );
};

BooksGrid.propTypes = {
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

export default BooksGrid;
