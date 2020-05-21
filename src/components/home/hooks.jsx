import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  async function fetchUrl() {
    await fetch(url)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchUrl();
  }, []);

  return [data, loading];
}

export { useFetch };