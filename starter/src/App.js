import './App.css';
import { useState, useEffect } from 'react';
import ListBooks from './components/ListBooks';
import SearchBooks from './components/SearchBooks';
import * as BooksAPI from './BooksAPI';

function App() {
  const [bookshelves, setBookshelves] = useState([]);
  // TODO use Router instead
  // const [showSearchPage, setShowSearchpage] = useState(false);

  useEffect(() => {
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

    // Gets all books from BooksAPI
    const getAllBooks = async () => {
      const response = await BooksAPI.getAll();
      populateBookshelves(response);
    };

    // Populates the bookshelves with the data from the API
    const populateBookshelves = (booksData) => {
      if (!booksData?.length) {
        console.error('Failed getting books data from BooksAPI.');
        setBookshelves(initialBookshelves);
        return;
      }

      const updatedShelves = initialBookshelves.map((shelf) => {
        const booksForShelf = booksData.filter(
          (book) => book.shelf === shelf.id,
        );
        return { ...shelf, books: booksForShelf };
      });

      setBookshelves(updatedShelves);
    };

    getAllBooks();
  }, []);

  return (
    <div className="app">
      {/* TODO show ListBooks or SearchBooks based on route */}
      <ListBooks title="MyReads" bookshelves={bookshelves} />
    </div>
  );
}

export default App;
