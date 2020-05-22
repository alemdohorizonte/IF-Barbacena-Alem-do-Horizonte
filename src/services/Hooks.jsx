import { useState, useEffect } from "react";

import file from '../data/data.json';

function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //file.map(item => console.log(item));
  
  async function fetchUrl() {
    await setData(file);
    setLoading(false);
  }
  
  useEffect(() => {
    fetchUrl();
  }, []);

  return [data, loading];
}

export { useFetch };