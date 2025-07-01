import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LegoColors = () => {
  const [colors, setColors] = useState([]); // State to hold the colors
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to hold any errors

  useEffect(() => {
    const fetchColors = async () => {
      try {
        // Make the API call to get LEGO colors
        const response = await axios.get(`https://rebrickable.com/api/v3/lego/colors/?key=754a84aeb6e96036af4338c27d319760`);
        setColors(response.data.results); // Set the colors in state
      } catch (err) {
        setError(err.message); // Set any error messages
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchColors(); // Call the function to fetch colors
  }, []); // Empty array means this runs once when the component mounts

  // Show loading message while fetching data
  if (loading) return <div>Loading...</div>;
  // Show error message if there's an error
  if (error) return <div>Error: {error}</div>;

  // Render the list of colors
  return (
    <div>
      <h2>LEGO Colors</h2>
      <ul>
        {colors.map(color => (
          <li key={color.id}>{color.name}</li> // Display each color name
        ))}
      </ul>
    </div>
  );
};

export default LegoColors;
