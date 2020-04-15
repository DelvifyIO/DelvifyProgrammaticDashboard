import { getToken } from '../utils/auth';

async function handleGetResponse(response): Promise<object> {
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data;
}

function authorizedFetch(url: RequestInfo, options?: RequestInit): Promise<Response> {
  return fetch(url, {
    ...options,
    headers: {
      ...options && options.headers ? options.headers : {},
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export const login = (email: string, password: string): Promise<Response> => fetch('/.netlify/functions/login', {
  method: 'POST', headers: { 'Access-Control-Allow-Methods': '*', 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }),
});

const authenticate = (token: string): Promise<Response> => fetch('/.netlify/functions/authenticate', {
  method: 'POST', headers: { 'Access-Control-Allow-Methods': '*', 'Content-Type': 'application/json' }, body: JSON.stringify({ token }),
});

export const updateWeeklyReportStatus = (campaignId: string, shouldReceive: boolean): Promise<Response> => authorizedFetch(`/.netlify/functions/campaigns/${campaignId}`, {
  method: 'PUT', headers: { 'Access-Control-Allow-Methods': '*', 'Content-Type': 'application/json' }, body: JSON.stringify({ optIn: shouldReceive }),
});

export const fetchAuthInfo = async (): Promise<object> => {
  const token = getToken();
  if (!token) {
    throw new Error();
  }
  const response = await authenticate(token);
  if (!response.ok) {
    throw new Error();
  }
  const authInfo = await response.json();
  return authInfo;
};

export const fetchAllCampaigns = async (): Promise<object> => {
  const response = await authorizedFetch('/.netlify/functions/campaigns');
  return handleGetResponse(response);
};

export const fetchReport = async (queryId: string): Promise<object> => {
  const response = await authorizedFetch(`/.netlify/functions/reportqueries/${queryId}`);
  return handleGetResponse(response);
};
