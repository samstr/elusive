import PropTypes from 'prop-types';
import React from 'react';

const AuthBasePage = ({ children }) => (
  <div className="auth-base-page">
    {children}
    <style global jsx>{`
      .auth-base-page {
        padding: 50px 20px 75px;
        width: 100%;
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

      .auth-base-page h1 {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 35px;
        text-align: center;
      }

      .auth-base-page .intro {
        text-align: center;
        margin-bottom: 35px;
      }

      .auth-base-page .form {
        margin: 0 auto;
        width: 100%;
      }

      .auth-base-page .footer {
        margin-top: 35px;
        text-align: center;
      }

      @media (min-width: 600px) {
        .auth-base-page {
          width: auto;
        }

        .auth-base-page .form {
          width: 320px;
        }
      }
    `}</style>
  </div>
);

AuthBasePage.propTypes = {
  children: PropTypes.node,
};

export default AuthBasePage;
