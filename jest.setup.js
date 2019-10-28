/* eslint-disable import/no-extraneous-dependencies */

import 'jest-extended';
import nock from 'nock';
import '@testing-library/jest-dom/extend-expect';

beforeAll(() => {
  nock.disableNetConnect();
});

afterAll(() => {
  nock.enableNetConnect();
});
