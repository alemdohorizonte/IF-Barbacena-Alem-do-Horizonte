import React from 'react';

import './Footer.css'

import Logo from '../../assets/images/logo_if.png';

function Footer() {
  

  return(
    <footer className="footer">
      <h3 className="title title-card small">apoio institucional</h3>
      <div className="logo-apoiadores">
        <a target="_blank" rel="noopener noreferrer" href="https://www.ifsudestemg.edu.br/barbacena">
          <img className="logo_apoiador" src={Logo} alt="logo_if_barbacena"/>
        </a>
      </div>
    </footer>
  );
}

export default Footer;