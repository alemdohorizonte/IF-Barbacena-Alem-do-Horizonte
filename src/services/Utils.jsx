import { useState, useEffect } from "react";

import file from '../data/data.json';

function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //file.map(item => console.log(item));
  
  async function fetchUrl() {
    await setData(file);
    
    setInterval(() => {
      setLoading(false);
    }, 1000)
  }
  
  useEffect(() => {
    fetchUrl();
  }, []);

  return [data, loading];
}

function processData(items) {
  let distinct = (value, index, self) => self.indexOf(value) === index; 

  let categories = items
    .map((item)=>item["Categoria de Trabalho"])
    .map(item=> item.includes('(') ? item.substr(0, item.indexOf('(')).trim() : item)
    
  items.map((item, index) => {
    item['indice'] = index;
    return item['category'] = categories[index];
  });

  categories = categories.filter(distinct);

  return [items, categories];
}

export { useFetch, processData };