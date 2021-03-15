import { useGetList } from 'libs/hooks/useGetList';
import { useGetOne } from 'libs/hooks/useGetOne';
import { axiosInstance } from 'config/axios';

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

export async function createNewCampaign({
  category_id,
  title,
  slug,
  description,
  donation_target,
  start_date,
  end_date,
  is_never_end,
  published,
  videos,
  images,
}) {
  const form = new FormData();

  form.append('category_id', category_id);
  form.append('title', title);
  form.append('slug', slug);
  form.append('description', description);
  form.append('donation_target', donation_target);
  form.append('start_date', start_date);
  if (!is_never_end) {
    form.append('end_date', end_date);
  }
  form.append('is_never_end', is_never_end);
  form.append('published', published);
  form.append('images', images);

  if (videos?.length) {
    videos.forEach((video) => {
      if (video) {
        form.append('videos[]', video);
      }
    });
  }

  const { data } = await axiosInstance({
    url: '/campaigns',
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data: form,
  });

  return data;
}
