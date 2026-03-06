import BooksGrid from "./BooksGrid";

const Bookshelf = ({ title, books }) => {
  // TODO remove this console.log
  console.log(`books in bookshelf ${title}:`, books);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {books.length ? <BooksGrid books={books} /> : <div>No books on this shelf</div>}
      </div>
    </div>
  );
};

export default Bookshelf;
