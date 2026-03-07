import Book from "./Book";

const BooksGrid = ({ books, onMoveBook }) => {
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
          <Book
            bookId={book.id}
            imageUrl={book.imageLinks.thumbnail}
            title={book.title}
            authors={book.authors}
            shelf={book.shelf}
            onMoveBook={onMoveBook} />
        </li>
      ))}
    </ol>
  );
};

export default BooksGrid;
