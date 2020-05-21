import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from "../../services/hooks";

import Loading from '../../components/loading/Loading';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

import './Home.css';

import capaIfBq from '../../assets/images/capa_fb_ifbq.png';

function Home() {
  const [data, loading] = useFetch("https://swapi.dev/api/vehicles/");
  
  if(loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    )
  } else {  
    let items = data.results ? [...data.results] : [];

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
                Essa é a Mostra Virtual de projetos do IF Barbacena. Conheça os projetos apresentados nos estandes virtuais.
              </p>
            </div>
          </section>
          <section id="categories">
            <h1 className="title headline1 align-center">Categorias</h1>
            <ul className="box-categories">
              { items.map(item => (
                <li key={item.name}>
                  <Link to="/categorias">
                    <div className="tile-category">
                      <p className="text">{item.name}</p>
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