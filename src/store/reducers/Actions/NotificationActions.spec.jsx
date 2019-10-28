import MockDate from 'mockdate';
import { AddNotification } from './Notification';
import { ADD_NOTIFICATION } from './actionTypes';

function createNotification(id) {
  return {
    from: 'system',
    to: 'user',
    subject: `Stop killing people even if they are stupid. mess ${id}`,
    date: new Date().toString(),
  };
}

beforeEach(() => {
  MockDate.set('2000-11-22');
});

describe('Notification action creator', () => {
  test('it creates an action with the right payload', () => {
    const sendNotificationAction = AddNotification(createNotification(1));

    expect(sendNotificationAction).toStrictEqual({
      type: ADD_NOTIFICATION,
      payload: createNotification(1),
    });
  });
});
