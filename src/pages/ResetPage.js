import { Typography } from '@material-ui/core';
import React, { useState } from 'react';

import Elusive from '../';
import { AuthPage, ResetForm } from '../components';
import { useSession } from '../hooks';

const ResetPage = () => {
  useSession();
  const [success, setSuccess] = useState();
  const { mail: mailOptions } = Elusive.options;

  const onSuccess = () => setSuccess(true);

  return (
    <AuthPage>
      {success ? (
        <>
          <Typography variant="h4" className={classes.title}>
            Check your inbox
          </Typography>
          <div className={classes.intro}>
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
          <Typography variant="h4" className={classes.title}>
            Forgot your password?
          </Typography>
          <div className={classes.form}>
            <ResetForm onSuccess={onSuccess} />
          </div>
        </>
      )}
      <p onClick={() => setSuccess(true)}>test</p>
    </AuthPage>
  );
};

export default ResetPage;
