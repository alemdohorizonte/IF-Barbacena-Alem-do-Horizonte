import React from 'react';

import Logo from '../../assets/images/logotipo_if.png';
import './Footer.css'

function Footer() {
  return(
    <footer className="footer">
      <h3 className="title-card small">apoio institucional</h3>
      <div className="logo-apoiadores">
        <a target="_blank" rel="noopener noreferrer" href="https://www.ifsudestemg.edu.br/barbacena">
          <img className="logo_apoiador" src={Logo} alt="logo_if_barbacena"/>
        </a>
      </div>
    </footer>
  );
}

export default Footer;