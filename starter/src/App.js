import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
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
  }, []);

  // TODO document this method
  const updateBookshelves = async (updateResponseObj) => {
    const updatedShelves = [...initialBookshelves];
    const allBooksOnShelves = bookshelves.flatMap(
      (bookshelf) => bookshelf.books,
    );

    for (const shelf of updatedShelves) {
      const bookIdsToAdd = updateResponseObj[shelf.id];
      const updatedBooksOnShelf = [];

      for (const bookIdToAdd of bookIdsToAdd) {
        const foundBookOnShelf = allBooksOnShelves.find(book => book.id === bookIdToAdd);
        if (foundBookOnShelf) {
          // Make sure the shelf is updated for the book
          foundBookOnShelf.shelf = shelf.id;
          updatedBooksOnShelf.push(foundBookOnShelf);
        } else {
          // Get book from API
          const addedBook = await BooksAPI.get(bookIdToAdd);
          addedBook.shelf = shelf.id;
          updatedBooksOnShelf.push(addedBook);
        }
      }

      shelf.books = updatedBooksOnShelf;
    }

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
            <SearchBooks
              bookshelves={bookshelves}
              onMoveBook={updateBookshelves} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
