import { Typography } from '@material-ui/core';
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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '75%',
    },
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
    minWidth: 288,
    maxWidth: 340,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: 340,
    },
  },
  footer: {
    paddingTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

const AuthPage = ({ children, title }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {title && (
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
        )}
        {children}
      </div>
    </div>
  );
};

AuthPage.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default AuthPage;
