import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SetDetail = () => {
  const { setId } = useParams(); // ✅ must be declared like this

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://rebrickable.com/api/v3/lego/sets/${setId}/`,
          {
            headers: {
              Authorization: 'key 754a84aeb6e96036af4338c27d319760'
            }
          }
        );
        setData(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!data) return <p>No data found.</p>;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{data.name}</h2>
      <img src={data.set_img_url} alt={data.name} style={{ width: '300px' }} />
      <p><strong>ID:</strong> {data.set_num}</p>
      <p><strong>Year:</strong> {data.year}</p>
      <p><strong>Parts:</strong> {data.num_parts}</p>
      <Link to="/">← Back to search</Link>
    </div>
  );
};

export default SetDetail;

