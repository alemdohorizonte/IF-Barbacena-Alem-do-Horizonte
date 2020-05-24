import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { useFetch, processData } from '../../services/Utils';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Loading from '../../components/loading/Loading';

import './Category.css'

import file from '../../data/data.json';

function Category() {
  const [filteredData, setFilteredData] = useState({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [data] = useFetch(file);
  const [search, setSearch] = useState('');
  
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

  useEffect(() => {
    if(search.length > 0) {
      setFilteredData(JSON.parse(localStorage.getItem('filteredItems'))
        .filter(item => item['Título do Projeto'].toLowerCase().includes(search.toLowerCase())));
    } else {
      setFilteredData(JSON.parse(localStorage.getItem('filteredItems')));
    }
  }, [search]);

  async function handleSelectCategory(category) {
    const [items] = processData(data);

    localStorage.setItem('selectedCategory', category);

    let filteredItems = items
      .filter(item => item['category'] === category)
      .map((item, index) => {item['index_category'] = index; return item })
    await localStorage.setItem('filteredItems', JSON.stringify(filteredItems));
    window.location.href = `${window.location.origin}/categoria/${category}`;
  }

  function handleSearch(e) {
    let max_char = 200;
    if(e.target.value.length > max_char) 
      e.target.value = e.target.value.substr(0, max_char);

    setSearch(e.target.value);
  }

  
  if(loading) {
    return (
      <Loading />
      );
    } else {
    
    if(filteredData === null) return (<Redirect to="/" />)
    
    let list;

    if(filteredData.length > 0) {
      list = (<ul className="list">
        {filteredData.map((item, index) => (
          <li key={item.indice}>
            <p>{item.category}({item.index_category+1}) - {item['Título do Projeto']}</p>
          </li>
        ))}
      </ul>);
    } else {
      list = (<ul className="list">
        <li>
          <p>Não há resultados com "{search}"</p>
        </li>
      </ul>)
    }
    
    return (
      <>
        <Header />

        {/*
          Título da categoria e botão Home
        */}
        <div className="content">
          <section className="title-category">
            <h1 className="title">{category}</h1>
            <Link to="/">Início <i className="fa fa-home" aria-hidden="true"></i></Link>
          </section>

          {/* Barra de busca por título do trabalho */}
          <section className="box-search">
            <input 
              type="search" 
              className="search-bar" 
              placeholder="Título do trabalho" 
              name="search-bar" 
              id="search" 
              onChange={handleSearch} 
              autoComplete="off"
            />
          </section>

          {/* lista de trabalhos de uma categoria */}
          {/*
          <ul className="list">
            {filteredData.map((item, index) => (
              <li key={item.indice}>
                <p>{item.category}({item.index_category+1}) - {item['Título do Projeto']}</p>
              </li>
            ))}
          </ul>
            */}
          {list}

          {/* Listagem de categorias */}
          <section className="list-categories">
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
          </section>
        </div>
        <Footer />
      </>
    );
  }
}

export default Category;