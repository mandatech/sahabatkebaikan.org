import { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
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

const Search = ({ q }) => {
  const classes = useStyles();
  const router = useRouter();
  const [query, setQuery] = useState(q);

  const handleSearchBoxChange = (e) => {
    router.replace({
      pathname: '/cari',
      query: { q: encodeURI(e.target.value) },
    });
    setQuery(e.target.value);
  };

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
          value: query,
          onChange: handleSearchBoxChange,
        }}
      />
      <Box p={2} style={{ background: '#DEDEDE' }}>
        <Typography>Hasil Pencarian</Typography>
      </Box>
      <SearchResultScreen query={query} />
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      q: query.q || '',
    },
  };
}

Search.propTypes = {
  q: PropTypes.string,
};

export default Search;
