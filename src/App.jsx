import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import SearchResults from './Components/SearchResults';
import SetDetails from './Components/SetDetail';
import LegoColors from './Components/LegoColors';
import './App.css'; 


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/colors" element={<LegoColors />} />
          <Route path="/sets/:setId" element={<SetDetails />} />
        </Routes>
    </div>
  );
}

export default App;



