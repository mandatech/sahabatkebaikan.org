import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  search: {
    display: 'flex',
    borderRadius: 15,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: 14,
  },
  toolbarLarge: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
}));

const Header = ({
  icon = false,
  title = '',
  searchbox = false,
  size = 'normal',
}) => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar
        className={clsx({
          [classes.toolbarLarge]: size === 'large',
        })}
      >
        {icon && (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            {icon}
          </IconButton>
        )}

        {searchbox && (
          <div className={classes.search}>
            <InputBase
              placeholder={title}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
          </div>
        )}

        {!searchbox && title && (
          <Typography className={classes.title} variant="h6" noWrap>
            {title}
          </Typography>
        )}

        <div className={classes.grow} />
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  searchbox: PropTypes.bool,
  size: PropTypes.oneOf(['normal', 'large']),
};

export default Header;
