import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

import Header from '../../components/header/Header';
import Loading from '../../components/loading/Loading';

import './Category.css'
import api from '../../services/Api';


function Category() {
  const [filteredData, setFilteredData] = useState({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    loadProjects();
  }, []);
  
  useEffect(() => {
    if(search.length > 0) {
      setFilteredData(
        JSON.parse(localStorage.getItem('filteredItems'))
          .filter(item =>`${item['category'].toLowerCase()} ${item['title'].toLowerCase()}`.includes(search.toLowerCase()))
      );
    } else {
      setFilteredData(JSON.parse(localStorage.getItem('filteredItems')));
    }
  }, [search]);
  

  /* Get projects from api */
  async function loadProjects() {
    let response = await api.get('/modalities');
    
    let processedCategories = response.data.map((category)=> {
      category['abbreviation'] = category['modality']
        .split(' ')
        .join('');

      return category;
    });
    
    setCategories(processedCategories);

    let path = decodeURI(window.location.pathname.split('/')[2]);
    let foundCategory = processedCategories.filter((category) => {
      return category['abbreviation'] === path;
    });

    if (foundCategory.length === 0) window.location.href = `${window.location.origin}/404`;    
    setCategory(foundCategory[0]);

    response = await api.get(`/projects/modality/${foundCategory[0]['id']}`);

    setFilteredData(response.data);
    localStorage.setItem('filteredItems', JSON.stringify(response.data));
    
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }
  
  async function handleSelectCategory(category) {
    window.location.href = `${window.location.origin}/categoria/${category['abbreviation']}`;
  }

  function handleSearch(e) {
    let max_char = 200;
    if(e.target.value.length > max_char) 
      e.target.value = e.target.value.substr(0, max_char);
    
    setSearch(e.target.value);
  }

  function foundWorks(numberWorks) {
    return (numberWorks === 1) ? 'trabalho encontrado.' : 'trabalhos encontrados.';
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
        {filteredData.map((item) => (
          <Link key={item['id']} className="bounceIn" to={{ pathname: `/categoria/${category['abbreviation']}/${item['id']+1}` }}>
            <li>
              <p>{item['title']}</p>
            </li>
          </Link>
        ))}
      </ul>);
    } else {
      list = (<ul className="list">
        <li className="not-found">
          <p>Não há resultados com "{search}".</p>
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
            <h1 className="title">{category['modality']}</h1>
            <Link to={{ pathname: "/" }} className="btn-home">Início <i className="fa fa-home" aria-hidden="true"></i></Link>
          </section>
          <p>{filteredData.length} {foundWorks(filteredData.length)}</p>
          {/* Barra de busca por título do trabalho */}
          <section className="box-search">
            <input 
              type="search" 
              className="search-bar" 
              placeholder="Digite o Título do trabalho ou Área temática"
              name="search-bar" 
              id="search"
              onChange={handleSearch} 
              autoComplete="off"
            />
          </section>

          {/* lista de trabalhos de uma categoria */}
          {list}

          {/* Listagem de categorias */}
          <section id="categories">
            <h1 className="title headline1 align-center">Categorias</h1>
            <ul className="box-categories">
              { categories.map(category => (
                <li key={category['id']}>
                  <Link to={{
                    pathname: `/categoria/${category['abbreviation']}`,
                  }} onClick={(e) => { e.preventDefault(); handleSelectCategory(category); }}>
                    <div className="tile-category">
                      <p className="text">{category['modality']}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </>
    );
  }
}

export default Category;