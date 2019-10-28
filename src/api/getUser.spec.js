/* eslint-disable jest/no-disabled-tests */
import nock from 'nock';
import { getUserById, listPagedUsers, saveUser } from './userApi';

function mapTest(result) {
  const mapped = { ...result };
  if (mapped.birthDate) {
    mapped.birthDate = new Date(mapped.birthDate);
  }
  return mapped;
}

function bart() {
  return {
    isFamily: true,
    birthDate: '2009-01-19T23:00:00.000Z',
    gender: 'M',
    lastName: 'Simpson',
    firstName: 'Bart',
    id: 1,
  };
}

function homer() {
  return {
    isFamily: true,
    gender: 'M',
    lastName: 'Simpson',
    firstName: 'Homer',
    id: 4,
  };
}

function Burns() {
  return {
    isFamily: false,
    birthDate: new Date('1890-09-15T23:00:00.000Z'),
    gender: 'M',
    lastName: 'Burns',
    firstName: 'Montgomery',
  };
}

const page2Limit2Sorted = {
  headers: {
    'x-total-count': 8,
  },
  data: [bart(), homer()],
};

describe.skip('Users api', () => {
  describe('getUsersById', () => {
    test('It has to return one user', async () => {
      nock('http://localhost:3000/')
        .get('/user/1')
        .reply(200, bart());

      const result = await getUserById(1);

      expect(result).toEqual(mapTest(bart()));
    });

    test('It has to return user without birth date.', async () => {
      nock('http://localhost:3000/')
        .get('/user/1')
        .reply(200, homer());

      const result = await getUserById(1);

      expect(result).toEqual(homer());
    });
  });

  describe('getUsersPage', () => {
    test('It returns page of all users', async () => {
      nock('http://localhost:3000/')
        .get('/users')
        .query({ _page: 2, _limit: 2, _sort: 'lastName,firstName' })
        .reply(200, page2Limit2Sorted);

      const result = await listPagedUsers(2, 2);

      expect(result).toEqual({
        total: 8,
        data: [mapTest(bart()), mapTest(homer())],
      });
    });

    test('it returns page with default of 10', async () => {
      nock('http://localhost:3000/')
        .get('/users')
        .query({ _page: 2, _limit: 10, _sort: 'lastName,firstName' })
        .reply(200, page2Limit2Sorted);

      const result = await listPagedUsers(2);

      expect(result).toEqual({
        total: 8,
        data: [mapTest(bart()), mapTest(homer())],
      });
    });
  });

  describe('saveUser', () => {
    test('It save the user when not exists', async () => {
      const burns = Burns();

      nock('http://localhost:3000/')
        .post('/users', { ...burns, birthDate: JSON.stringify(burns.birthDate) })
        .reply(200, bart());

      const result = await saveUser(Burns());

      expect(result).toEqual(mapTest(bart()));
    });
  });
});

// http://localhost:3000/users?_page=2&_limit=2&_sort=lastName,firstName
