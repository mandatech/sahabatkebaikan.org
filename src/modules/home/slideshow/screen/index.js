import 'react-slideshow-image/dist/styles.css';

import { makeStyles } from '@material-ui/core/styles';
import { Zoom } from 'react-slideshow-image';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    padding: '48px 16px 0 16px',
  },
}));

const Slideshow = () => {
  const classes = useStyles();
  const images = [
    'images/slideshow_1.jpg',
    'images/slideshow_2.jpg',
    'images/slideshow_3.jpg',
  ];

  const zoomInProperties = {
    indicators: true,
    // scale: 1.2,
  };
  return (
    <div className={classes.root}>
      <Zoom {...zoomInProperties}>
        {images.map((each, index) => (
          <div key={index} style={{ width: '100%', cursor: 'pointer' }}>
            <img
              style={{ objectFit: 'cover', width: '100%', borderRadius: 6 }}
              src={each}
              alt=""
            />
          </div>
        ))}
      </Zoom>
    </div>
  );
};

export default Slideshow;
