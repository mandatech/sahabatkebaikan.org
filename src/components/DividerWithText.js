import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  border: {
    borderBottom: '1px solid lightgray',
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    fontWeight: 400,
    fontSize: 14,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const DividerWithText = ({ children, className, ...props }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.container, className)} {...props}>
      <div className={classes.border} />
      <span className={classes.content}>{children}</span>
      <div className={classes.border} />
    </div>
  );
};

DividerWithText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.object,
};

export default DividerWithText;
