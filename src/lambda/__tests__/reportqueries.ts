import { JsonWebTokenError } from 'jsonwebtoken';
import * as jwt from '../../libs/jwt';
import { handler } from '../reportqueries';

describe('handler', () => {
  describe('unauthorized header', () => {
    it('should throw JsonWebTokenError', async () => {
      const event = {
        headers: {
          authorization: 'an invalid authorization header string',
        },
      };
      await expect(handler(event)).rejects.toThrow(JsonWebTokenError);
    });
  });

  describe('method not allowed', () => {
    const event = {
      httpMethod: 'PUT',
      path: '/reportqueries/abc',
      headers: {
        authorization: '',
      },
    };
    const expectedReturnValue = { statusCode: 405, body: 'Method Not Allowed' };

    it('throws if PUT request', async () => {
      jest.spyOn(jwt, 'authorize').mockImplementation(() => {});
      const handledEvent = await handler(event);
      expect(handledEvent).toEqual(expectedReturnValue);
    });

    it('throws if no query id', async () => {
      jest.spyOn(jwt, 'authorize').mockImplementation(() => {});
      event.httpMethod = 'GET';
      event.path = '/reportqueries';
      const handledEvent = await handler(event);
      expect(handledEvent).toEqual(expectedReturnValue);
    });
  });
});
