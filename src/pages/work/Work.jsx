import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Loading from '../../components/loading/Loading';

import './Work.css';

function Work() {
  const [loading, setLoading] = useState(true);
  const [work, setWork] = useState({});
  
  useEffect(() => {
    let index_category = parseInt(window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1));
    let items = JSON.parse(localStorage.getItem('filteredItems'));

    let item = items.filter(work => (work.index_category+1) === index_category)[0];

    setWork(item);
    
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);

  function selectThematicArea(work) {
    switch(work['category']) {
      case "Pesquisa": return work['Áreas Temáticas de Pesquisa'];
      case "Extensão": return work['Áreas temáticas da Extensão'];
      case "PROAQ": return work['Áreas Temáticas PROAQ'];
      default: return "Não informado.";
    }
  }

  if(loading) {
    return (
      <Loading />
    );
  } else {
    if(!work) return (<Redirect to="/404" />);
    if(decodeURI(window.location.pathname.split('/')[2]) !== work['category']) return (<Redirect to="/" />);

    let participants = ['Autores', 'Orientadores', 'Instituição', 'Categoria de Trabalho'];
    let youtube = `https://www.youtube.com/embed/${work['Link do vídeo do youtube'].includes('watch') ? 
      work['Link do vídeo do youtube'].split("watch?v=")[1] : 
      work['Link do vídeo do youtube'].split('/')[3]}`;

    let thematicArea = selectThematicArea(work);

    return(
      <>
        <Header />
        <div className="content">
          <section className="title-work">
            <h1 className="title">{work['index_category']+1} - {work['Título do Projeto']}</h1>
            <h4 className="subtitle">{thematicArea}</h4>
          </section>

          <section className="participants">
            {participants.map(item => (
              <div key={item} className="item">
                <p className="item-value">
                  <em className="item-title">{item}: </em> 
                  {work[item] || 'Nenhum.'}
                </p>
              </div>
            ))}
          </section>

          <section className="video">
            <iframe 
              width="100%" 
              height="315" 
              src={youtube}
              frameBorder="0" 
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              title="video"
              allowFullScreen="allowfullscreen"
              mozallowfullscreen="mozallowfullscreen" 
              msallowfullscreen="msallowfullscreen" 
              oallowfullscreen="oallowfullscreen" 
              webkitallowfullscreen="webkitallowfullscreen"> 
            </iframe>
          </section>

          <section className="summary">
            <h2 className="title">Resumo</h2>
            <a className="btn" href={work['Arquivo do Banner em PDF']} target="_blank" rel="noopener noreferrer">
              Resumo em PDF
            </a>
            <p className="summary-text">
              {work['Resumo'] || 'Nenhum.'}
            </p>
          </section>
      
          <Link to={{ pathname: `${decodeURI(window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/")))}` }} className="btn btn-back">
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Voltar para {decodeURI(window.location.pathname.split('/')[2])}
          </Link>
        </div>
        <Footer />
      </>
    );
  }
}

export default Work;

