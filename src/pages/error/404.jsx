import React from 'react';
import { Link } from 'react-router-dom';

import './Error.css'

export default () => {
  return (
    <>
      <div className="box-error">
        <p className="error">404</p>
        <p className="error-description">
          Lamentamos, mas essa página não existe.
        </p>
        <Link to="/" className="btn-back">Voltar</Link>
      </div>
    </>
  );
}