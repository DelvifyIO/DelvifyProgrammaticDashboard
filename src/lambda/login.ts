import { encrypt } from '../libs/jwt';
import airtable from '../libs/airtable';

export async function handler(event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { email, password } = JSON.parse(event.body);

    const [user] = await airtable('users').select({
      filterByFormula: `{email} = "${email}"`,
    }).all();

    if (!user || !user.fields) {
      throw new Error('Email not found');
    }

    if (user.fields.password !== password) {
      throw new Error('Invalid email or password');
    }

    const token = encrypt({ email, recordId: user.fields.id });

    const queryIds = {
      alltimeMetrics: user.fields.alltime_metrics_qid,
      dailyMetrics: user.fields.daily_metrics_qid,
      '30daysRegion': user.fields['30days_region_qid'],
      '30daysDevice': user.fields['30days_device_qid'],
      '30daysTimeofday': user.fields['30days_timeofday_qid'],
      '30daysCreative': user.fields['30days_creative_qid'],
    };

    return {
      statusCode: 200, // http status code
      body: JSON.stringify({
        userInfo: {
          email,
          name: user.fields.name,
          queryIds,
        },
        token,
      }),
    };
  } catch (error) {
    const msgToCode = {
      'Email not found': 404,
      'Invalid email or password': 401,
    };
    return {
      statusCode: msgToCode[error.message || 400],
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
}
