import Bookshelf from "./Bookshelf";

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
    </div>
  );
};

export default ListBooks;
