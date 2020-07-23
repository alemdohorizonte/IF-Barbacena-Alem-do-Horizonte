import React from 'react';

import './loading.css'

import logo from '../../assets/images/ifbq_mod.png'

function Loading() {
  return(
    <div className="box-loading">
      <div className="border"></div>
      <img className="logo" src={logo} alt="Logo IF BQ"/>
		</div>
  );
}

export default Loading;