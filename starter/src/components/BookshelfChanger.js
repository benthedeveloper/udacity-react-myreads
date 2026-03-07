const BookshelfChanger = ({ curShelf, onShelfChange }) => {
  const onSelectChange = (event) => {
    const newValue = event.target.value;
    onShelfChange(newValue);
  };

  return (
    <div className="book-shelf-changer">
      <select value={curShelf} onChange={onSelectChange}>
        <option value="none" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookshelfChanger;
