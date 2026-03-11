import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';
import SEARCH_TERMS from '../search-terms';
import * as BooksAPI from '../BooksAPI';

const MAX_BOOK_RESULTS = 20;
const SEARCH_TERMS_LOWER = SEARCH_TERMS.map((term) => term.toLowerCase());

/**
 * Checks if the provided search query matches any of the allowed search terms (case-insensitive)
 * The search query is expected to be a string that the user types into the search input field.
 * The function will return true if the search query matches any of the allowed search terms defined in
 * the SEARCH_TERMS constant, ignoring case. If the search query is empty or does not match any of the
 * allowed search terms, the function will return false.
 * 
 * @param {string} query The search query
 * @returns {boolean} Whether the search query matches any of the allowed search terms (case-insensitive)
 */
const queryMatchesSearchTerms = (query) => {
  if (!query.length) {
    return false;
  }

  return SEARCH_TERMS_LOWER.includes(query.toLowerCase());
};

const SearchBooks = ({ bookshelves, onMoveBook }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  /**
   * Handles changes to the search input field. Sets the search query state to the trimmed value of the
   * input field.
   * 
   * @param {Object} event The change event
   */
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value.trim());
  };

  useEffect(() => {
    /**
     * Performs the search operation and updates the search results
     */
    const search = async () => {
      const response = await BooksAPI.search(searchQuery, MAX_BOOK_RESULTS);
      const populatedResults = populateShelfValues(response, bookshelves);
      setSearchResults(populatedResults);
    };

    /**
     * Populates the shelf values for each book in the search results
     * 
     * @param {Array} searchResponse The array of books from the search response
     * @param {Array} bookshelves The array of bookshelves
     * @returns {Array} The array of books with populated shelf values
     */
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