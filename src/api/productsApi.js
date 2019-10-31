import api from './ApiConnection';

const RESOURCE_URI = '/products';
// eslint-disable-next-line import/prefer-default-export
export default async function getProductsList(page = 1, limit = 12) {
  const response = await api.get(RESOURCE_URI, {
    params: {
      _page: page,
      _limit: limit,
      _sort: 'title',
    },
  });
  return response.data;
}
