import api from './ApiConnection';

const RESOURCE_URI = '/products';
// eslint-disable-next-line import/prefer-default-export
export async function getProductsList(page = 1, limit = 15) {
  const response = await api.get(RESOURCE_URI, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return response.data;
}
