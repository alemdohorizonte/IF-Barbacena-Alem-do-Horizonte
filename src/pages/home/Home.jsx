import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch, processData } from '../../services/Utils';

import Loading from '../../components/loading/Loading';
import Header from '../../components/header/Header';

import './Home.css';

import capaIfBq from '../../assets/images/capa_fb_ifbq.png';

import file from '../../data/data.json';

function Home() {
  const [data, loading] = useFetch(file);
  const [items, categories] = processData(data);

  async function handleSelectCategory(category) {
    let filteredItems = items
      .filter(item => item['category'] === category)
      .map((item, index) => {item['index_category'] = index; return item })
    await localStorage.setItem('filteredItems', JSON.stringify(filteredItems));
    localStorage.setItem('selectedCategory', category);
    window.location.href += `categoria/${category}`;
  }
  
  if(loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    )
  } else {  

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
                src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fcampusbarbacena%2Fvideos%2F4251033948241782%2F&show_text=0" 
                width="100%"
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
                  }} onClick={(e) => { e.preventDefault(); handleSelectCategory(category); }}>
                    <div className="tile-category">
                      <p className="text">{category}</p>
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

export default Home