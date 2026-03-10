import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';
import SEARCH_TERMS from '../search-terms';
import * as BooksAPI from '../BooksAPI';

const MAX_BOOK_RESULTS = 20;
const SEARCH_TERMS_LOWER = SEARCH_TERMS.map((term) => term.toLowerCase());

// TODO document this method
const queryMatchesSearchTerms = (query) => {
  if (!query.length) {
    return false;
  }

  return SEARCH_TERMS_LOWER.includes(query.toLowerCase());
};

const SearchBooks = ({ bookshelves, onMoveBook }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // TODO document this method
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value.trim());
  };

  useEffect(() => {
    // TODO document this method
    const search = async () => {
      const response = await BooksAPI.search(searchQuery, MAX_BOOK_RESULTS);
      const populatedResults = populateShelfValues(response, bookshelves);
      setSearchResults(populatedResults);
    };

    // TODO document this method
    const populateShelfValues = (searchResponse, bookshelves) => {
      const allBooksOnShelves = bookshelves.flatMap(
        (bookshelf) => bookshelf.books,
      );
      return searchResponse.map(bookFromResponse => {
        const bookFoundOnShelf = allBooksOnShelves.find(book => book.id === bookFromResponse.id);
        if (bookFoundOnShelf) {
          bookFromResponse.shelf = bookFoundOnShelf.shelf
        } else {
          bookFromResponse.shelf = 'none';
        }

        return bookFromResponse;
      });
    };

    if (!queryMatchesSearchTerms(searchQuery)) {
      // Clear results and return early so we don't make a call to search
      setSearchResults([]);
      return;
    }

    search();
  }, [searchQuery, bookshelves]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <BooksGrid books={searchResults} onMoveBook={onMoveBook} />
      </div>
    </div>
  );
};

export default SearchBooks;