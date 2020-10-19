import 'react-slideshow-image/dist/styles.css';

import { Zoom } from 'react-slideshow-image';

const Slideshow = () => {
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
    <div>
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
