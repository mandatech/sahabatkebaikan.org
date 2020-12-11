import { useGetList } from 'libs/hooks/useGetList';
import { useGetOne } from 'libs/hooks/useGetOne';

export function getCampaignList({
  _page = 1,
  _pageSize = 10,
  _sort = 'created_at',
  _order = 'DESC',
  _q = '',
  _category_id = '',
  _published = null,
  _is_active = null,
}) {
  const { data, isFetching, error } = useGetList('/campaigns', {
    _page,
    _pageSize,
    _sort,
    _order,
    _q,
    _category_id,
    _published,
    _is_active,
  });

  return { data, isFetching, error };
}

export function getCampaignDetail(slug) {
  const { data, isFetching, error } = useGetOne(`/campaigns/${slug}`);

  return { data, isFetching, error };
}
