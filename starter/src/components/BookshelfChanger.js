import PropTypes from 'prop-types';

const BookshelfChanger = ({ curShelf, onShelfChange }) => {
  const onSelectChange = (event) => {
    const newValue = event.target.value;
    onShelfChange(newValue);
  };

  return (
    <div className="book-shelf-changer">
      <select value={curShelf} onChange={onSelectChange}>
        <option value="" disabled>
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

BookshelfChanger.propTypes = {
  curShelf: PropTypes.string.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default BookshelfChanger;
