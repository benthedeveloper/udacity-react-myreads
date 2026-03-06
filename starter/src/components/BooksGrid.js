import Book from "./Book";

const BooksGrid = ({ books }) => {
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
          <Book
            imageUrl={book.imageLinks.thumbnail}
            title={book.title}
            authors={book.authors}
            shelf={book.shelf} />
        </li>
      ))}
    </ol>
  );
};

export default BooksGrid;
