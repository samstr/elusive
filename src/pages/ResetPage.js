import React, { useState } from 'react';

import Elusive from '../';
import { AuthPage, ResetForm, useAuthPageStyles } from '../components';
import { useSession } from '../hooks';

const ResetPage = () => {
  useSession();
  const classes = useAuthPageStyles();
  const [success, setSuccess] = useState();
  const { mail: mailOptions } = Elusive.options;

  const onSuccess = () => setSuccess(true);

  return (
    <AuthPage title={success ? 'Check your inbox' : 'Forgot your password?'}>
      {success ? (
        <div className={classes.intro}>
          <p>
            If an account exists with this email address, an e-mail will be sent
            with further instructions.
          </p>
          <p>
            You may need to check your spam folder or whitelist{' '}
            {mailOptions.fromEmail}
          </p>
        </div>
      ) : (
        <div className={classes.form}>
          <ResetForm onSuccess={onSuccess} />
        </div>
      )}
    </AuthPage>
  );
};

export default ResetPage;
