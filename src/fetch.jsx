import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return; // avoid fetching empty url

    let isMounted = true; // prevent setting state after unmount

    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const weatherData = await res.json();

       

        if (isMounted) {
          setData(weatherData); // return in array format
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]); // ✅ refetch if URL changes

  return { data, error, loading };
};

export default useFetch;
