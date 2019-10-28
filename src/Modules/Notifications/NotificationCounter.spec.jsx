import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import NotificationCounter from './NotificationCounter';

describe('notification counter component', () => {
  test('it renders the component by default', () => {
    const { getByRole } = render(<NotificationCounter />);

    getByRole('img', { hidden: true });
  });
});
