import "./App.css";
import { useState } from "react";
import ListBooks from "./components/ListBooks";
import SearchBooks from "./components/SearchBooks";

function App() {
  const initialBookshelves = [
    {
      id: 'currentlyReading',
      title: 'Currently reading',
      books: []
    },
    {
      id: 'wantToRead',
      title: 'Want to read',
      books: []
    },
    {
      id: 'read',
      title: 'Read',
      books: []
    }
  ];

  const [bookshelves, setBookshelves] = useState(initialBookshelves);
  // TODO use Router instead
  // const [showSearchPage, setShowSearchpage] = useState(false);

  // TODO get all books from BooksAPI

  return (
    <div className="app">
      {/* TODO show ListBooks or SearchBooks based on route */}
      <ListBooks title="MyReads" bookshelves={bookshelves} />
    </div>
  );
}

export default App;
