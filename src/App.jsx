import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import SearchResults from './Components/SearchResults';
import SetDetails from './Components/SetDetails';
import LegoColors from './Components/LegoColors';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/set/:setId" element={<SetDetails />} /> {/* Route for set details */}
        <Route path="/colors" element={<LegoColors />} /> {/* Route for LEGO colors */}
      </Routes>
    </div>
  );
}

export default App;



