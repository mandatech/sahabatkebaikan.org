import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ChevronLeft';
import Header from 'components/Header';
import Layout from 'components/Layout';
import SearchResultScreen from 'modules/search/search-result';

const useStyles = makeStyles(() => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
  },
}));

const Search = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Header
        title="Cari campaign"
        icon={<BackIcon />}
        backButton={true}
        TitleProps={{ align: 'left' }}
        color="inherit"
        elevation={0}
        classes={{
          root: classes.headerRoot,
        }}
        searchbox
        SearchBoxProps={{
          autoFocus: true,
        }}
      />
      <Box p={2} style={{ background: '#DEDEDE' }}>
        <Typography>Hasil Pencarian</Typography>
      </Box>
      <SearchResultScreen />
    </Layout>
  );
};

export default Search;
