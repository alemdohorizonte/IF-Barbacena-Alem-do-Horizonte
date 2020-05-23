import React from 'react';

import logo from '../../assets/images/logo_mod.png';
import ifbq from '../../assets/images/ifbq_mod.png';

import './Header.css'
import { Link } from 'react-router-dom';

function header() {  
  return (
    <header className="header bg-header">
      <div id="box-logo">
        <Link to="/">
          <img id="logo" alt="Logo IF Barbacena Além do Horizonte" src={logo} />
        </Link>
        <img id="ifbq" alt="Logo IF Barbacena Além do Horizonte" src={ifbq} />
      </div>
    </header>
  );
}

export default header;