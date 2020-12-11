import { useGetList } from 'libs/hooks/useGetList';

export function getDonationList({
  _page = 1,
  _pageSize = 10,
  _sort = 'created_at',
  _order = 'DESC',
  _q = '',
  _campaign_id = '',
  _user_id = null,
  _status = null,
}) {
  const { data, isFetching, error } = useGetList('/donations', {
    _page,
    _pageSize,
    _sort,
    _order,
    _q,
    _campaign_id,
    _user_id,
    _status,
  });

  return { data, isFetching, error };
}
