import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ListBooks from './components/ListBooks';
import SearchBooks from './components/SearchBooks';
import * as BooksAPI from './BooksAPI';

function App() {
  const initialBookshelves = [
    {
      id: 'currentlyReading',
      title: 'Currently reading',
      books: [],
    },
    {
      id: 'wantToRead',
      title: 'Want to read',
      books: [],
    },
    {
      id: 'read',
      title: 'Read',
      books: [],
    },
  ];

  const [bookshelves, setBookshelves] = useState(initialBookshelves);

  useEffect(() => {
    // Gets all books from BooksAPI
    const getAllBooks = async () => {
      const response = await BooksAPI.getAll();
      populateBookshelves(response);
    };

    // Populates the bookshelves with the data from the API
    const populateBookshelves = (booksData) => {
      if (!booksData?.length) {
        console.error('Failed getting books data from BooksAPI.');
        setBookshelves([]);
        return;
      }

      const updatedShelves = bookshelves.map((shelf) => {
        const booksForShelf = booksData.filter(
          (book) => book.shelf === shelf.id,
        );
        return { ...shelf, books: booksForShelf };
      });

      setBookshelves(updatedShelves);
    };

    getAllBooks();
  }, [bookshelves]);

  // TODO document this method
  const updateBookshelves = (updateResponseObj) => {
    const updatedShelves = [...initialBookshelves];
    const allBooksOnShelves = bookshelves.flatMap(
      (bookshelf) => bookshelf.books,
    );

    updatedShelves.forEach((shelf) => {
      const bookIdsToAdd = updateResponseObj[shelf.id];
      const booksOnShelf = [];
      allBooksOnShelves.forEach((book) => {
        if (bookIdsToAdd.includes(book.id)) {
          // Make sure the shelf is updated for the book
          book.shelf = shelf.id;
          booksOnShelf.push(book);
        }
      });
      shelf.books = booksOnShelf;
    });

    setBookshelves(updatedShelves);
  };

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ListBooks
              title="MyReads"
              bookshelves={bookshelves}
              onMoveBook={updateBookshelves}
            />
          }
        />
        {/* TODO props for SearchBooks */}
        <Route
          path="/search"
          element={
            <SearchBooks />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
