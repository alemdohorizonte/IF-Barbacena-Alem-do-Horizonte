import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loading from '../../components/loading/loading';
import Header from '../../components/header/header';

import './home.css';

import api from '../../services/api';

import capaIfBq from '../../assets/images/capa_fb_ifbq.png';

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    let response = await api.get('api/modalities');;
    
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
        category['abbreviation'] = category['modality']
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
                <img id="capa" src={capaIfBq} alt="Capa Pesquisa e Extensão - IF Barbacena Alem do Horizonte #EuFicoEmCasa"/>
                <div className="box-video">
                  <iframe 
                    src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fcampusbarbacena%2Fvideos%2F4251033948241782%2F&show_text=0&width=auto" 
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
                </div>
                
                <p className="headline6 align-center">
                  Essa é a exposição de pôsteres dos trabalhos aceitos para apresentação no "Pesquisa e Extensão: IF Barbacena além do Horizonte".
                   <br/>
                  <a  target="_blank" rel="noopener noreferrer" href='https://www.ifsudestemg.edu.br/noticias/barbacena/divulgada-a-programacao-do-pesquisa-e-extensao-if-barbacena-alem-do-horizonte/programacao-de-apresentacao-de-trabalhos.pdf'>
                  Clique aqui para saber mais sobre a programação
                  </a>
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
    } else {
      return <Loading />
    }
  }
}

export default Home