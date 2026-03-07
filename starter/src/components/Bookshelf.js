import BooksGrid from "./BooksGrid";

const Bookshelf = ({ title, books, onMoveBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {books.length ? <BooksGrid books={books} onMoveBook={onMoveBook} /> : <div>No books on this shelf</div>}
      </div>
    </div>
  );
};

export default Bookshelf;
