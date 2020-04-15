import request from 'request';
import csv from 'csv-parser';

export function parseFromUrl(url): Promise<object[]> {
  return new Promise((resolve, reject) => {
    const results = [];
    request(url)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}
