const Bookshelf = ({ title, books }) => {
  // TODO remove this console.log
  console.log(`books in bookshelf ${title}:`, books);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <div>TODO render BooksGrid</div>
      </div>
    </div>
  );
};

export default Bookshelf;
