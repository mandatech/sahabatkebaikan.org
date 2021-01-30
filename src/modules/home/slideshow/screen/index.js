import 'react-slideshow-image/dist/styles.css';
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const images = [
    {
      id: 1,
      banner_image: 'images/slideshow_1.jpg',
      link:
        '/campaign/sedekah-beras-untuk-mewujudkan-senyum-di-wajah-abah-dan-emak',
    },
    {
      id: 2,
      banner_image: 'images/slideshow_2.jpg',
      link: '/kategori/kemanusiaan',
    },
    {
      id: 3,
      banner_image: 'images/slideshow_3.jpg',
      link:
        '/campaign/yuk-ikut-distribusi-10000-wakaf-al-quran-untuk-santri-dan-masyarakat-muslim-di-pelosok-karawang-dan-jawa-barat',
    },
  ];

  const zoomInProperties = {
    indicators: true,
    // scale: 1.2,
  };
  return (
    <Box className={classes.root}>
      <Zoom {...zoomInProperties}>
        {images.map((each, index) => (
          <Box
            key={index}
            style={{ width: '100%', cursor: 'pointer' }}
            onClick={() => router.push(each.link)}
          >
            <img
              style={{ objectFit: 'cover', width: '100%', borderRadius: 6 }}
              src={each.banner_image}
              alt=""
            />
          </Box>
        ))}
      </Zoom>
    </Box>
  );
};

export default Slideshow;
