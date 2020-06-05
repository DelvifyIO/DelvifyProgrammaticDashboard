import * as R from 'ramda';
import { APIGatewayEvent } from 'aws-lambda';
import { auth as googleAuth, googleDbm } from '../libs/doubleclickbidmanager';
import { parseFromUrl } from '../services/parser';
import { authorize } from '../libs/jwt';

async function deleteQuery(queryId): Promise<object> {
  const auth = await googleAuth.getClient();
  const response = await googleDbm.queries.deletequery({ auth, queryId });
  return response.data || 'Successfully deleted.';
}

async function createQuery(requestBody): Promise<string> {
  const auth = await googleAuth.getClient();
  const response = await googleDbm.queries.createquery({ auth, requestBody });
  return response.data.queryId;
}

async function getAllQueries(): Promise<object> {
  const auth = await googleAuth.getClient();
  const response = await googleDbm.queries.listqueries({ auth });
  return response.data;
}

async function listReports(queryId): Promise<object> {
  const auth = await googleAuth.getClient();
  const response = await googleDbm.reports.listreports({ auth, queryId });
  return response.data;
}

export async function getLatestReportUrl(queryId: string): Promise<string> {
  const auth = await googleAuth.getClient();
  const response = await googleDbm.queries.getquery({ auth, queryId });
  return R.path(['data', 'metadata', 'googleCloudStoragePathForLatestReport'], response);
}

export async function handler(event: APIGatewayEvent): Promise<object> {
  authorize(event.headers.authorization);
  const lastEndpoint = R.last(event.path.split('/'));
  const methodsAllowed = ['GET', 'POST', 'DELETE'];

  if (R.not(R.any(R.equals(event.httpMethod), methodsAllowed))) {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (event.httpMethod === 'GET') {
    if (lastEndpoint === 'reportqueries') {
      const data = await getAllQueries();
      return { statusCode: 200, body: JSON.stringify(data) };
    }
    // const reportUrl = await listReports(lastEndpoint);
    const reportUrl = await getLatestReportUrl(lastEndpoint);
    // may need to move parseFromUrl to a separate API.
    const data = await parseFromUrl(reportUrl);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }

  if (event.httpMethod === 'DELETE') {
    const data = await deleteQuery(lastEndpoint);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }

  if (event.httpMethod === 'POST') {
    const queryId = await createQuery(JSON.parse(event.body));
    return {
      statusCode: 200,
      body: JSON.stringify({ queryId }),
    };
  }
}
