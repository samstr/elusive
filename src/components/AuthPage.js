import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  content: {
    width: '100%',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  title: {
    fontWeight: 'bold !important',
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
  },
  intro: {
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: theme.spacing(2),
  },
  form: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      maxWidth: 380,
    },
  },
  footer: {
    paddingTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

const AuthPage = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

AuthPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthPage;
