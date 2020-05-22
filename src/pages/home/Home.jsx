import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../services/Hooks';

import Loading from '../../components/loading/Loading';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

import './Home.css';

import capaIfBq from '../../assets/images/capa_fb_ifbq.png';

import file from '../../data/data.json';

function Home() {
  const [data, loading] = useFetch(file);

  if(loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    )
  } else {  
    let items = data ? data : [];

    let distinct = (value, index, self) => self.indexOf(value) === index; 

    let categories = data
      .map((item)=>item["Categoria de Trabalho"])
      .map(item=> item.includes('(') ? item.substr(0, item.indexOf('(')).trim() : item)
      
    items.map((item, index) => {
      item['indice'] = index;
      return item['categoria'] = categories[index];
    });  
    
    categories = categories.filter(distinct);

    localStorage.setItem('data', JSON.stringify(items));
    localStorage.setItem('categories', JSON.stringify(categories));
    
    //categories
    return (
      <>
        <Header />
        <div className="content">
          <section>
            <div>
              <img id="capa" src={capaIfBq} alt="Capa IF Barbacena Alem do Horizonte"/>
              
              <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/LBC_IiRzDlE" 
                frameBorder="0" 
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                title="video"
                allowFullScreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen" 
                msallowfullscreen="msallowfullscreen" 
                oallowfullscreen="oallowfullscreen" 
                webkitallowfullscreen="webkitallowfullscreen"> 
              </iframe>
              
              <p className="headline6 align-center">
                Essa é a Mostra Virtual de trabalhos do IF Barbacena. Conheça os trabalhos apresentados nos estandes virtuais.
              </p>
            </div>
          </section>
          <section id="categories">
            <h1 className="title headline1 align-center">Categorias</h1>
            <ul className="box-categories">
              { categories.map(category => (
                <li key={category}>
                  <Link to={{
                    pathname: `/categoria/${category}`,
                    filteredData: {categories: categories, selectedCategory: category, filteredItems: data.filter(item => item['category'] === category)},
                  }}>
                    <div className="tile-category">
                      <p className="text">{category}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <Footer />
      </>
    ); 
  }
}

export default Home