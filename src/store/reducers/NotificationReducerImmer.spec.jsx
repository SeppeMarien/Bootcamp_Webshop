import MockDate from 'mockdate';
import NotificationReducerImmer from './NotificationReducerImmer';
import '@testing-library/jest-dom/extend-expect';
import { AddNotification } from '../Actions/Notification';

function createNotification(id, to) {
  return {
    from: 'system',
    to,
    subject: `Stop killing people even if they are stupid. mess ${id}`,
    date: new Date().toString(),
  };
}

beforeEach(() => {
  MockDate.set('2000-11-22');
});

describe('Notification reducer with immer', () => {
  test('it has empty object as initialState by default', () => {
    const reducer = NotificationReducerImmer();

    expect(reducer).toStrictEqual({});
  });

  describe('it sends notifications', () => {
    test('it adds notification and create user if not exists', () => {
      MockDate.set('2012-11-22');
      const action = AddNotification(createNotification(1, 'user'));
      const newState = NotificationReducerImmer(undefined, action);

      expect(newState).toStrictEqual({
        user: [
          {
            from: 'system',
            to: 'user',
            subject: `Stop killing people even if they are stupid. mess 1`,
            date: new Date().toString(),
          },
        ],
      });
    });

    test('it add notification to the right user', () => {
      const oldState = {
        user: [createNotification(1, 'user')],
        admin: [createNotification(3, 'admin')],
      };

      MockDate.set('2012-11-22');
      const action = AddNotification(createNotification(2, 'user'));
      const newState = NotificationReducerImmer(oldState, action);

      expect(newState.user).not.toBe(oldState.user);

      expect(newState).toStrictEqual({
        ...oldState,
        user: [
          ...oldState.user,
          {
            from: 'system',
            to: 'user',
            subject: `Stop killing people even if they are stupid. mess 2`,
            date: new Date().toString(),
          },
        ],
      });
    });
  });
});
