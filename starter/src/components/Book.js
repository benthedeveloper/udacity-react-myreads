import BookshelfChanger from "./BookshelfChanger";

const Book = ({ imageUrl, title, authors, shelf }) => {
  return (
    <div className="book">
      <div className="book-top">
        <img
          className="book-cover"
          src={imageUrl}
          alt=""
          style={{ maxHeight: '200px' }}
        />
        <BookshelfChanger />
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {authors.map((author) => (
          <div key={author}>{author}</div>
        ))}
      </div>
    </div>
  );
};

export default Book;
