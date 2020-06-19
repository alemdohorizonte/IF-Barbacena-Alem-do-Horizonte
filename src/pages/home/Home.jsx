import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loading from '../../components/loading/Loading';
import Header from '../../components/header/Header';

import './Home.css';

import api from '../../services/Api';

import capaIfBq from '../../assets/images/capa_fb_ifbq.png';

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    let response = await api.get('/categories');;
    
    setData(response);
    
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }

  if(loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    )
  } else {
    if(data['status'] === 200) {
      let categories = data.data;
      
      categories.map((category)=> {
        category['abbreviation'] = category['category']
          .split(' ')
          .join('');

        return category;
      });

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
                  <li key={category.id}>
                    <Link to={{
                      pathname: `/categoria/${category['abbreviation']}`,
                    }}>
                      <div className="tile-category">
                        <p className="text">{category['category']}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </>
      ); 
    } else {
      return <Loading />
    }
  }
}

export default Home