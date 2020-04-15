import { CAMPAIGN_ID } from './constants';

export default function makeReduxData(data: object[]): object[] {
  return data.filter((row) => Number(row[CAMPAIGN_ID]) > 0);
}
