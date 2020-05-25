import React, { useState } from 'react';

import Elusive from '../';
import { AuthBasePage, ResetForm } from '../components';

import useSession from './useSession';

const ResetPage = () => {
  useSession();
  const { mail: mailOptions } = Elusive.options;

  const [success, setSuccess] = useState();

  const onSuccess = () => setSuccess(true);

  return (
    <AuthBasePage>
      {success ? (
        <>
          <h1>Check your inbox</h1>
          <div className="intro">
            <p>
              If an account exists with this email address, an e-mail will be
              sent with further instructions.
            </p>
            <p>
              You may need to check your spam folder or whitelist{' '}
              {mailOptions.fromEmail}
            </p>
          </div>
        </>
      ) : (
        <>
          <h1>Forgot your password?</h1>
          <div className="form">
            <ResetForm onSuccess={onSuccess} />
          </div>
        </>
      )}
    </AuthBasePage>
  );
};

export default ResetPage;
