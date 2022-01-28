import { useState, useEffect } from 'react';

function useFetch(url, options) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    //An async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const jsonData = await response.json();

        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    //Cleanup
  }, []);
  return { data, loading, error };
}

export default useFetch;
