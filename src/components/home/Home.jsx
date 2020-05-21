import React from 'react';

import { useFetch } from "./hooks";

import Loading from './Loading';
import './Home.css'

function Home() {  
  const [data, loading] = useFetch(
    "https://swapi.dev/api/starships/"
  );
  
  
  if(loading) {
    return (
      <Loading />
    )
  } else {  
    let items = data.results ? [...data.results] : [];
  
    return (
      <>
        <div className="content">
          <section>
            <div> 
              <h1 className="title headline1 align-center">Mostra Virtual de Projetos</h1>
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
                Essa é a Mostra Virtual de porjeto do IF Barbacena. Conheça os projetos apresentados nos estandes virtuais.
              </p>
            </div>
          </section>
          <section id="categories">
            <h1 className="title headline1 align-center">Categorias</h1>
            <ul class="box-categories">
              { items.map(item => (
                <a href="#" key={item.name}>
                  <li class="tile-category">
                    <p className="text">{item.name}</p>
                  </li>
                </a>
              ))}
            </ul>
          </section>
        </div>
      </>
    ); 
  }
}

export default Home;