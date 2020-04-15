// import * as R from 'ramda'
import { decrypt, encrypt } from '../libs/jwt';
import airtable from '../libs/airtable';

export async function handler(event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { token } = JSON.parse(event.body);

    const { email, recordId } = decrypt(token);
    const user = await airtable('users').find(recordId);

    if (!user || !user.fields || user.fields.email !== email) {
      throw new Error();
    }

    const queryIds = {
      alltimeMetrics: user.fields.alltime_metrics_qid || '',
      dailyMetrics: user.fields.daily_metrics_qid || '',
      '30daysRegion': user.fields['30days_region_qid'] || '',
      '30daysDevice': user.fields['30days_device_qid'] || '',
      '30daysTimeofday': user.fields['30days_timeofday_qid'] || '',
      '30daysCreative': user.fields['30days_creative_qid'] || '',
    };

    // re-encrypt token (for new expiry time)
    const newToken = encrypt({ email, recordId });

    return {
      statusCode: 200,
      body: JSON.stringify({
        userInfo: {
          email,
          name: user.fields.name,
          queryIds,
        },
        token: newToken,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid token',
      }),
    };
  }
}
