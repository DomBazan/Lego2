import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Filter from './Filter'; // Assuming you have a Filter component

const SearchResults = () => {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredSets, setFilteredSets] = useState([]);
  const [searchInput, setSearchInput] = useState(''); // State for search input
  const query = new URLSearchParams(useLocation().search).get('query');

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await axios.get(`https://rebrickable.com/api/v3/lego/sets/?search=${query}&key=754a84aeb6e96036af4338c27d319760`);
        console.log(response.data.results); // Log the fetched data
        setSets(response.data.results);
        setFilteredSets(response.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSets();
  }, [query]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value); // Update search input state
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh
    const filtered = sets.filter(set => 
      set.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(filtered); // Log the filtered results
    setFilteredSets(filtered); // Update filtered sets based on search input
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search LEGO sets..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {filteredSets.length > 0 ? (
          filteredSets.map((set) => (
            <div key={set.id}>
              <h3>{set.name}</h3>
              <p>Set Number: {set.set_num}</p>
              <p>Year: {set.year}</p>
              <p>Pieces: {set.num_parts}</p>
              <img src={set.set_img_url} alt={set.name} style={{ width: '200px' }} />
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;



