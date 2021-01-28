import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
    padding: 5,
  },
}));

const Loading = ({
  width = 115,
  height = 115,
  open,
  onClose,
  hideBackdrop,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose && onClose}
      hideBackdrop={hideBackdrop}
    >
      <div className={classes.root}>
        <object
          type="image/svg+xml"
          data="/spinner.svg"
          style={{ width, height }}
          aria-label="spinner.svg"
        />
      </div>
    </Dialog>
  );
};

Loading.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  hideBackdrop: PropTypes.bool,
};

export default Loading;
