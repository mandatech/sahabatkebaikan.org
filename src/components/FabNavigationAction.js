/**
 * Combination from
 * https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Fab/Fab.js
 * https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/BottomNavigationAction/BottomNavigationAction.js
 */

import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    minHeight: 36,
    transition: theme.transitions.create(
      ['background-color', 'box-shadow', 'border-color'],
      {
        duration: theme.transitions.duration.short,
      }
    ),
    borderRadius: '50%',
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    boxShadow: theme.shadows[6],
    // boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.25)',
    '&:active': {
      boxShadow: theme.shadows[12],
    },
    color: 'white',
    backgroundColor: '#c4c4c4',
    '&$selected': {
      paddingTop: 6,
      color: 'white',
      backgroundColor: theme.palette.secondary.main,
    },
    '&$focusVisible': {
      boxShadow: theme.shadows[6],
    },
    '&$disabled': {
      color: theme.palette.action.disabled,
      boxShadow: theme.shadows[0],
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },
  /* Pseudo-class applied to the root element if selected. */
  selected: {},
  /* Styles applied to the span element that wraps the children. */
  label: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    opacity: 1,
    transition: 'font-size 0.2s, opacity 0.2s',
    transitionDelay: '0.1s',
    '&$iconOnly': {
      opacity: 0,
      transitionDelay: '0s',
    },
    '&$selected': {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  /* Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: {},
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if `color="inherit"`. */
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
  },
});

const Fab = React.forwardRef(function Fab(props, ref) {
  const {
    children,
    classes,
    className,
    // color = 'default',
    component = 'button',
    disabled = false,
    disableFocusRipple = false,
    focusVisibleClassName,
    // size = 'large',

    onChange,
    onTouchStart,
    onTouchEnd,
    onClick,
    // eslint-disable-next-line react/prop-types -- private, always overridden by BottomNavigation
    selected,
    label,
    showLabel,
    value,
    ...other
  } = props;

  const touchStartPos = React.useRef();
  const touchTimer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(touchTimer.current);
    };
  }, [touchTimer]);

  const handleTouchStart = (event) => {
    if (onTouchStart) {
      onTouchStart(event);
    }

    const { clientX, clientY } = event.touches[0];

    touchStartPos.current = {
      clientX,
      clientY,
    };
  };

  const handleTouchEnd = (event) => {
    if (onTouchEnd) onTouchEnd(event);

    const target = event.target;
    const { clientX, clientY } = event.changedTouches[0];

    if (
      Math.abs(clientX - touchStartPos.current.clientX) < 10 &&
      Math.abs(clientY - touchStartPos.current.clientY) < 10
    ) {
      touchTimer.current = setTimeout(() => {
        // Simulate the native tap behavior on mobile.
        // On the web, a tap won't trigger a click if a container is scrolling.
        //
        // Note that the synthetic behavior won't trigger a native <a> nor
        // it will trigger a click at all on iOS.
        target.dispatchEvent(new Event('click', { bubbles: true }));
      }, 10);
    }
  };

  const handleChange = (event) => {
    clearTimeout(touchTimer.current);

    if (onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <ButtonBase
      className={clsx(
        classes.root,
        {
          [classes.selected]: selected,
        },
        className
      )}
      component={component}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
      ref={ref}
      onClick={handleChange}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      {...other}
    >
      <span className={classes.wrapper}>
        {children}
        <span
          className={clsx(classes.label, {
            [classes.selected]: selected,
            [classes.iconOnly]: !showLabel && !selected,
          })}
        >
          {label}
        </span>
      </span>
    </ButtonBase>
  );
});

Fab.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the button.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the button will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * The label element.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onTouchEnd: PropTypes.func,
  /**
   * @ignore
   */
  onTouchStart: PropTypes.func,
  /**
   * If `true`, the `BottomNavigationAction` will show its label.
   * By default, only the selected `BottomNavigationAction`
   * inside `BottomNavigation` will show its label.
   *
   * The prop defaults to the value (`false`) inherited from the parent BottomNavigation component.
   */
  showLabel: PropTypes.bool,
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: PropTypes.any,
};

export default withStyles(styles, { name: 'MuiFabNavigationAction' })(Fab);
