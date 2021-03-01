import 'react-slideshow-image/dist/styles.css';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Zoom } from 'react-slideshow-image';
import { useGetList } from 'libs/hooks/useGetList';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    padding: '48px 16px 0 16px',
  },
}));

const Slideshow = () => {
  const classes = useStyles();
  const router = useRouter();
  // const images = [
  //   {
  //     id: 1,
  //     banner_image: 'images/slideshow_1.jpg',
  //     link:
  //       '/campaign/sedekah-beras-untuk-mewujudkan-senyum-di-wajah-abah-dan-emak',
  //   },
  //   {
  //     id: 2,
  //     banner_image: 'images/slideshow_2.jpg',
  //     link: '/kategori/kemanusiaan',
  //   },
  //   {
  //     id: 3,
  //     banner_image: 'images/slideshow_3.jpg',
  //     link:
  //       '/campaign/yuk-ikut-distribusi-10000-wakaf-al-quran-untuk-santri-dan-masyarakat-muslim-di-pelosok-karawang-dan-jawa-barat',
  //   },
  // ];

  const { data } = useGetList('/banners', {
    _page: 1,
    _pageSize: 10,
    _sort: 'created_at',
    _order: 'DESC',
    _q: '',
  });

  const zoomInProperties = {
    indicators: false,
    // scale: 1.2,
  };
  return (
    <Box className={classes.root}>
      {data.length ? (
        <Zoom {...zoomInProperties}>
          {data.map((each, index) => (
            <Box
              key={index}
              style={{ width: '100%', cursor: 'pointer', minHeight: 245 }}
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
      ) : (
        <Box>
          <Skeleton variant="rect" width="100%" height={245} />
          <Box display="flex" justifyContent="center" mt={2}>
            <Skeleton
              variant="circle"
              width={8}
              height={8}
              style={{ margin: '0px 2px' }}
            />
            <Skeleton
              variant="circle"
              width={8}
              height={8}
              style={{ margin: '0px 2px' }}
            />
            <Skeleton
              variant="circle"
              width={8}
              height={8}
              style={{ margin: '0px 2px' }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Slideshow;
