import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import KemanusiaanIcon from 'assets/icons/kategori_kemanusiaan.svg';
import PendidikanIcon from 'assets/icons/kategori_pendidikan.svg';
import SosialIcon from 'assets/icons/kategori_sosial.svg';
import WakafIcon from 'assets/icons/kategori_wakaf.svg';
import ZakatIcon from 'assets/icons/kategori_zakat.svg';
import Link from 'components/Link';

const useStyles = makeStyles((theme) => ({
  categoryIcon: {
    margin: theme.spacing(1),
  },
  categoryName: {
    fontSize: 12,
  },
}));

const categories = [
  {
    icon: ZakatIcon,
    name: 'Zakat',
    url: '/kategori/zakat',
  },
  {
    icon: WakafIcon,
    name: 'Wakaf',
    url: '/kategori/wakaf',
  },
  {
    icon: PendidikanIcon,
    name: 'Pendidikan',
    url: '/kategori/pendidikan',
  },
  {
    icon: KemanusiaanIcon,
    name: 'Kemanusiaan',
    url: '/kategori/kemanusiaan',
  },
  {
    icon: SosialIcon,
    name: 'Sosial',
    url: '/kategori/sosial',
  },
];

const Category = () => {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="space-around" flexWrap="wrap">
      {categories.map((category, i) => (
        <Link key={i} href={category.url} color="inherit">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box className={classes.categoryIcon} key={i}>
              {category.icon}
            </Box>
            <span className={classes.categoryName}>{category.name}</span>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default Category;
