import React from 'react';

import logo from '../../assets/images/logo.png';
import ifbq from '../../assets/images/ifbq.png';

import './Header.css'

function header() {  
  return (
    <header className="header bg-header">
      <div id="box-logo">
        <img id="logo" alt="Logo IF Barbacena Além do Horizonte" src={logo} />
        <img id="ifbq" alt="Logo IF Barbacena Além do Horizonte" src={ifbq} />
      </div>
    </header>
  );
}

export default header;