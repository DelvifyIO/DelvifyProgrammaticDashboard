import * as R from 'ramda';
import { Handler, APIGatewayEvent } from 'aws-lambda';

import airtable from '../libs/airtable';
import { authorize } from '../libs/jwt';

async function getAllCampaigns(userId: string): Promise<object> {
  const data = await airtable('campaigns')
    .select({
      filterByFormula: `{user_id} = "${userId}"`,
    })
    .all();

  return data.map((el) => ({
    id: el.fields.google_id,
    name: el.fields.display_name,
    weeklyReport: el.fields.weekly_report_subscription,
    budget: el.fields.budget,
  }));
}

async function updateWeeklyReport(event): Promise<void> {
  const campaignId = R.last(event.path.split('/'));
  const { optIn } = JSON.parse(event.body);
  const { fields } = await airtable('campaigns').update(campaignId, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    weekly_report_subscription: optIn,
  });

  if (!!fields.weekly_report_subscription !== optIn) {
    throw new Error('There was a problem updating the weekly report. Please contact Delvify admin.');
  }
}
// eslint-disable-next-line max-len
export const handler: Handler = async (event: APIGatewayEvent): Promise<object> => {
  try {
    const { recordId } = authorize(event.headers.authorization);
    const methodsAllowed = ['PUT', 'GET'];
    if (R.not(R.any(R.equals(event.httpMethod), methodsAllowed))) {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    if (event.httpMethod === 'PUT') {
      // i.e. PUT /campaigns/{campaignId}
      await updateWeeklyReport(event);
      return {
        statusCode: 200,
      };
    }

    if (event.httpMethod === 'GET') {
      // i.e. GET /campaigns
      const data = await getAllCampaigns(recordId);
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    }
  } catch (error) {
    console.error('Error in campaigns handler: ', error);
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};
