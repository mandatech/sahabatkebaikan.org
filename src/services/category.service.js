import { useGetList } from 'libs/hooks/useGetList';
import { useGetOne } from 'libs/hooks/useGetOne';

export function getCategoryList({
  _page = 1,
  _pageSize = 10,
  _sort = 'created_at',
  _order = 'DESC',
  _q = '',
  _category_id = '',
}) {
  const { data, isFetching, error } = useGetList('/categories', {
    _page,
    _pageSize,
    _sort,
    _order,
    _q,
    _category_id,
  });

  return { data, isFetching, error };
}

export function getCategoryDetail(id) {
  const { data, isFetching, error } = useGetOne(`/categories/${id}`);

  return { data, isFetching, error };
}
