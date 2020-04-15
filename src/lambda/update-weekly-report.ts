import * as R from 'ramda';

export async function handler(event, context) {
  if (event.httpMethod !== 'PUT') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const id = R.last(event.path.split('/'));
  const { optin } = JSON.parse(event.body);

  // console.log(id, optin);

  return {
    statusCode: 200,
  };
}
