import React, { useState, useEffect } from 'react';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Loading from '../../components/loading/Loading';
import { Redirect } from 'react-router-dom';

import './Category.css'

function Category(props) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  
  useEffect(() => {
    let storage = JSON.parse(localStorage.getItem('data'));
    let param = decodeURI(window.location.href.substr(window.location.href.lastIndexOf('/')+1));

    if(storage !== null) {
      setCategory(param);
      
      let filteredData = storage.filter(item => item.categoria === param);
      setData({data: filteredData});
  
      setInterval(() => {
        setLoading(false);
      }, 1000)
    } else {
      setData(null);
      setLoading(false);
    }
  }, []);
  
  if(loading) {
    return (
      <Loading />
    );
  } else {
    if(data === null) return (<Redirect to="/home" />)
    
    let items = [...data.data] || [];
    if(items.length === 0) return (<Redirect to="/home" />)
    

    return (
      <>
        <Header />
        <div className="content">
          <h1 className="title">{category}</h1>
          <ul className="list">
            {items.map(item => (
              <li key={item.indice}>
                <p>{item.categoria} - {item['Título do Projeto']}</p>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    );
  }
}

export default Category;