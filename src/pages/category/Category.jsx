import React, { useState, useEffect } from 'react';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Loading from '../../components/loading/Loading';
import { Redirect, Link } from 'react-router-dom';

import './Category.css'

import file from '../../data/data.json';
import { useFetch, processData } from '../../services/Utils';

function Category() {
  const [filteredData, setFilteredData] = useState({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [data] = useFetch(file);
  
  useEffect(() => {
    let storage = JSON.parse(localStorage.getItem('filteredItems'));
    let param = localStorage.getItem('selectedCategory');
    let categories = JSON.parse(localStorage.getItem('categories'));

    let path = decodeURI(window.location.pathname.split('/')[2]);
    if (!categories.includes(path)) {
      window.location.href = `${window.location.origin}/404`;
    }

    if(storage !== null) {
      setCategory(param);
      
      setFilteredData(storage);
  
      setCategories(categories);

      setInterval(() => {
        setLoading(false);
      }, 1000)
    } else {
      setFilteredData(null);
      setLoading(false);
    }
  }, []);

  async function handleSelectCategory(category) {
    const [items] = processData(data);
    localStorage.setItem('selectedCategory', category);
    await localStorage.setItem('filteredItems', JSON.stringify(items.filter(item => item['category'] === category)));
    window.location.href = `${window.location.origin}/categoria/${category}`;
  }
  
  if(loading) {
    return (
      <Loading />
    );
  } else {
    if(filteredData === null) return (<Redirect to="/" />)
    
    let items = filteredData;
    if(items.length === 0) return (<Redirect to="/" />)
    

    return (
      <>
        <Header />
        <div className="content">
          <div className="title-category">
            <h1 className="title">{category}</h1>
            <Link to="/">Voltar</Link>
          </div>
          <ul className="list">
            {items.map((item, index) => (
              <li key={item.indice}>
                <p>{item.category}({index}) - {item['Título do Projeto']}</p>
              </li>
            ))}
          </ul>

          <div className="list-categories">
            <h1 className="title">Categorias</h1>
            <div className="categories">
              {categories.map(item => (
                <Link key={item} to={{
                  pathname: `/categoria/${item}`,
                }} onClick={(e) => { e.preventDefault(); handleSelectCategory(item); }}>
                  <div className="category">
                    <p className="text">{item}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Category;