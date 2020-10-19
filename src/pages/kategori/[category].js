import { useRouter } from 'next/router';

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  return <p>Kategori: {category}</p>;
};

export default CategoryPage;
