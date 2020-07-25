import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Document, Page } from 'react-pdf/dist/umd/entry.webpack';
import Header from '../../components/header/header';
import Loading from '../../components/loading/loading';
import api from '../../services/api';

import './work.css';

function Work() {
  const [loading, setLoading] = useState(true);
  const [work, setWork] = useState({});
  
  useEffect(() => {
    loadProject();
  }, []);

  async function loadProject() {
    let id = parseInt(window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1));

    let response = await api.get(`api/project/${id-1}`);
    let project = response.data;

    setWork(project);

    setInterval(() => {
      setLoading(false);
    }, 1000);
  }

  /*
  function selectThematicArea(work) {
    switch(work['category']) {
      case "Pesquisa": return work['Áreas Temáticas de Pesquisa'];
      case "Extensão": return work['Áreas temáticas da Extensão'];
      case "PROAQ": return work['Áreas Temáticas PROAQ'];
      default: return "Não informado.";
    }
  }
  */

  if(loading) {
    return (
      <Loading />
    );
  } else {
    if(!work) return (<Redirect to="/404" />);
    if(decodeURI(window.location.pathname.split('/')[2]) !== work['modality']['modality'].split(' ').join('')) return (<Redirect to="/404" />);
    //console.log(decodeURI(window.location.pathname.split('/')[2]) + ' - ' + work['category'].split(' ').join(''));

    let data = [
      {id: 0, key: 'Número', value: `#${work['id']+1}`}, 
      {id: 1, key: 'Autores', value: work['authors']},
      {id: 2, key: 'Instituição', value: work['institution']}, 
      {id: 3, key: 'Área temática', value: work['category']},
      {id: 4, key: 'Modalidade', value: work['modality']['modality']}
    ];
    /*
    let youtube = `https://www.youtube.com/embed/${work['Link do vídeo do youtube'].includes('watch') ? 
      work['Link do vídeo do youtube'].split("watch?v=")[1] : 
      work['Link do vídeo do youtube'].split('/')[3]}`;
    */
    //let thematicArea = selectThematicArea(work);

    return(
      <>
        <Header />
        <div className="content">
          <section className="title-work">
            <h1 className="subtitle">{work['title']}</h1>
            {/*}
            <h4 className="subtitle">{work['modality']}</h4>
            {*/}
          </section>

          <section className="participants">
            <ul>
              {data.map(item => (
                <li key={item['id']} className="item">
                  <p className="item-value">
                    <em className="item-title">{item['key']}: </em> 
                    {item['value'] || 'Nenhum.'}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          
          <section className='banner'>
            <Document
              file={`/api/project/${work['id']}/pdf`}
              loading={
                <div className="box-loading">
                  <div className="border"></div>
                </div>
              } 
              error={
                <a href={work['pdf']} target="_blank" rel="noopener noreferrer" >Erro ao carregar o pdf, clique aqui visuzl.</a>
              }
            >
              <Page pageNumber={1} width={window.innerWidth} scale={0.7} loading={
                <div className="box-loading">
                  <div className="border"></div>
                </div>
              } />
            </Document>
          </section>
          {/*}
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
          {*/}

          {/* <section className="summary">
            <h2 className="title">Resumo do trabalho</h2>
            {/* <a className="btn" href={work['pdf']} target="_blank" rel="noopener noreferrer">
              Resumo em PDF <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
            </a> 
            <p className="summary-text">
              {work['summary'] || 'Nenhum.'}
            </p>
          </section> */}
          
          <section className="box-btn-back">
            <Link to={{ pathname: `${decodeURI(window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/")))}` }} className="btn btn-back">
              <i className="fa fa-arrow-left" aria-hidden="true"></i> Voltar
            </Link>
          </section>
        </div>
      </>
    );
  }
}

export default Work;