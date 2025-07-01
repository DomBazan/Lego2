import React, { useState } from 'react';
import './Home.css'; // Make sure your CSS file is connected!
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/?search=${searchTerm}`,
        {
          headers: {
            Authorization: 'key 754a84aeb6e96036af4338c27d319760'
          }
        }
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching LEGO sets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h1>Welcome to the LEGO Explorer App!</h1>
      <div>
        <h2>Unlock the Brickverse – Explore LEGO Sets by Theme, Year, or Part!</h2>
      </div>

      <form onSubmit={handleSearchSubmit} style={{ marginTop: '30px' }}>
        <input
          type="text"
          placeholder="Search LEGO sets..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading LEGO bricks...</p>}

      <div className="card-container">
        {searchResults.length > 0 ? (
          searchResults.map((set) => (
            <Link to={`/sets/${set.set_num}`} className="card" key={set.set_num}>
              {set.set_img_url ? (
                <img src={set.set_img_url} alt={set.name} />
              ) : (
                <p>[ No Image Available ]</p>
              )}
              <h4>{set.name}</h4>
              <p><strong>ID:</strong> {set.set_num}</p>
              <p><strong>Year:</strong> {set.year}</p>
            </Link>
          ))
        ) : (
          !loading && <p>No results yet. Try searching something fun like "Star Wars" or "City"! 🌆🚀</p>
        )}
      </div>
    </div>
  );
};

export default Home;


